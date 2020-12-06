import { getApiData } from '../api/api';
import Strapi from "../providers/strapi"

async function getCityData(name,fieldName) {
    console.log('inside comm name',name);
    console.log('inside comm fieldName',fieldName);
    const strapi = new Strapi()
        const { url, body } = getApiData('cities');
        console.log(url)
        console.log(body)
        try {
            const res = await strapi.apiReq('POST', url, body)
            const { cityList } = res.response.payload;
            return cityList;

        } catch (error) {
        }
}

async function getPinCodeData(name, fieldName) {
    console.log('inside getPinCodeData name', name);
    console.log('inside getPinCodeData fieldName', fieldName);
    const strapi = new Strapi()
    const { url, body } = getApiData('pincode');
    try {
        const res = await strapi.apiReq('POST', url, body)
        const { pinList } = res.response.payload;
        return pinList;
       

    } catch (error) {
    }

}

export { getCityData ,getPinCodeData}
