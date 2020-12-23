import axios from 'axios';
import { getApiData } from '../api/api';

 export const viewOffer = async() =>{
    const { url, body } = getApiData('customerOfferView');
    try {
        const res =  await axios.post(url, body)
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

export const customerOfferData = async() =>{
    const { url, body } = getApiData('customerOffer');
    try {
        const res =  await axios.post(url, body)
        //  console.log('customerOffer res',res.data.response.payload);
         
    } catch (error) {

    }
 }

