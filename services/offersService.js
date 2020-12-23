import { getApiData } from '../api/api';
import axios from 'axios'
import Strapi from '../providers/strapi'
const strapi = new Strapi()

const defaultDecision = 'E Connect'

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



export const getProductDecision = cards => {
    console.log('cardscards:  ', cards)
    const promise = new Promise((resolve) => {
        const pendingCards = [...cards]
        const { url, body } = getApiData('leadProductDecision')

        pendingCards.forEach(async card => {
            body.request.payload.productId = card.product_id
            body.request.payload.bankId = card.bank.bank_id
            let productDecision = ''
            try {
                const res = await axios.post(url, body)
                productDecision = res.data.response.payload.productDecision
            } catch {
                productDecision = defaultDecision
            }
            card.productDecision = productDecision
            pendingCards.shift()
            if (!pendingCards.length) {
                resolve(cards)
            }
        })
    })
    return promise
}

export const getOfferWithBank = offer => {
    const promise = new Promise(async (resolve) => {
        const bankData = await strapi.processReq('GET', `banks?id=${offer.bank}`)
        offer.bank = bankData[0]
        resolve(offer)
    })
    return promise
}

export const updatePopularOffers = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'blocks.popular-offers') {
                let pendingCards = [...block.cards]
                block.cards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.cards)
                    }
                })
            }
        })
    })
}

export const updateTrendingOffers = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'blocks.trending-offers') {
                let pendingCards = [...block.cards]
                pendingCards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.cards)
                    }
                })
            }
        })
    })
}
