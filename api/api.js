import { env } from './../env/env';

const api = {
    uatBaseUrl: 'https://mmmwebapp.herokuapp.com/api/',
    devBaseUrl: 'https://mmmwebapp.herokuapp.com/api/',
    prodBaseUrl: 'https://mmmwebapp.herokuapp.com/api/',
    routes: {
        offers: {
            uatUrl: 'api/customer/v1/profile/',
            devUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { mobileNo: "9999000090", customerId: "9999000090" } } }
        },
        banks: {

        },
        companies: {

        },
        cities: {
            uatUrl: 'api/master/v1/',
            devUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { name: '' } } }
        },
        pincode:{
            uatUrl: 'api/master/v1/',
            devUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { stateID: "9999000090", cityMasterId: "14448" } } }
        },
        generate :{
            uatUrl: 'api/lead/v1/',
            devUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { gender : "", fullName : {firstName: "", lastName: ""}, dob:"",nationality:"",phoneNo :"",email :"",pan:"",monthlyIncome:"",stateID: "9999000090", cityMasterId: "14448" } } }
        },
        leadProductDecision  :{
            uatUrl: 'lead/v1/ ',
            devUrl: 'lead/v1/ ',
            prodUrl: 'lead/v1/ ',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: {"leadId":"PR12344343"} } }
        }


    }
}

const getUrl = route => {
    const baseUrl = api[`${env}BaseUrl`]
    const pathUrl = `${env}Url`
    return `${baseUrl}${api['routes'][route][pathUrl]}${route}`
}

const getBody = route => {
    return api['routes'][route]['body']
}

export const getApiData = route => {
    const url = getUrl(route)
    const body = getBody(route)
    return { url, body }
}