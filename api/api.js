import { env } from './../env/env';

const api = {
    mliDevBaseUrl: 'https://djedtvaxn2.execute-api.ap-south-1.amazonaws.com/posvdev/',
    mliUatBaseUrl: 'https://oqh2u2s6hf.execute-api.ap-south-1.amazonaws.com/posvuat/',
    mliProdBaseUrl: 'https://lg0gitgvtb.execute-api.ap-south-1.amazonaws.com/posvprod/',
    routes: {
        offers: {
            mliDevUrl: '/api/customer/v1/profile/offers',
            mliUatUrl: '/api/customer/v1/profile/offers',
            mliProdUrl: '/api/customer/v1/profile/offers'
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