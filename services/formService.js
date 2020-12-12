import { getApiData } from '../api/api'
import axios from 'axios'
const CancelToken = axios.CancelToken
let cancel

export const getOtp = mobileNo => {
    const { url, body } = getApiData('otp')
    body.request.payload.mobileNo = mobileNo
    axios.post(url, body)
        .catch(() => { })
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
        if (res.data.response.msgInfo.code == 200) {
            return true
        } else if (res.data.response.msgInfo.code == 500) {
            throw new Error(res.data.response.msgInfo.message)
        } else {
            throw new Error('Something went wrong. Please try again.')
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
            return (res.data.response.payload)
        }
    } catch (err) { }
}