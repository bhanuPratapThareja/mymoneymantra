import axios from 'axios'
import Strapi from '../providers/strapi'
import { getApiData } from '../api/api'
const strapi = new Strapi()

const defaultDecision = 'E Connect'

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