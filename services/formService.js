import axios from 'axios'
import Strapi from '../providers/strapi'
import { getApiData } from '../api/api'
import { getLeadId } from '../utils/localAccess'
import { getFormattedDate } from '../utils/formatDataForApi'
const CancelToken = axios.CancelToken
import { getDocumentIdandTypeId } from '../utils/uploadDocumentHelper'
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
        if (!err.response) {
            throw new Error(err.message)
        } else if (err.response.status == 400) {
            throw new Error('Please enter valid OTP!')
        } else {
            throw new Error('Something went wrong. Please try again.')
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

export const documentUpload = async (docs, documentName) => {
    const { url, body } = getApiData('documentUpload')
    let documentIds = getDocumentIdandTypeId(documentName);
    const { documentId, documentTypeId } = documentIds[0];
    let docList = []
    body.request.payload.caseId = getLeadId()
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

export const generateLead = async (data, primaryPath, formType) => {
    const promise = new Promise((resolve, reject) => {
        let { url, body } = getApiData('orchestration')
        body = JSON.parse(JSON.stringify(body))

        const { fullName, dob, pan, mobile, email, applicantType, title, officeEmail,
            companyId, netMonthlyIncome, bankId, totalWorkExp, cardType, surrogateType, designationId, qualificationId,
            exisTenorBalMonths, exisLoanAmount, exisEmi, exisRemark,
            requestedLoanamount, requestedTenor, propertyType, other_city_property_location,
            gender, maritalStatus, nationality, salaryBankName, otherCompany,
            fathersFirstName, fathersLastName, mothersFirstName, mothersLastName, preferedComm, director, jointAccHolder,
            addressline1, addressline2, pincode, city, nearByLandmark, stdCode,
            officeAddressline1, officeAddressline2, addressline3, officeNearBy, officePincode, officeCity,
            permanentAddressline1, permanentAddressline2, permanentPincode, permannentCity,
            city_location, cost_of_property, propertyPincode, purposeOfLoan,
            utmCampaign, utmMedium, utmSource, utmRemark
        } = data


        body.personal.fullName = fullName
        body.personal.dob = getFormattedDate(dob)
        body.personal.pan = pan
        body.personal.gender = gender
        body.personal.maritalStatus = maritalStatus
        body.personal.nationality = nationality

        body.work.preferedComm = preferedComm;
        body.work.director = director;
        body.work.jointAccHolder = jointAccHolder;
        body.work.totalWorkExp = totalWorkExp

        body.contact.mobile[0].mobile = mobile
        body.contact.email[0].email = email
        body.contact.email[1].email = officeEmail

        if (fathersFirstName && fathersLastName) {
            body.contact.keyContact[0].caseContactMasterId = "5";
            body.contact.keyContact[0].caseContactName = fathersFirstName + " " + fathersLastName;
        }
        else {
            body.contact.keyContact[0].caseContactMasterId = "";
            body.contact.keyContact[0].caseContactName = "";
        }

        if (mothersFirstName && mothersLastName) {
            body.contact.keyContact[1].caseContactMasterId = "16";
            body.contact.keyContact[1].caseContactName = mothersFirstName + " " + mothersLastName;
        }
        else {
            body.contact.keyContact[1].caseContactMasterId = "";
            body.contact.keyContact[1].caseContactName = "";
        }

        body.work.applicantType = applicantType
        body.work.companyId = companyId ? companyId.caseCompanyId : ''
        body.work.netMonthlyIncome = netMonthlyIncome

        body.work.designation = designationId ? designationId.designationId : ""
        body.work.qualification = qualificationId ? qualificationId.qualificationName : ""

        // body.request.payload.bankId = bankId ? bankId.bankId : "";
        body.bankId = typeof bankId === 'string' ? bankId : bankId.bankId ? bankId.bankId : salaryBankName.bankId ? salaryBankName.bankId : ''

        // salaryBankName ? salaryBankName.bankId : "";
        // body.work.otherCompany = otherCompany ? otherCompany.companyName : ""


        body.leadId = getLeadId()
        body.productId = '6'
        body.cardType = cardType ? cardType.cardTypeId ? cardType.cardTypeId : '' : ''
        body.surrogateType = surrogateType ?  surrogateType.surrogateTypeId ? surrogateType.surrogateTypeId : '' : ''
        body.requestedLoanamount = requestedLoanamount

        // for facility requested
        body.existingFacility[0].exisTenorBalMonths = exisTenorBalMonths
        body.existingFacility[0].exisfacility = localStorage.getItem('productId')
        body.existingFacility[0].exisBankId = bankId ? bankId.bankId ? bankId.bankId : '' : ''
        body.existingFacility[0].exisLoanAmount = exisLoanAmount
        body.existingFacility[0].exisEmi = exisEmi
        body.existingFacility[0].exisRemark = exisRemark


        body.requestedTenor = requestedTenor
        // body.request.payload.exisEmi = exisEmi


        // for residence
        body.address[0].addressTypeMasterId = "1000000001"
        body.address[0].addressline1 = addressline1
        body.address[0].addressline2 = addressline2
        body.address[0].addressline3 = addressline3
        body.address[0].landmark = nearByLandmark
        body.address[0].pincode = pincode ? pincode.pincode : ""
        body.address[0].city = pincode ? pincode.cityId : ""
        body.address[0].state = pincode ? pincode.stateId : ''
        body.address[0].stdCode = pincode ? pincode.stdCode : ''

        // for office address
        body.address[1].addressTypeMasterId = "1000000002"
        body.address[1].addressline1 = officeAddressline1
        body.address[1].addressline2 = officeAddressline2
        body.address[1].landmark = officeNearBy
        body.address[1].pincode = officePincode ? officePincode.pincode : ""
        body.address[1].city = officePincode ? officePincode.cityId : ""
        body.address[1].state = officePincode ? officePincode.stateId : ""
        body.address[1].stdCode = officePincode ? officePincode.stdCode : ""

        // for property
        body.address[2].addressTypeMasterId = "1000000004"
        body.address[2].purposeOfLoan = propertyType
        // body.address[2].purposeOfLoan = purposeOfLoan

        body.address[2].propertyValue = cost_of_property
        body.address[2].city = city_location;
        body.address[2].pincode = propertyPincode ? propertyPincode.pincode : "";
        body.address[2].state = propertyPincode ? propertyPincode.stateId : "";
        body.address[2].stdCode = propertyPincode ? propertyPincode.stdCode : "";


        //for permanent add
        body.address[3].addressTypeMasterId = "1000000003"
        body.address[3].addressline1 = permanentAddressline1
        body.address[3].addressline2 = permanentAddressline2
        body.address[3].pincode = permanentPincode ? permanentPincode.pincode : ""
        body.address[3].city = permanentPincode ? permanentPincode.cityId : ""
        body.address[3].state = permanentPincode ? permanentPincode.stateId : ""
        body.address[3].stdCode = permanentPincode ? permanentPincode.stdCode : ""
        
        let utmCampaignChoice = ''
        if(primaryPath == 'rkpl') {
            utmCampaignChoice = utmCampaign ? utmCampaign.includes('offcc') ? utmCampaign : 'offcc-rkpl' : ''
        }  else {
            utmCampaignChoice = utmCampaign ? utmCampaign : ''
        }

        body.utmCampaign = utmCampaignChoice
        body.utmMedium = utmMedium ? utmMedium : ''
        body.utmSource = utmSource ? utmSource : ''
        body.utmRemark = utmRemark ? utmRemark : ''
        
        let headers = {}

        console.log(body)


        if (formType === 'lf' && primaryPath !== 'rkpl') {
            headers = {
                'sync': 'true',
                'formBankId': data.bankId.toString()
            }

        }

        return

        axios.post(url, body, { headers })
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

export const sendNotification = async (leadId, action) => {
    const { url, body } = getApiData('sendNotification')
    body.request.payload.leadId = leadId
    body.request.payload.actionName = action
    try {
        const res = await axios.post(url, body)
        return res;
    } catch (error) { }
}
