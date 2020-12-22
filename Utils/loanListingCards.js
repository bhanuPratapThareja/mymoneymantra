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
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if(!pendingCards.length) {
                        resolve (block.cards)
                    }
                })
            }     
        })
    })
}