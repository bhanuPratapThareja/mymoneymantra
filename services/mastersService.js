import Strapi from '../providers/strapi'
import { getApiData } from '../api/api';
import { getCompanyMaster } from './companiesMaster'
import { getPincodeMaster } from './pincodeMaster'

export const getMastersData = async (type, value='111') => {
    const strapi = new Strapi()
    const { url, body } = getApiData('masters')
    body.request.payload.name = value
    const res = await strapi.apiReq('POST', url, body)
    if(res && res.response) return res.response.payload
    else return null
}


export const getCompanyMastersData = async (type, value) => {
    const strapi = new Strapi()
    const { url, body } = getApiData('companies')
    body.request.payload.name = value
    // const res = await strapi.apiReq('POST', url, body)
    const res = getCompanyMaster()
    if(res && res.response) return res.response.payload
    else return null
}

export const getPincodeMastersData = async (type, value) => {
    const strapi = new Strapi()
    const { url, body } = getApiData('pincode')
    body.request.payload.name = value
    // const res = await strapi.apiReq('POST', url, body)
    const res = getPincodeMaster()
    if(res && res.response) return res.response.payload
    else return null
}