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

export const getProductDecision = (cards, primaryPath) => {
    const promise = new Promise((resolve) => {
        const pendingCards = [...cards]
        if (!pendingCards.length) {
            resolve([])
        }
        const { url, body } = getApiData('leadProductDecision')

        pendingCards.forEach(async card => {
            const leadId = getLeadId(primaryPath)
            body.request.payload.productId = card.productId.toString()
            body.request.payload.productTypeId = card.productTypeId.toString()
            body.request.payload.bankId = card.bank.bank_id
            body.request.payload.leadId = leadId

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

export const getProductDecisionForDetailsBanner = (product, bank, primaryPath) => {
    const promise = new Promise(async (resolve) => {
        const { url, body } = getApiData('leadProductDecision')
        
        const leadId = getLeadId(primaryPath)
        body.request.payload.productId = product.productId.toString()
        body.request.payload.productTypeId = product.productTypeId.toString()
        body.request.payload.bankId = bank.bank_id
        body.request.payload.leadId = leadId

        let productDecision = ''
        try {
            const res = await axios.post(url, body)
            productDecision = res.data.response.payload.productDecision
        } catch {
            productDecision = defaultDecision
        }
        product.productDecision = productDecision
        resolve(product)

    })
    return promise
}

export const updatePopularOffers = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'offers.popular-offers-credit-cards-component') {
                let pendingCards = [...block.credit_card_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.credit_card_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)
                    const productTypeData = await strapi.processReq('GET', `product-types?id=${card.product_type}`)

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productTypeData[0].product_type_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.credit_card_products)
                    }
                })
            }
            if (block.__component === 'offers.popular-offers-personal-loans-component') {
                let pendingCards = [...block.personal_loan_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.personal_loan_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productData[0].product_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.personal_loan_products)
                    }
                })
            }
            if (block.__component === 'offers.popular-offers-home-loans-component') {
                let pendingCards = [...block.home_loan_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.home_loan_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productData[0].product_id
                    
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.home_loan_products)
                    }
                })
            }
        })
    })
}

export const updateTrendingOffers = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'offers.trending-offer-cards') {
                let pendingCards = [...block.credit_card_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.credit_card_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)
                    const productTypeData = await strapi.processReq('GET', `product-types?id=${card.product_type}`)

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productTypeData[0].product_type_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.credit_card_products)
                    }
                })
            }
            if (block.__component === 'offers.trending-offers-personal-loans') {
                let pendingCards = [...block.personal_loan_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.personal_loan_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)
                    const productTypeData = productData

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productData[0].product_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.personal_loan_products)
                    }
                })
            }
            if (block.__component === 'offers.trending-offers-home-loans-component') {
                let pendingCards = [...block.home_loan_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.home_loan_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)
                    const productTypeData = productData

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productData[0].product_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.home_loan_products)
                    }
                })
            }
        })
    })
}

export const updateListingOffers = data => {
    return new Promise((resolve) => {
        data.dynamic.forEach((block) => {
            if (block.__component === 'offers.listing-offers-credit-cards-compnent') {
                let pendingCards = [...block.credit_card_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.credit_card_products.forEach(async card => {
                    // console.log(card)
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)
                    const productTypeData = await strapi.processReq('GET', `product-types?id=${card.product_type}`)

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productTypeData[0].product_type_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.credit_card_products)
                    }
                })
            }
            if (block.__component === 'offers.listing-offers-personal-loan-compnent') {
                let pendingCards = [...block.personal_loan_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.personal_loan_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productData[0].product_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.personal_loan_products)
                    }
                })
            }
            if (block.__component === 'offers.listing-offers-home-loans-component') {
                let pendingCards = [...block.home_loan_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.home_loan_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    const productData = await strapi.processReq('GET', `products?id=${card.product}`)

                    card.bank = bankData[0]
                    card.productId = productData[0].product_id
                    card.productTypeId = productData[0].product_id

                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.home_loan_products)
                    }
                })
            }
        })
    })
}
