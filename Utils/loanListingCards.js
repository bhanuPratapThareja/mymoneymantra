import { getApiData } from '../api/api';
import Strapi from '../providers/strapi'
const strapi = new Strapi()

export const getOfferCards = data => {
    let cards = []
    data.dynamic.forEach(block => {
        if(block.__component === 'blocks.offer-details-card') {
            cards = block.offer_cards
        }
    })
    return cards
}

export const loanListingProductDecision = async(data) => {
    let cardData = [];
    console.log('data dynamic+++++++',data.dynamic);
    data.dynamic.forEach(card => {
      
        if(card.__component == 'blocks.offer-details-card'){
            console.log('offer_cards-----------------',card.offer_cards);
            // console.log('bankId-----------------',card.offer_cards.bankId);
            let BankId = card.offer_cards.map(({ bankId }) => bankId )
            let ProductId = card.offer_cards.map(({ productId }) => productId )
           
            console.log('BankId@@@@@@@@@@',BankId)
            console.log('ProductId@@@@@@@@@@',ProductId)
            cardData=  BankId ;
          
        }
    })
    const { url, body } = getApiData('leadProductDecision');
    
    try {
        const res = await strapi.apiReq('POST', url, body)
        console.log('url for prod decision', url);
        console.log('body for prod decision', body);
        let resMessage =  res.response.payload.productDecision;
        console.log('resMessage ==',resMessage);
        return resMessage;

    } catch (error) {

    }
    
}