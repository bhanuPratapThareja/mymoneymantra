import Strapi from '../providers/strapi'
const strapi = new Strapi()

export const updatePopularOffers = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'blocks.popular-offers') {
                let pendingCards = [...block.cards]
                pendingCards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if(!pendingCards.length) {
                        resolve (true)
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
                    if(!pendingCards.length) {
                        resolve (true)
                    }
                })
            }     
        })
    })
}