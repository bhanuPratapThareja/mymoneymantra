export const getDetailsSearchParams = (primaryPath, bank, product) => {
    let productSearch = ''
    if (primaryPath === 'credit-cards') {
        productSearch = `credit_card_product.slug=${product}`
    } else if (primaryPath === 'personal-loans') {
        productSearch = `personal_loan_product.slug=${product}`
    } else if (primaryPath === 'home-loans') {
        productSearch = `personal_loan_product.slug=${product}`
    }

    if(primaryPath === 'credit-cards') {
        return `${primaryPath}-details-pages?${productSearch}`
    }  else {
        return `${'personal-loans'}-details-pages?${productSearch}`
    }

}