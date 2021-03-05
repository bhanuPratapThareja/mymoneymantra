import axios from 'axios'
import { getApiData } from '../api/api'
import Strapi from '../providers/strapi'
import { getLeadId } from '../utils/sessionAccess'
import { unpackComponents } from './componentsService'
import { EConnect } from '../utils/types'

const defaultDecision = EConnect

export const viewOffers = async productType => {
    const { url, body } = getApiData('viewOffers')
    body.customerId = ''
    body.productId = productType && productType.product_type_id ? productType.product_type_id : ''
    try {
        const res = await axios.post(url, body)
        return res.data
    } catch { }
}

export const extractOffers = async apiOffers => {
    return new Promise(async (resolve) => {
        const strapi = new Strapi()
        const productIdArray = []

        for(let i = 0; i < apiOffers.length; i++) {
            if(!apiOffers[i].cardType) {
                continue
            }
            productIdArray.push(`product_id=${apiOffers[i].cardType}`)
        }

        const requiredProducts = productIdArray.join('&')
        const offersPacked = await strapi.processReq('GET', `product-v-2-s?${requiredProducts}`)

        if(!offersPacked) {
            resolve([])
        }

        let offers = []
        let pendingOffers = [...offersPacked]
        offersPacked.forEach(async offer => {
            const unpackedOffer = await unpackComponents(offer)
            offers.push(unpackedOffer)
            pendingOffers.shift()
            if (!pendingOffers.length) {
                offers.forEach(offer => {
                    apiOffers.forEach(apiOffer => {
                        if(offer.product.product_id == apiOffer.cardType) {
                            offer.productDecision = apiOffer.productDecision
                        }
                    })
                })
                resolve(offers)
            }
        })
    })
}

export const saveOffers = async () => {
    const { url, body } = getApiData('saveOffers')
    try {
        const res = await axios.post(url, body)
        return res.data.response.payload
    } catch (error) {

    }
}

export const getListingOffers = async productType => {
    const { url, body } = getApiData('listing')
    body.customerId = ''
    body.leadId = getLeadId()
    body.productId = productType && productType.product_type_id ? productType.product_type_id : ''
    try {
        const res = await axios.post(url, body)
        return res.data
    } catch { }
}

export const extractListingOffers = data => {
    return new Promise((resolve) => {
        if(!data) {
            resolve([])
        }

        const components = data.dynamic
        let componentArray = []

        components.forEach(component => {
            componentArray.push(component.__component)
        })

        if (!componentArray.includes('blocks.listing-cards')) {
            resolve([])
        }

        components.forEach(component => {
            if (component.__component === 'blocks.listing-cards') {
                let listiingOffers = []
                let pendingComponents = [...component.product_v_2s]
                if (!pendingComponents.length) {
                    resolve([])
                }
                component.product_v_2s.forEach(async item => {
                    const offer = await unpackComponents(item)
                    listiingOffers.push(offer)
                    pendingComponents.shift()
                    if (!pendingComponents.length) {
                        resolve(listiingOffers)
                    }
                })
            }
        })
    })
}

export const getProductDecision = (offers, productType) => {
    const promise = new Promise((resolve) => {
        const pendingOffers = [...offers]
        if (!pendingOffers.length) {
            resolve([])
        }
        const { url, body } = getApiData('leadProductDecision')
        const leadId = getLeadId()
        pendingOffers.forEach(async offer => {

            body.productId = productType ? productType.product_type_id.toString() : ''
            body.bankId = offer.bank.bank_id
            body.leadId = leadId

            let productDecision = ''
            try {
                const res = await axios.post(url, body)
                productDecision = res.data.productDecision
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