import { getApiData } from '../api/api'
import axios from 'axios'
const CancelToken = axios.CancelToken
let cancel

let bankmaster = []

export const setBankMaster = data => {
    bankmaster = { bankList: data }
}

export const getBankList = (val) => {
    const promise = new Promise((resolve) => {
        if (bankmaster.bankList.length) {
            let filteredBankList = bankmaster.bankList.filter(bank => {
                return bank.bankName.startsWith(val.toUpperCase())
            })
            if (filteredBankList.length) {
                resolve({ bankList: filteredBankList })
            } else {
                resolve([])
            }
        } else {
            resolve([])
        }
    })
    return promise
}

export const getOtp = async slide => {
    let mobileNo = ''
    slide.inputs.forEach(inp => {
        if (inp.input_id === 'phone') {
            mobileNo = inp.value
        }
    })
    const { url, body } = getApiData('otp')
    body.request.payload.mobileNo = mobileNo
    try {
        await axios.post(url, body)
        return mobileNo
    } catch (err) {
        throw new Error('Unable to fetch otp. Please try again.')
    }
}

export const submitOtp = async mobileNo => {
    const inps = document.getElementsByClassName('input_otp')
    let otp = '';
    for (let inp of inps) {
        otp += inp.value
    }
    if (otp.length !== 4) {
        throw new Error('Otp mush have 4 characters')
    }
    const { url, body } = getApiData('otpverify')
    body.request.payload.mobileNo = mobileNo
    body.request.payload.otp = otp
    try {
        const res = await axios.post(url, body)
        if (res && res.response && res.response.msgInfo && res.response.msgInfo.code && res.response.msgInfo.code == '500') {
            throw new Error(res.response.msgInfo.message)
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

export const getDropdownList = async (listType, value) => {
    const { url, body } = getApiData(listType)
    body.request.payload.name = value
    if (cancel != undefined) cancel()
    try {
        const res = await axios.post(url, body, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c
            })
        })
        if (res && res.response) {
            return (res.response.payload)
        }
    } catch (err) {}
}