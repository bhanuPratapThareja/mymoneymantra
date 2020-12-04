import { getApiData } from '../api/api';
import Strapi from "../providers/strapi"

async function getCityData(name,fieldName) {
    console.log('inside comm name',name);
    console.log('inside comm fieldName',fieldName);
    const strapi = new Strapi()
        const { url, body } = getApiData('cities');
        try {
            const res = await strapi.apiReq('POST', url, body)
            const { cityList } = res.response.payload;
            return cityList;
           
            // const block = { ...this.state[fieldName] }
            // console.log('inside comm blockData',blockData)
            // block.cityList = cityList;

            // this.setState({ [fieldName]: block }, () => {
            //     console.log('=====', this.state);
            // })

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
