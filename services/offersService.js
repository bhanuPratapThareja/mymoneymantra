import axios from 'axios';
import { getApiData } from '../api/api';

 export const viewOffer = async() =>{
    const { url, body } = getApiData('offers');
    try {
        const res =  axios.post(url, body)
       //  let resMessage = res.response.msgInfo.message;
    } catch (error) {

    }
 }

 export const loanListingProductDecision = async(data) => {
   let cardData = [];
   data.dynamic.forEach(card => {
       if(card.__component == 'blocks.offer-details-card'){
           let BankId = card.offer_cards.map(({ bankId }) => bankId )
           let ProductId = card.offer_cards.map(({ productId }) => productId )
           cardData=  BankId ;
         
       }
   })
   const { url, body } = getApiData('leadProductDecision');
   
   try {
       const res = await axios.post(url, body)
       let resMessage =  res.response.payload.productDecision;
       return resMessage;

   } catch (error) {

   }
   
}

