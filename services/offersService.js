import axios from 'axios'
import Strapi from '../providers/strapi'
import { getApiData } from '../api/api'
import { getLeadId } from '../utils/localAccess'

const strapi = new Strapi()

const defaultDecision = 'EConnect'

export const viewOffer = async () => {
    const { url, body } = getApiData('customerOfferView');
    try {
        const res = await axios.post(url, body)
    } catch (error) {

    }
}

export const customerOfferData = async () => {
    const { url, body } = getApiData('customerOffer');
    try {
        const res = await axios.post(url, body)
        return res.data.response.payload;
    } catch (error) {

    }
}

export const getProductDecision = (offers, primaryPath) => {
    const promise = new Promise((resolve) => {
        const pendingOffers = [...offers]
        if (!pendingOffers.length) {
            resolve([])
        }
        const { url, body } = getApiData('leadProductDecision')

        pendingOffers.forEach(async offer => {
            const leadId = getLeadId(primaryPath)
            body.request.payload.productId = offer.product.product_id.toString()
            body.request.payload.productTypeId = offer.productType.product_type_id.toString()
            body.request.payload.bankId = offer.bank.bank_id
            body.request.payload.leadId = leadId

            let productDecision = ''
            try {
                const res = await axios.post(url, body)
                productDecision = res.data.response.payload.productDecision
            } catch {
                productDecision = defaultDecision
            }
            offer.productDecision = productDecision
            pendingOffers.shift()
            if (!pendingOffers.length) {
                resolve(offers)
            }
        })
    })
    return promise
}

export const updatePopularOffers = data => {
    return new Promise((resolve) => {
        let updatedProducts = []
        data.dynamic.forEach((block) => {
            if (block.__component === 'offers.trending-offers-component') {
                let pendingCards = [...block.product_v_2s]

                if (!pendingCards.length) {
                    resolve([])
                }
                block.product_v_2s.forEach(async product => {
                    const bankData = await strapi.processReq('GET', `banks?id=${product.bank}`)
                    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?id=${product.product_type_v_2}`)
                    product.bank = bankData[0]
                    product.product_type_v_2 = productTypeData[0]
                    updatedProducts.push(product)
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(updatedProducts)
                    }
                })
            }
        })
    })
}

export const updateTrendingOffers = data => {
    return new Promise((resolve) => {
        let updatedProducts = []
        data.dynamic.forEach((block) => {
            if (block.__component === 'offers.trending-offers-component') {
                let pendingCards = [...block.product_v_2s]

                if (!pendingCards.length) {
                    resolve([])
                }
                block.product_v_2s.forEach(async product => {
                    const bankData = await strapi.processReq('GET', `banks?id=${product.bank}`)
                    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?id=${product.product_type_v_2}`)
                    product.bank = bankData[0]
                    product.product_type_v_2 = productTypeData[0]
                    updatedProducts.push(product)
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(updatedProducts)
                    }
                })
            }
        })
    })
}

export const updateListingOffers = data => {
    return new Promise((resolve) => {
        let updatedProducts = []
        data.dynamic.forEach((block) => {
            if (block.__component === 'blocks.listing-cards') {
                let pendingCards = [...block.product_v_2s]

                if (!pendingCards.length) {
                    resolve([])
                }
                block.product_v_2s.forEach(async product => {
                    const bankData = await strapi.processReq('GET', `banks?id=${product.bank}`)
                    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?id=${product.product_type_v_2}`)
                    product.bank = bankData[0]
                    product.product_type_v_2 = productTypeData[0]
                    updatedProducts.push(product)
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(updatedProducts)
                    }
                })
            }
        })
    })
}