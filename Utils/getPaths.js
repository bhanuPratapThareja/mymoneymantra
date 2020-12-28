export const getPrimaryPath = resolvedUrl => {
    const pathSplit = resolvedUrl.split('/')
    return pathSplit[1]
}

export const getSecondaryPath = resolvedUrl => {
    const pathSplit = resolvedUrl.split('/')
    return pathSplit[2]
}

export const getDetailsSearchParams = (primaryPath, bank, product) => {
    let productSearch = ''
    if (primaryPath === 'credit-cards') {
        productSearch = `credit_card_product.slug=${product}`
    } else if (primaryPath === 'personal-loans') {
        productSearch = `personal_loan_product.slug=${product}`
    }
    return `${primaryPath}-details-pages?${productSearch}`
}