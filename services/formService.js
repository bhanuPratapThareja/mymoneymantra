import axios from 'axios'
import Strapi from '../providers/strapi'
import { getApiData } from '../api/api'
import { getLeadId } from '../utils/localAccess'
import { getFormattedDate } from '../utils/formatDataForApi'
const CancelToken = axios.CancelToken
import { getDocumentIdandTypeId } from '../Utils/uploadDocumentHelper'
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
        console.log('otp verify res', res);
        if (res.data.response.msgInfo.code == 200) {
            console.log('if')
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

export const documentUpload = async (docs, documentName, primaryPath) => {
    const { url, body } = getApiData('documentUpload')
    let documentIds = getDocumentIdandTypeId(documentName);
    const { documentId, documentTypeId } = documentIds[0];
    let docList = []
    body.request.payload.caseId = getLeadId(primaryPath)
    for (let i = 0; i < docs.length; i++) {
        const { type, base64 } = docs[i]
        let doc = {
            documentId,
            documentTypeId,
            documentExtension: type.split("/")[1],
            docBytes: base64.split(",")[1]
        }
        docList.push(doc)
    }
    body.request.payload.docList = docList
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
        let { url, body } = getApiData('orchestration')
        body = JSON.parse(JSON.stringify(body))
        const { fullName, dob, pan, mobile, email, applicantType, title, officeEmail,
            companyId, netMonthlyIncome, bankId, totalWorkExp,
            requestedLoanamount, requestedTenor, exisEmi, propertyType, other_city_property_location,
            gender, maritalStatus, nationality, salaryBankName, otherCompany,
            fathersFirstName, fathersLastName, mothersFirstName, mothersLastName, preferedComm, director, jointAccHolder,
            addressline1, addressline2, pincode, city, nearByLandmark,
            officeAddressline1, officeAddressline2, addressline3, officeNearBy, officePincode, officeCity,
            permanentAddressline1, permanentAddressline2, permanentPincode, permannentCity,
            city_location, cost_of_property,
            propertyPincode

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
        body.request.payload.work.totalWorkExp = totalWorkExp

        body.request.payload.contact.mobile[0].mobile = mobile
        body.request.payload.contact.email[0].email = email
        body.request.payload.contact.email[1].email = officeEmail

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

        body.request.payload.work.applicantType = applicantType
        body.request.payload.work.companyId = companyId ? companyId.caseCompanyId : ''
        body.request.payload.work.netMonthlyIncome = netMonthlyIncome

        // body.request.payload.bankId = bankId ? bankId.bankId : "";
        body.request.payload.bankId = salaryBankName ? salaryBankName.bankId : "";
        // body.request.payload.work.otherCompany = otherCompany ? otherCompany.companyName : ""


        body.request.payload.leadId = getLeadId(primaryPath)
        body.request.payload.productId = localStorage.getItem('productId')
        body.request.payload.requestedLoanamount = requestedLoanamount
        // console.log('body.request.payload.requestedTenor',body.request.payload.requestedTenor)
        // console.log('requestedTenor',requestedTenor)
        body.request.payload.requestedTenor = requestedTenor
        body.request.payload.exisEmi = exisEmi

        // for residence
        body.request.payload.address[0].addressTypeMasterId = "1000000001"
        body.request.payload.address[0].addressline1 = addressline1
        body.request.payload.address[0].addressline2 = addressline2
        body.request.payload.address[0].addressline3 = addressline3
        body.request.payload.address[0].landmark = nearByLandmark
        body.request.payload.address[0].pincode = pincode ? pincode.pincode : "";
        body.request.payload.address[0].city = pincode ? pincode.cityId : "";
        body.request.payload.address[0].state = pincode ? pincode.stateId : ''
        // body.request.payload.address[0].stdCode = pincode ? pincode.stdCode : ''

        // for office address
        body.request.payload.address[1].addressTypeMasterId = "1000000002"
        body.request.payload.address[1].addressline1 = officeAddressline1
        body.request.payload.address[1].addressline2 = officeAddressline2
        body.request.payload.address[1].landmark = officeNearBy
        body.request.payload.address[1].pincode = officePincode ? officePincode.pincode : ""
        body.request.payload.address[1].city = officePincode ? officePincode.cityId : ""
        body.request.payload.address[1].state = officePincode ? officePincode.stateId : ""
        // body.request.payload.address[1].stdCode = officePincode ? officePincode.stdCode : ""

        // for property
        // console.log('for property propertyPincode',propertyPincode)
        body.request.payload.address[2].addressTypeMasterId = "1000000004"
        body.request.payload.address[2].purposeOfLoan = propertyType
        body.request.payload.address[2].propertyValue = cost_of_property
        body.request.payload.address[2].city = city_location;
        body.request.payload.address[2].pincode = propertyPincode ? propertyPincode.pincode : "";
        body.request.payload.address[2].state = propertyPincode ? propertyPincode.stateId : "";
        //body.request.payload.address[1].state = pincode ? pincode.stateId : ''



        //for permanent add
        // console.log('form service permanentPincode',permanentPincode)
        body.request.payload.address[3].addressTypeMasterId = "1000000003"
        body.request.payload.address[3].addressline1 = permanentAddressline1
        body.request.payload.address[3].addressline2 = permanentAddressline2
        body.request.payload.address[3].pincode = permanentPincode ? permanentPincode.pincode : ""
        body.request.payload.address[3].city = permanentPincode ? permanentPincode.cityId : ""
        body.request.payload.address[3].state = permanentPincode ? permanentPincode.stateId : ""


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

export const orchestrationApi = async (body) => {
    const { url } = getApiData('orchestration')
    try {
        const res = axios.post(url, body)
    }
    catch (error) {

    }

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
    const { url, body } = getApiData('orchestration')

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

export const sendNotification = async (leadIdSendNotification) => {
    console.log('in forservices leadIdSendNotification', leadIdSendNotification)
    const { url, body } = getApiData('sendNotification')
    body.request.payload.leadId = leadIdSendNotification;
    body.request.payload.actionName = "Short Form Submit";
    try {
        const res = await axios.post(url, body)
        return res;
    } catch (error) { }
}
