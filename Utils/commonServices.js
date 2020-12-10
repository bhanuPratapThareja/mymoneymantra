import { getApiData } from '../api/api';
import Strapi from "../providers/strapi"

async function getCityData(name,value) {
    console.log('inside comm name',name);
    
    const strapi = new Strapi()
        const { url, body } = getApiData('cities');
      
        body.request.payload.name = value;
        try {
            const res = await strapi.apiReq('POST', url, body)
            const { cityList } = res.response.payload;
           
            return cityList;

        } catch (error) {
        }
}

async function getPinCodeData(name, value) {
    console.log('inside getPinCodeData name', name);
    console.log('inside getPinCodeData value', value);
    const strapi = new Strapi()
    const { url, body } = getApiData('pincode');
    body.request.payload.name = value;
    console.log('body.request.payload.name pincode',body.request.payload.name);
    try {
        const res = await strapi.apiReq('POST', url, body)
        const { pinList } = res.response.payload;
        return pinList;
       

    } catch (error) {
    }

}

export { getCityData ,getPinCodeData}
