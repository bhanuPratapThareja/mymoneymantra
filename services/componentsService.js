import Strapi from '../providers/strapi'
const strapi = new Strapi()

const componentsToUnpack = ['product_image', 'product_banner_detail',
    'product_category', 'product_promotion', 'product_annual_fee',
    'product_usp_highlight', 'product_feature', 'product_listing_feature',
    'product_detail', 'product_learn_more', 'product_interest_rate']

export const unpackComponents = async data => {
    let bank = data.bank
    let productType = data.product_type_v_2
    const componentsArr = data.dynamic

    let product = {
        product_name: data.product_name,
        product_id: data.product_id,
        recommended: data.recommended,
        slug: data.slug
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

    return { bank, product, productType }
}

export const extractListingOffersComponent = data => {
    let lsitingOffers
    data.dynamic.forEach((block) => {
        if (block.__component === 'blocks.listing-cards') {
            lsitingOffers = block
        }
    })
    return lsitingOffers
}