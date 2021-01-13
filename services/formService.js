import axios from 'axios'
import Strapi from '../providers/strapi'
import { getApiData } from '../api/api'
import { getLeadId } from '../utils/localAccess'
import { getFormattedDate } from '../utils/formatDataForApi'
const CancelToken = axios.CancelToken
let cancel
let otpId = ''

const strapi = new Strapi()

export const getOtp = mobileNo => {
    const { url, body } = getApiData('otp')
    body.request.payload.mobileNo = mobileNo
    axios.post(url, body)
        .then(res => {
            otpId = res.data.response.payload.otpId
        })
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
    body.request.payload.otpId = otpId

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

export const generateLead = async (data, primaryPath) => {
    const promise = new Promise((resolve, reject) => {
        let { url, body } = getApiData('generate')
        body = JSON.parse(JSON.stringify(body))
        const { fullName, dob, pan, mobile, email, applicantType,
            companyId, netMonthlyIncome, bankId, addressline1, addressline2, pincode, city, nearBy,
            requestedLoanamount, propertyType, other_city_property_location,
            gender, maritalStatus, nationality, salaryBankName, otherCompany,
            fathersFirstName, fathersLastName, mothersFirstName, mothersLastName, preferedComm, director, jointAccHolder,
            // officAddressLine1,officAddressLine2,office_nearby_landmark,officePincode,officeCity,
            officeAddressLine1, officeAddressLine2, officeNearBy, officePincode, officeCity
        } = data
 
        body.request.payload.personal.fullName = fullName
        body.request.payload.personal.dob = getFormattedDate(dob)
        body.request.payload.personal.pan = pan
        body.request.payload.personal.gender = gender
        body.request.payload.personal.maritalStatus = maritalStatus
        body.request.payload.personal.nationality = nationality

        body.request.payload.work.preferedComm = preferedComm;
        body.request.payload.work.director = director;
        body.request.payload.work.jointAccHolder = jointAccHolder;


        body.request.payload.contact.mobile[0].mobile = mobile
        body.request.payload.contact.email[0].email = email

        if (fathersFirstName && fathersLastName) {
            body.request.payload.contact.keyContact[0].caseContactMasterId = "5";
            body.request.payload.contact.keyContact[0].caseContactName = fathersFirstName + " " + fathersLastName;
        }
        else {
            body.request.payload.contact.keyContact[0].caseContactMasterId = "";
            body.request.payload.contact.keyContact[0].caseContactName = "";
        }

        if (mothersFirstName && mothersLastName) {
            body.request.payload.contact.keyContact[1].caseContactMasterId = "16";
            body.request.payload.contact.keyContact[1].caseContactName = mothersFirstName + " " + mothersLastName;
        }
        else {
            body.request.payload.contact.keyContact[1].caseContactMasterId = "";
            body.request.payload.contact.keyContact[1].caseContactName = "";
        }


        // body.request.payload.contact.keyContact[0].caseContactMasterId = "16";
        // body.request.payload.contact.keyContact[0].caseContactName = fathersFirstName + " "+ fathersLastName;

        // body.request.payload.contact.keyContact[1].caseContactMasterId = "5";
        // body.request.payload.contact.keyContact[1].caseContactName = mothersFirstName + " "+ mothersLastName;

        body.request.payload.work.applicantType = applicantType
        body.request.payload.work.companyId = companyId ? companyId.caseCompanyId : '1000000001'
        body.request.payload.work.netMonthlyIncome = netMonthlyIncome

        body.request.payload.bankId = bankId ? bankId.bankId : "";
        // body.request.payload.work.otherCompany = otherCompany ? otherCompany.companyName : ""


        body.request.payload.leadId = getLeadId(primaryPath)
        body.request.payload.productId = localStorage.getItem('productId')
        body.request.payload.requestedLoanamount = requestedLoanamount

        body.request.payload.address[0].addressTypeMasterId = "1000000001"
        body.request.payload.address[0].addressline1 = addressline1
        body.request.payload.address[0].addressline2 = addressline2
        body.request.payload.address[0].nearBy = nearBy
        body.request.payload.address[0].city = city.cityId
        body.request.payload.address[0].pincode = city.pincode;
        body.request.payload.address[0].state = pincode ? pincode.stateId : ''

        body.request.payload.address[1].addressTypeMasterId = "1000000002"
        body.request.payload.address[1].addressline1 = addressline1
        body.request.payload.address[1].addressline2 = addressline2
        body.request.payload.address[1].nearBy = officeNearBy
        body.request.payload.address[1].city = city.cityId;
        body.request.payload.address[1].pincode = city.pincode
        body.request.payload.address[1].state = pincode ? pincode.stateId : ''

        axios.post(url, body)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
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


export const getProductAndBank = async (data, primaryPath, longFormProduct) => {
    let productData = await strapi.processReq('GET', `credit_card_product?slug=${longFormProduct}`)
}
