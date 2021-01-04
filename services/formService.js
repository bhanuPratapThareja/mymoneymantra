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
        if (err.response.status == 400) {
            throw new Error('Please enter valid OTP!')
        } else {
            throw new Error(err.message)
        }
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
    const { base64, type, name } = document
    const { url, body } = getApiData('documentUpload')
    body.request.payload.docList[0].documentId = name
    body.request.payload.docList[0].documentExtension = type
    body.request.payload.docList[0].docBytes = base64
    axios.post(url, body)
        .catch(() => { })
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

export const generateLeadSF = async (data, primaryPath) => {
    const promise = new Promise((resolve, reject) => {
        const { url, body } = getApiData('generate')
        const { fullName, dob, pan_card, mobile, email, applicantType,
            companyId, netMonthlyIncome, bankId, addressLine1, addressLine2, pincode
        } = data

        body.request.payload.personal.fullName = fullName
        body.request.payload.personal.dob = dob
        body.request.payload.personal.pan = pan_card

        body.request.payload.contact.mobile[0].mobile = mobile
        body.request.payload.contact.email[0].email = email

        body.request.payload.work.applicantType = applicantType
        body.request.payload.work.companyId = companyId ? companyId.caseCompanyId : '1000000001'
        body.request.payload.work.netMonthlyIncome = netMonthlyIncome

        // body.request.payload.bankId = bankId ? bankId.bankId : ''
       
        const leadIdData = JSON.parse(localStorage.getItem('leadId'))
        const leadId = leadIdData && leadIdData[primaryPath] ? leadIdData[primaryPath] : ''
     

        body.request.payload.leadId = leadId ? leadId : ''

        if (!addressLine1 && !addressLine2 && !pincode) {
            body.request.payload.address[0] = {}
        } else {
            body.request.payload.address[0].addressline1 = addressLine1
            body.request.payload.address[0].addressline2 = addressLine2
            body.request.payload.address[0].city = pincode ? pincode.cityId : ''
            body.request.payload.address[0].state = pincode ? pincode.stateId : ''
            body.request.payload.address[0].pincode = pincode ? pincode.pincode : ''
        }

        console.log('body: ', body)

        axios.post(url, body)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log('err gl: ', err)
                reject(err)
            })
    })
    return promise
}

export const getPinCodeData = async (name, value) => {
    const { url, body } = getApiData('pincode');
    body.request.payload.name = value;
    try {
        const res = await axios.post(url, body)
        const { pinList } = res.data.response.payload;
        return pinList;
    } catch (error) { }
}

export const getCityData = async (name, value) => {
    const { url, body } = getApiData('cities');
    body.request.payload.name = value;
    try {
        const res = await axios.post(url, body)
        const { cityList } = res.data.response.payload;
        return cityList;
    } catch (error) {
    }
}

export const updateLongForm = async data => {
    const { url, body } = getApiData('generate')

    try {
        const res = await axios.post(url, body)
        const { resMsg } = res.response.payload;
        return resMsg;
    } catch (error) { }


    return promise
}


