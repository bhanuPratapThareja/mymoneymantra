import Strapi from '../providers/strapi'
const strapi = new Strapi()

export const updateOfferCards = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'blocks.loan-listing-offer-cards') {
                let pendingCards = [...block.cards]
                block.cards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if(!pendingCards.length) {
                        resolve (block.cards)
                    }
                })
            }     
            if (block.__component === 'blocks.listing-cards-features-component') {
                let pendingCards = [...block.product_cards]
                block.product_cards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if(!pendingCards.length) {
                        resolve (block.product_cards)
                    }
                })
            }     
        })
    })
}