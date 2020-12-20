import { getApiData } from '../api/api';
import Strapi from '../providers/strapi'
const strapi = new Strapi()

export const getOfferCards = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'blocks.loan-listing-offer-cards') {
                let pendingCards = [...block.cards]
                block.cards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const buttonData = await strapi.processReq('GET', `listing_offer_card_buttons?id=${card.listing_offer_card_button}`)
                    // console.log('bankData data: ', bankData)
                    card.bank = bankData[0]
                    // card.listing_offer_card_button = buttonData[0]
                    pendingCards.shift()
                    if(!pendingCards.length) {
                        resolve (block.cards)
                    }
                })
            }     
        })
    })
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