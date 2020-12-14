import { env } from './../env/env';

const api = {
    devBaseUrl: 'http://203.122.46.189:8060/masters/',
    uatBaseUrl: 'http://203.122.46.189:8060/masters/',
    prodBaseUrl: 'http://203.122.46.189:8060/masters/',
    routes: {
        authenticate: {
            devUrl: 'api/jwt/v1/authenticate',
            uatUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { appId:"leadgenerateapi", token:"mmm@2O!9", role:"mobileAppLogin" }
        },
        masters: {
            devUrl: 'api/master/v1/masters',
            uatUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { request: { header: { correlationId: "", appId: "MMMWEBAPP" }, payload: { } } }
        },
        otp: {
            devUrl: 'api/notification/v1/sms/otp',
            uatUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { request: { header: { correlationId: "", appId: "MMMWEBAPP" }, payload: { mobileNo: '' } } }
        },
        otpverify: {
            devUrl: 'api/notification/v1/sms/otpverify',
            uatUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { request: { header: { correlationId: "", appId: "MMMWEBAPP" }, payload: { mobileNo: '' } } }
        },
        offers: {
            devUrl: 'api/customer/v1/profile/',
            uatUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { request: { header: { correlationId: "", appId: "MMMWEBAPP" }, payload: { mobileNo: "9999000090", customerId: "9999000090" } } }
        },
        company: {
            devUrl: 'api/master/v1/company',
            uatUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "", appId: "MMMWEBAPP" }, payload: { name: '' } } }
        },
        cities: {
            devUrl: 'api/master/v1/',
            uatUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "", appId: "MMMWEBAPP" }, payload: { name: '' } } }
        },
        pincode: {
            devUrl: 'api/master/v2/pincode',
            uatUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { name: '' } } }
        },
        generate: {
            devUrl: 'api/lead/v1/',
            uatUrl: 'api/lead/v1/',
            prodUrl: 'api/master/v1/', 

            body: {
                "request": {
                    "header": {
                        "correlationId": "25478965874",
                        "appId": "MMMWEBAPP"
                    },
                    "payload": {
                        "personal": {
                            "title": "1000000001",
                            "firstName": "Kumar",
                            "lastName": "Anilll",
                            "middleName": "",
                            "dob": "20-05-1985",
                            "gender": "2",
                            "maritalStatus": "",
                            "nationality": "1",
                            "dependents": "",
                            "pan": "BQGPM4200M",
                            "mothersName": "Anu"
                        },
                        "contact": {
                            "mobile": [
                                {
                                    "addressTypeMasterId": "",
                                    "mobile": "9882788064",
                                    "isDefault": "N"
                                }
                            ],
                            "email": [
                                {
                                    "addressTypeMasterId": "",
                                    "email": "testmail@gmail.com",
                                    "isDefault": "N"
                                }
                            ],
                            "keyContact": [
                                {
                                    "caseContactMasterId": "",
                                    "caseContactName": "",
                                    "caseContactEmail": "",
                                    "caseContactMobileNo": ""
                                }
                            ]
                        },
                        "work": {
                            "applicantType": "1000000004",
                            "otherCompany": "",
                            "nature": "2",
                            "companyId": "1000000001",
                            "typeOfCompaY": "1",
                            "netMonthlyIncome": "50000",
                            "grossMonthlyIncome": "45000",
                            "modeOfSalary": "",
                            "yearsCurrentJob": "",
                            "totalWorkExp": "",
                            "annualTurnover": "",
                            "annualIncome": "",
                            "monthlyRental": "",
                            "designation": "VICE PRESIDENT",
                            "qualification": "1000000002",
                            "profession": ""
                        },
                        "requestedLoanamount": "",
                        "requestedTenor": "",
                        "purposeOfLoan": "",
                        "bankId": "10038",
                        "leadId": "",
                        "productId": "6",
                        "cardAge": "",
                        "cardType": "Shoprite",
                        "exisEmi": "",
                        "exisLoanAmount": "",
                        "loanStartYear": "",
                        "totalExisTenor": "",
                        "offerId": "123",
                        "address": [
                            {
                                "addressTypeMasterId": "1000000001",
                                "addressline1": "fdfdffd",
                                "addressline2": "dfdfdfd",
                                "addressline3": "dfdsdsdfdf",
                                "city": "",
                                "state": "",
                                "pincode": "",
                                "occupancyStatus": "",
                                "livingSince": "",
                                "stdCode": "",
                                "landline": "",
                                "landmark": "",
                                "livingSinceMM": "",
                                "isMaillingAddress": "",
                                "propertyName": "",
                                "developerName": "",
                                "projectrName": "",
                                "remarks": "",
                                "otherDeveloperName": "",
                                "otherProjectName": ""
                            }
                        ]
                    }
                }

            }

        }


    }
}

const getUrl = route => {
    const baseUrl = api[`${env}BaseUrl`]
    const pathUrl = `${env}Url`
    return `${baseUrl}${api['routes'][route][pathUrl]}`
}

const getBody = route => {
    return api['routes'][route]['body']
}

export const getApiData = route => {
    const url = getUrl(route)
    const body = getBody(route)
    return { url, body }
}