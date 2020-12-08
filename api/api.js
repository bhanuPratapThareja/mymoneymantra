import { env } from './../env/env';

const api = {
    devBaseUrl: 'https://mmmwebapp.herokuapp.com/',
    uatBaseUrl: 'http://203.122.46.189:8060/masters/',
    prodBaseUrl: 'http://203.122.46.189:8060/masters/',
    routes: {
        offers: {
            devUrl: 'api/customer/v1/profile/',
            uatUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { mobileNo: "9999000090", customerId: "9999000090" } } }
        },
        banks: {

        },
        companies: {
            devUrl: 'api/master/v1/',
            uatUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { name: '' } } }
        },
        cities: {
            devUrl: 'api/master/v1/',
            uatUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { name: '' } } }
        },
        pincode:{
            devUrl: 'api/master/v1/',
            uatUrl: 'api/master/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { name: '' } } }
        },
        generate :{
            devUrl: 'api/master/v1/',
            uatUrl: 'api/lead/v1/',
            prodUrl: 'api/master/v1/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { gender : "", fullName : {firstName: "", lastName: ""}, dob:"",nationality:"",phoneNo :"",email :"",pan:"",monthlyIncome:"",stateID: "9999000090", cityMasterId: "14448" } } }
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