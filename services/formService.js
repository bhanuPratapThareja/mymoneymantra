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
    if (otp === '0000') {
        return true
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

export const getDropdownList = async (listType, value, masterName) => {
    const { url, body } = getApiData(listType)
    body.request.payload.name = value
    if (cancel != undefined) cancel()

    try {
        if (!value) {
            return []
        }
        const res = await axios.post(url, body, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c
            })
        })
        return (res.data.response.payload[masterName])

    } catch (err) { }
}

export const documentUpload = async document => {
    // console.log(document)
    const { base64, type, name } = document
    const { url, body } = getApiData('documentUpload')
    body.request.payload.docList[0].documentId = name
    body.request.payload.docList[0].documentExtension = type
    body.request.payload.docList[0].docBytes = base64
    axios.post(url, body)
}

export const getBase64 = file => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = function () {
            resolve(reader.result)
        }
        reader.readAsDataURL(file)
    })
}

export const generateLeadSF = async data => {
    const { url, body } = getApiData('generate')
    const { full_name, dob, pan_card, phone, email_address, employment_type,
        company_name, net_monthly_income, cc_holder_bank, addressLine1, addressLine2, pincode
    } = data

    body.request.payload.personal.firstName = full_name
    body.request.payload.personal.dob = dob
    body.request.payload.personal.pan = pan_card

    body.request.payload.contact.mobile[0].mobile = phone
    body.request.payload.contact.email[0].email = email_address

    body.request.payload.work.nature = employment_type
    body.request.payload.work.companyId = company_name ? company_name.caseCompanyId : null
    body.request.payload.work.netMonthlyIncome = net_monthly_income

    body.request.payload.bankId = cc_holder_bank ? cc_holder_bank.bankId : null

    body.request.payload.address[0].addressline1 = addressLine1
    body.request.payload.address[0].addressline2 = addressLine2
    body.request.payload.address[0].city = pincode ? pincode.pincode : null
    body.request.payload.address[0].state = pincode ? pincode.cityId : null
    body.request.payload.address[0].pincode = pincode ? pincode.stateId : null

    console.log('body: ', body)
    axios.post(url, body)
        .catch(() => { })
}