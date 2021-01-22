const componentsToUnpack = ['product_type_v_2', 'product_image', 'product_banner_detail', 'product_category', 'product_promotion', 'product_annual_fee',
    'product_usp_highlight', 'product_feature', 'product_listing_feature', 'product_detail', 'product_learn_more']

export const unpackComponents = data => {
    const bank = data.bank
    const productType = data.product_type_v_2
    const componentsArr = data.dynamic

    let product = {
        product_name: data.product_name,
        product_id: data.product_id,
        recommended: data.recommended,
        slug: data.slug
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