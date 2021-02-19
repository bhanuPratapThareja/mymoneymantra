import axios from 'axios'
import { getApiData } from '../api/api'
import Strapi from '../providers/strapi'
import { getLeadId } from '../utils/localAccess'
import { unpackComponents } from './componentsService'

const defaultDecision = 'EConnect'

export const viewOffers = async productTypeId => {
    const { url, body } = getApiData('viewOffers')
    body.customerId = ''
    body.productId = productTypeId ? productTypeId : ''

    try {
        const res = await axios.post(url, body)
        return res.data
    } catch { }
}

export const extractOffers = async apiOffers => {
    // console.log('apiOffers: ', apiOffers)
    return new Promise(async (resolve) => {
        const strapi = new Strapi()
        const productIdArray = []
        if (!apiOffers.length) resolve([])

        for(let i = 0; i < apiOffers.length; i++) {
            if(!apiOffers[i].cardType) {
                continue
            }
            productIdArray.push(`product_id=${apiOffers[i].cardType}`)
        }

        const requiredProducts = productIdArray.join('&')
        const offersPacked = await strapi.processReq('GET', `product-v-2-s?${requiredProducts}`)

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

export const getProductDecision = offers => {
    const promise = new Promise((resolve) => {
        const pendingOffers = [...offers]
        if (!pendingOffers.length) {
            resolve([])
        }
        const { url, body } = getApiData('leadProductDecision')
        const leadId = getLeadId()
        pendingOffers.forEach(async offer => {

            body.productId = offer.productType.product_type_id.toString()
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