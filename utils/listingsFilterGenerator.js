export const generateBanksCheckboxes = (allOfferCards, showCheckboxes) => {
    let bankBlock = {}
    let bankCheckBoxes = []
    let banksAlreadyAdded = []

    allOfferCards.forEach(card => {
        const bankObj = { name: card.bank.bank_name, tag: card.bank.bank_id, priority: card.bank.priority }
        if (!banksAlreadyAdded.includes(bankObj.tag)) {
            bankCheckBoxes.push(bankObj)
            banksAlreadyAdded.push(bankObj.tag)
        }
    })

    if(!bankCheckBoxes.length) {
        return null
    }

    bankCheckBoxes.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
    bankBlock.showCheckboxes = showCheckboxes
    bankBlock.totalCheckboxes = bankCheckBoxes.length
    bankBlock.veiwAll = bankCheckBoxes.length > showCheckboxes
    bankBlock.values = bankCheckBoxes
    bankBlock.type = 'banks'
    bankBlock.heading = 'By Bank'
    return bankBlock
}

export const generateCategoriesCheckboxes = (allOfferCards, showCheckboxes) => {
    let categoryBlock = {}
    let categoryCheckBoxes = []
    let categoriesAlreadyAdded = []

    allOfferCards.forEach(card => {
        const categoryObj = { name: card.product.product_category.name, tag: card.product.product_category.tag }
        if (!categoriesAlreadyAdded.includes(categoryObj.tag)) {
            categoryCheckBoxes.push(categoryObj)
            categoriesAlreadyAdded.push(categoryObj.tag)
        }
    })

    if(!categoryCheckBoxes.length) {
        return null
    }

    categoryCheckBoxes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    categoryBlock.showCheckboxes = showCheckboxes
    categoryBlock.totalCheckboxes = categoryCheckBoxes.length
    categoryBlock.veiwAll = categoryCheckBoxes.length > showCheckboxes
    categoryBlock.values = categoryCheckBoxes
    categoryBlock.type = 'categories'
    categoryBlock.heading = 'By Category'
    return categoryBlock
}

export const generatePromotionCheckboxes = (allOfferCards, showCheckboxes) => {
    let promotionBlock = {}
    let promotionCheckboxes = []
    let promotionsAlreadyAdded = []

    allOfferCards.forEach(card => {
        const promotionObj = { name: card.product.product_promotion.name, tag: card.product.product_promotion.tag }
        if (!promotionsAlreadyAdded.includes(promotionObj.tag)) {
            promotionCheckboxes.push(promotionObj)
            promotionsAlreadyAdded.push(promotionObj.tag)
        }
    })

    if(!promotionCheckboxes.length) {
        return null
    }

    promotionCheckboxes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    promotionBlock.showCheckboxes = showCheckboxes
    promotionBlock.totalCheckboxes = promotionCheckboxes.length
    promotionBlock.veiwAll = promotionCheckboxes.length > showCheckboxes
    promotionBlock.values = promotionCheckboxes
    promotionBlock.type = 'promotions'
    promotionBlock.heading = 'By Promotion'
    return promotionBlock
}

export const generatePromotionRadios = allOfferCards => {
    let promotionBlock = {}
    let promotionRadios = []
    let promotionsAlreadyAdded = []

    allOfferCards.forEach(card => {
        const promotionObj = { name: card.product.product_promotion.name, tag: card.product.product_promotion.tag }
        if (!promotionsAlreadyAdded.includes(promotionObj.tag)) {
            promotionRadios.push(promotionObj)
            promotionsAlreadyAdded.push(promotionObj.tag)
        }
    })

    promotionRadios.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    promotionBlock.type = 'promotions'
    promotionBlock.heading = 'By Promotion'
    promotionBlock.values = promotionRadios
    return promotionBlock
}

export const generateAnnualFeeBlock = allOfferCards => {
    let annualFees = []
    allOfferCards.forEach(card => {
        const { product_annual_fee } = card.product
        if(product_annual_fee && product_annual_fee.annual_fee_fy) {
            annualFees.push(product_annual_fee.annual_fee_fy)
        }
    })
    if(annualFees.length) {
        const max = Math.max(...annualFees)
        const min = Math.min(...annualFees)
        const annualFeesSlider = { heading: 'By Annual Fees', max, min }
        return annualFeesSlider
    }
}