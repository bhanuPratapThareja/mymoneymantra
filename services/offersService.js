import axios from 'axios'
import { getApiData } from '../api/api'

export const getProductDecision = async cards => {
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
                productDecision = 'E Connect'
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