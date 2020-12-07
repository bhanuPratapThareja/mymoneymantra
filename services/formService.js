import { getApiData } from '../api/api';
import Strapi from '../providers/strapi'

export const getDropdownList = async (type, value) => {
    const strapi = new Strapi()
    const { url, body } = getApiData(type)
    body.request.payload.name = value
    console.log(body)
    const res = await strapi.apiReq('POST', url, body)
    if(res && res.response) return res.response.payload
    else return []
}