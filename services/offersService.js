import { getApiData } from '../api/api';
import axios from 'axios'
import Strapi from '../providers/strapi'
const strapi = new Strapi()

const defaultDecision = 'E Connect'

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
        //  console.log('customerOffer res',res.data.response.payload);

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
            let productTypeId = ''

            if (primaryPath === 'credit-cards') {
                productTypeId = '6'
            } else if (primaryPath === 'personal-loans') {
                productTypeId = '17'
            } else if (primaryPath === 'home-loans') {
                productTypeId = '3'
            }

            const leadIdData = JSON.parse(localStorage.getItem('leadId'))
            const leadId = leadIdData[primaryPath]

            console.log(primaryPath, leadId, productTypeId)

            body.request.payload.productId = card.product_id
            body.request.payload.bankId = card.bank.bank_id
            body.request.payload.leadId = leadId
            body.request.payload.productTypeId = productTypeId

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
        let productTypeId = ''

        if (primaryPath === 'credit-cards') {
            productTypeId = '6'
        } else if (primaryPath === 'personal-loans') {
            productTypeId = '17'
        } else if (primaryPath === 'home-loans') {
            productTypeId = '3'
        }

        const leadIdData = JSON.parse(localStorage.getItem('leadId'))
        const leadId = leadIdData && leadIdData[primaryPath] ? leadIdData[primaryPath] : ''

        body.request.payload.productId = product.product_id
        body.request.payload.bankId = bank.bank_id
        body.request.payload.leadId = leadId
        body.request.payload.productTypeId = productTypeId

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
            if (block.__component === 'offers.popular-offers-credit-cards-component') {
                let pendingCards = [...block.credit_card_products]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.credit_card_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
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
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.personal_loan_products)
                    }
                })
            }
            if (block.__component === 'blocks.popular-home-loan-cards') {
                let pendingCards = [...block.loan_cards]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.loan_cards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.loan_cards)
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
                    card.bank = bankData[0]
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
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.personal_loan_products)
                    }
                })
            }
            if (block.__component === 'blocks.trending-home-loan-component') {
                let pendingCards = [...block.loan_cards]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.loan_cards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.loan_cards)
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
                console.log('pendingCards1:: ', pendingCards)
                if (!pendingCards.length) {
                    resolve([])
                }
                block.credit_card_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    console.log('pendingCards2:: ', pendingCards)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.credit_card_products)
                    }
                })
            }
            if (block.__component === 'offers.listing-offers-personal-loan-compnent') {
                let pendingCards = [...block.personal_loan_products]
                console.log('pendingCards3:: ', pendingCards)
                if (!pendingCards.length) {
                    resolve([])
                }
                block.personal_loan_products.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.personal_loan_products)
                    }
                })
            }
            if (block.__component === 'blocks.loan-listing-offer-details-component') {
                let pendingCards = [...block.personal_loan_cards]
                if (!pendingCards.length) {
                    resolve([])
                }
                block.personal_loan_cards.forEach(async card => {
                    const bankData = await strapi.processReq('GET', `banks?id=${card.bank}`)
                    card.bank = bankData[0]
                    pendingCards.shift()
                    if (!pendingCards.length) {
                        resolve(block.personal_loan_cards)
                    }
                })
            }
        })
    })
}
