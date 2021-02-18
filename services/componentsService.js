import { reject } from 'lodash'
import Strapi from '../providers/strapi'
const strapi = new Strapi()

const componentsToUnpack = ['product_image', 'product_banner_detail',
    'product_category', 'product_promotion', 'product_annual_fee',
    'product_usp_highlight', 'product_feature', 'product_listing_feature',
    'product_detail', 'product_learn_more', 'product_interest_rate',
    'product_emi', 'product_tenure', 'product_loan_amount', 'product_return_on_investment','product_processing_fee',]

export const unpackComponents = data => {
    return new Promise(async (resolve) => {
        if(!data) {
            reject(null)
        }
        let bank = data.bank
        let productType = data.product_type_v_2
        const componentsArr = data.dynamic
    
        let product = {
            product_name: data.product_name,
            product_id: data.product_id,
            recommended: data.recommended,
            slug: data.slug,
            cardType: data.card_type ? data.card_type : null
        }
    
        if (typeof bank === 'string') {
            bank = await strapi.processReq('GET', `banks?id=${bank}`)
            bank = bank[0]
        }
    
        if (typeof productType === 'string') {
            productType = await strapi.processReq('GET', `product-type-v-2-s?id=${productType}`)
            productType = productType[0]
        }
    
        componentsArr.forEach(component => {
            for (let key in component) {
                componentsToUnpack.forEach((unpack, i, unpackArr) => {
                    if (key === unpack) {
                        product[unpack] = component[key]
                        product.id = component.id
                        unpackArr.slice(i, 1)
                    }
                })
            }
        })
    
        resolve({ bank, product, productType })
    })
}

export const getUnpackedProduct = async productData => {
    try {
        if(!productData[0]) {
            return null
        }
        const product = await unpackComponents(productData[0])
        return product
    } catch {
        return null
    }
}

export const extractPopularOffers = data => {
    return new Promise((resolve) => {
        if(!data) {
            resolve([])
        }

        const components = data.dynamic
        let componentArray = []
        let popularOffers = []
        
        components.forEach(component => {
            componentArray.push(component.__component)
        })
        
        if (!componentArray.includes('offers.popular-offers-component')) {
            resolve([])
        }
        
        components.forEach(component => {
            if (component.__component === 'offers.popular-offers-component') {
                let pendingComponents = [...component.product_v_2s]
                if (!pendingComponents.length) {
                    resolve([])
                }
                component.product_v_2s.forEach(async item => {
                    const offer = await unpackComponents(item)
                    popularOffers.push(offer)
                    pendingComponents.shift()
                    if (!pendingComponents.length) {
                        resolve(popularOffers)
                    }
                })
            }
        })
    })
}

export const extractTrendingOffers = data => {
    return new Promise((resolve) => {
        if(!data) {
            resolve([])
        }

        const components = data.dynamic
        let componentArray = []
        
        components.forEach(component => {
            componentArray.push(component.__component)
        })
        
        if (!componentArray.includes('offers.trending-offers-component')) {
            resolve([])
        }

        components.forEach(component => {
            if (component.__component === 'offers.trending-offers-component') {
                let trendingOffers = []
                let pendingComponents = [...component.product_v_2s]
                if (!pendingComponents.length) {
                    resolve([])
                }
                component.product_v_2s.forEach(async item => {
                    const offer = await unpackComponents(item)
                    trendingOffers.push(offer)
                    pendingComponents.shift()
                    if (!pendingComponents.length) {
                        resolve(trendingOffers)
                    }
                })
            }
        })
    })
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