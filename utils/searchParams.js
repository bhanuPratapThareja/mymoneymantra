export const getDetailsSearchParams = (primaryPath, bank, product) => {
    let productSearch = ''
    if (primaryPath === 'credit-cards') {
        productSearch = `credit_card_product.slug=${product}`
    } else if (primaryPath === 'personal-loans') {
        productSearch = `personal_loan_product.slug=${product}`
    } else if (primaryPath === 'home-loans') {
        productSearch = `home_loan_product.slug=${product}`
    }

    return `${primaryPath}-details-pages?${productSearch}`
}

export const getLongFormSearchParams = (primaryPath, product) => {
    let productSearch = ''
    if (primaryPath === 'credit-cards') {
        productSearch = `credit_card_product?slug=${product}`
    } else if (primaryPath === 'personal-loans') {
        productSearch = `personal_loan_product?slug=${product}`
    } else if (primaryPath === 'home-loans') {
        productSearch = `home_loan_product?slug=${product}`
    }

    return productSearch
}