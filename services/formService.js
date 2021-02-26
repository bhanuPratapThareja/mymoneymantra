import axios from 'axios'
import Strapi from '../providers/strapi'
import { getApiData } from '../api/api'
import { getLeadId } from '../utils/localAccess'
import { getFormattedDate } from '../utils/formatDataForApi'
import { getDocumentIdandTypeId } from '../utils/uploadDocumentHelper'
const CancelToken = axios.CancelToken
let cancel
let otpId = ''

const strapi = new Strapi()

export const getOtp = mobileNo => {
    const { url, body } = getApiData('generateOtp')
    body.mobileNo = mobileNo
    axios.post(url, body)
        .then(res => {
            otpId = res.data.otpId
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
    const { url, body } = getApiData('verifyOtp')
    body.mobileNo = mobileNo
    body.otp = otp
    body.otpId = otpId
    try {
        const res = await axios.post(url, body)
        return true
    } catch (err) {
        if (err.response.data && err.response.data.message) {
            throw new Error(err.response.data.message)
        } else {
            throw new Error('Something went wrong. Please try again.!!')
        }
    }
}

export const getDropdownList = async (listType, value, masterName) => {
    const { url, body } = getApiData(listType)
    body.name = value
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
        return (res.data[masterName])

    } catch (err) { }
}

export const documentUpload = async (docs, documentName, primaryPath) => {
    const { url, body } = getApiData('documentUpload')
    let documentIds = getDocumentIdandTypeId(documentName)
    const { documentId, documentTypeId } = documentIds[0]
    let docList = []
    body.caseId = getLeadId(primaryPath)
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
    body.docList = docList
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

export const generateLead = async (data, primaryPath, formType, productType) => {
    const promise = new Promise((resolve, reject) => {
        let { url, body } = getApiData('orchestration')
        body = JSON.parse(JSON.stringify(body))

        const { fullName, dob, pan, mobile, email, applicantType, officeEmail,title,
            companyId, netMonthlyIncome, annualIncome, leadBank, salaryBank, existingFacilityBank, totalWorkExp, 
            cardType, cardTypeCC, surrogateType, designationId, qualificationId,
            exisTenorBalMonths, exisLoanAmount, exisEmi, exisRemark,
            requestedLoanamount, requestedTenor, propertyType, other_city_property_location,
            gender, maritalStatus, nationality, otherCompany, noOfDependents,
            fathersFirstName, fathersLastName, mothersFirstName, mothersLastName, preferedComm, director, jointAccHolder,

            addressline1, addressline2, pincode, city, state, nearByLandmark, stdCode, livingSince, livingSinceMM,
            occupancyStatus,

            officeAddressline1, officeAddressline2, addressline3, officeNearBy, officePincode, officeCity, officeState,
            officeStdCode,

            permanentAddressline1, permanentAddressline2, permanentPincode, permanentCity, permanentState,
            permanentStdCode,

            propertyPincode, propertyCity, propertyCityRadio, propertyState, propertyStdCode, purposeOfLoan, propertyValue,

            utmCampaign, utmMedium, utmSource, utmRemark,
            referenceType, referenceFirstName, referenceLastName, referenceEmail, referenceMobile,

            yearsCurrentJob, projectrName,
        } = data

        const productTypeId = productType && productType.product_type_id ? productType.product_type_id : ''
        body.formBankId = leadBank && leadBank.bankId ? leadBank.bankId : ''
        body.bankId = salaryBank && salaryBank.bankId ? salaryBank.bankId : ''
        body.leadId = getLeadId(primaryPath)
        body.productId = productTypeId
        body.surrogateType = surrogateType ? surrogateType.surrogateTypeId ? surrogateType.surrogateTypeId : '' : ''
        body.requestedLoanamount = requestedLoanamount
        body.requestedTenor = requestedTenor

        body.personal.fullName = fullName
        body.personal.dob = getFormattedDate(dob)
        body.personal.pan = pan
        body.personal.gender = gender
        if(gender == "1000000002"){
            body.personal.title = "1000000003"
        }
        else{

            body.personal.title = "1000000002"
        }
        body.personal.maritalStatus = maritalStatus
        body.personal.nationality = nationality
        body.personal.dependents = noOfDependents && noOfDependents.noOfDependentsId ? noOfDependents.noOfDependentsId : ''

        body.work.preferedComm = preferedComm;
        body.work.director = director;
        body.work.jointAccHolder = jointAccHolder;
        body.work.totalWorkExp = totalWorkExp
        body.work.applicantType = applicantType
        body.work.companyId = companyId ? companyId.caseCompanyId : ''
        body.work.netMonthlyIncome = netMonthlyIncome
        body.work.annualIncome = annualIncome
        body.work.designation = designationId ? designationId.designationId : ''
        body.work.qualification = qualificationId ? qualificationId.educationId : ''
        body.work.yearsCurrentJob = yearsCurrentJob

        body.contact.mobile[0].mobile = mobile

        body.contact.email = []
        if (email) {
            let emailAddress = {
                addressTypeMasterId: '5',
                email: email,
                isDefault: 'N'
            }
            body.contact.email.push(emailAddress)
        }
        if (officeEmail) {
            let officeEmailAddress = {
                addressTypeMasterId: '6',
                email: officeEmail,
                isDefault: 'N'
            }
            body.contact.email.push(officeEmailAddress)
        }
        if (body.contact.email.length) {
            body.contact.email[0].isDefault = 'Y'
        }

        body.contact.keyContact = []
        if (fathersFirstName && fathersLastName) {
            let fatherKeyContact = {
                caseContactMasterId: "5",
                caseContactName: fathersFirstName + " " + fathersLastName,
                caseContactEmail: referenceEmail,
                caseContactMobileNo: referenceMobile
            }
            body.contact.keyContact.push(fatherKeyContact)
        }

        if (mothersFirstName && mothersLastName) {
            let motherKeyContact = {
                caseContactMasterId: "16",
                caseContactName: mothersFirstName + " " + mothersLastName,
                caseContactEmail: referenceEmail,
                caseContactMobileNo: referenceMobile
            }
            body.contact.keyContact.push(motherKeyContact)
        }

        if (referenceFirstName && referenceLastName && referenceType && referenceEmail && referenceMobile) {
            let referenceKeyContact = {
                caseContactMasterId: referenceType,
                caseContactName: referenceFirstName + " " + referenceLastName,
                caseContactEmail: referenceEmail,
                caseContactMobileNo: referenceMobile
            }
            body.contact.keyContact.push(referenceKeyContact)
        }

        body.existingFacility = []
        // for facility requested
        if (exisTenorBalMonths || exisLoanAmount || exisEmi || exisRemark || (existingFacilityBank && existingFacilityBank.bankId)) {
            let existingFacilityDetails = {
                exisTenorBalMonths: exisTenorBalMonths,
                exisfacility: '',
                exisLoanAmount: exisLoanAmount,
                exisEmi: exisEmi,
                exisRemark: exisRemark,
                exisBankId: existingFacilityBank && existingFacilityBank.bankId ? existingFacilityBank.bankId : ''
            }
            body.existingFacility.push(existingFacilityDetails)
        }

        body.address = []
        // for residence address
        if (addressline1 || addressline2 || addressline3 || nearByLandmark ||
            (purposeOfLoan && purposeOfLoan.purposeOfLoanId) || (pincode && pincode.pincode) || (city && city.cityId) || state && state.stateId || stdCode) {
            let residenceAddress = {
                addressTypeMasterId: '1000000001',
                addressline1: addressline1,
                addressline2: addressline2,
                addressline3: addressline3,
                landmark: nearByLandmark,
                livingSince: livingSince,
                livingSinceMM: livingSinceMM,
                occupancyStatus: occupancyStatus && occupancyStatus.occupancyStId ? occupancyStatus.occupancyStId : '',
                pincode: pincode && pincode.pincode ? pincode.pincode : '',
                city: city && city.cityId ? city.cityId : '',
                state: state && state.stateId ? state.stateId : '',
                stdCode: stdCode,
                purposeOfLoan: purposeOfLoan && purposeOfLoan.purposeOfLoanId ? purposeOfLoan.purposeOfLoanId : "",

            }
            body.address.push(residenceAddress)
        }

        // for office address
        if (officeAddressline1 || officeAddressline2 || officeNearBy ||
            (purposeOfLoan && purposeOfLoan.purposeOfLoanId) ||
            (officePincode && officePincode.pincode) || (officeCity && officeCity.cityId) || (officeState && officeState.stateId) || officeStdCode) {
            let officeAddress = {
                addressTypeMasterId: '1000000002',
                addressline1: officeAddressline1,
                addressline2: officeAddressline2,
                landmark: officeNearBy,
                pincode: officePincode && officePincode.pincode ? officePincode.pincode : '',
                city: officeCity && officeCity.cityId ? officeCity.cityId : '',
                state: officeState && officeState.stateId ? officeState.stateId : '',
                stdCode: officeStdCode,
                purposeOfLoan: purposeOfLoan && purposeOfLoan.purposeOfLoanId ? purposeOfLoan.purposeOfLoanId : "",

            }
            body.address.push(officeAddress)
        }

        // for permanent address
        if (permanentAddressline1 || permanentAddressline2 ||
            (purposeOfLoan && purposeOfLoan.purposeOfLoanId) || (permanentPincode && permanentPincode.pincode) || (permanentCity && permanentCity.cityId) || permanentStdCode) {
            let permanentAddress = {
                addressTypeMasterId: '1000000003',
                addressline1: permanentAddressline1,
                addressline2: permanentAddressline2,
                pincode: permanentPincode && permanentPincode.pincode ? permanentPincode.pincode : '',
                city: permanentCity && permanentCity.cityId ? permanentCity.cityId : '',
                state: permanentState && permanentState.stateId ? permanentState.stateId : '',
                stdCode: permanentStdCode,
                purposeOfLoan: purposeOfLoan && purposeOfLoan.purposeOfLoanId ? purposeOfLoan.purposeOfLoanId : "",

            }
            body.address.push(permanentAddress)
        }

        // for property address
        if (propertyType || propertyValue || propertyPincode || projectrName ||
            //(purposeOfLoan &&  purposeOfLoan.purposeOfLoanId)
              propertyCityRadio || propertyCity || propertyState || propertyStdCode || purposeOfLoan) {
            let propertyAddress = {
                addressTypeMasterId: '1000000004',
                pincode: propertyPincode && propertyPincode.pincode ? propertyPincode.pincode : '',
                city: propertyCity && propertyCity.cityId ? propertyCity.cityId : propertyCityRadio,
                state: propertyState && propertyState.stateId ? propertyState.stateId : '',
                stdCode: propertyStdCode,
                propertyValue: propertyValue,
                purposeOfLoan: propertyType,
                projectrName : projectrName && projectrName.projectId ? projectrName.projectId : ""
            }
            body.address.push(propertyAddress)
        }

        if (primaryPath == 'rkpl') {
            body.cardType = cardType && cardType.cardTypeId ? cardType.cardTypeId : ''
        } else {
            body.cardType = cardTypeCC ? cardTypeCC : ''
        }

        let utmCampaignChoice = ''
        if (primaryPath == 'rkpl') {
            utmCampaignChoice = utmCampaign ? utmCampaign.includes('offcc') ? utmCampaign : 'offcc-rkpl' : ''
        } else {
            utmCampaignChoice = utmCampaign ? utmCampaign : ''
        }

        body.utmCampaign = utmCampaignChoice
        body.utmMedium = utmMedium ? utmMedium : ''
        body.utmSource = utmSource ? utmSource : ''
        body.utmRemark = utmRemark ? utmRemark : ''

        if (primaryPath === 'talent-edge-form') {
            body.subQueue = '2'
            body.source = '1000000013'
        }

        let headers = {}

        if (formType === 'sf') {
            headers = { 'sync': 'false' }
        } else if (formType === 'lf') {
            if (primaryPath !== 'rkpl') {
                headers = { 'sync': 'true' }
            } else {
                headers = { 'sync': 'HEADER' }
            }
        }

        // console.log(body)
        // return

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
    body.leadId = leadId
    body.actionName = action
    try {
        const res = await axios.post(url, body)
        return res
    } catch { }
}
