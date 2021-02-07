import axios from 'axios'
import { getApiData } from '../api/api'
import { getLeadId, getPrimaryPath } from '../utils/localAccess'

const defaultDecision = 'EConnect'

export const viewOffer = async () => {
    const { url, body } = getApiData('customerOfferView')
    try {
        const res = await axios.post(url, body)
    } catch (error) {

    }
}

export const customerOfferData = async () => {
    const { url, body } = getApiData('customerOffer')
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
 
            body.request.payload.productId = offer.productType.product_type_id.toString()
            // body.request.payload.productTypeId = offer.productType.product_type_id
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