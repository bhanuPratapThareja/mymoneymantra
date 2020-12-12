import Strapi from '../providers/strapi'
import { getApiData } from '../api/api';

export const getMastersData = async (type, value='111') => {
    const strapi = new Strapi()
    const { url, body } = getApiData('masters')
    body.request.payload.name = value
    const res = await strapi.apiReq('POST', url, body)
    if(res && res.response) return res.response.payload
    else return null
}