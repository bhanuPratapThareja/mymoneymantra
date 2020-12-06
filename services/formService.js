import { getApiData } from '../api/api';
import Strapi from '../providers/strapi'

export const getDropdownList = async type => {
    const strapi = new Strapi()
    const { url, body } = getApiData(type)
    const res = await strapi.apiReq('POST', url, body)
    if(res && res.response) return res.response.payload
    else return []
}