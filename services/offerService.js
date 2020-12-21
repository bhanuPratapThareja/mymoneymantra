import axios from 'axios';
import { getApiData } from '../api/api';

 const viewOffer = async() =>{
    const { url, body } = getApiData('offers');

    
    try {
        const res =  axios.post(url, body)
        console.log('url in offers', url);
        console.log('body in offers', body);
       //  let resMessage = res.response.msgInfo.message;

    } catch (error) {

    }
 }

 export default viewOffer;