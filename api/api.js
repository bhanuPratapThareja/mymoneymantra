import { env } from './../env/env';

const api = {
    uatBaseUrl: 'http://203.122.46.189:8580/mifinlms/',
    devBaseUrl: 'http://203.122.46.189:8580/mifinlms/',
    prodBaseUrl: 'http://203.122.46.189:8580/mifinlms/',
    routes: {
        offers: {
            uatUrl: 'api/customer/v1/profile/',
            devUrl: 'api/customer/v1/profile/',
            prodUrl: 'api/customer/v1/profile/',
            body: { request: { header: { correlationId: "25478965874", appId: "MMMWEBAPP" }, payload: { mobileNo: "9999000090", customerId: "9999000090" } } }
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