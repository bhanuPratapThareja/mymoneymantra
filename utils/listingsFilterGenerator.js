export const generateBanksCheckboxes = (allOfferCards, showCheckboxes) => {
    let bankBlock = {}
    let bankCheckBoxes = []
    let banksAlreadyAdded = []

    for(let i = 0; i < allOfferCards.length; i++) {
        const bankObj = { name: allOfferCards[i].bank.bank_name, tag: allOfferCards[i].bank.bank_id, priority: allOfferCards[i].bank.priority }
        if (!banksAlreadyAdded.includes(bankObj.tag)) {
            bankCheckBoxes.push(bankObj)
            banksAlreadyAdded.push(bankObj.tag)
        }
    }

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

    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_category) {
            continue
        }

        const categoryObj = { name: allOfferCards[i].product.product_category.name, tag: allOfferCards[i].product.product_category.tag }
        if (!categoriesAlreadyAdded.includes(categoryObj.tag)) {
            categoryCheckBoxes.push(categoryObj)
            categoriesAlreadyAdded.push(categoryObj.tag)
        }
    }

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

    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_promotion) {
            continue
        }

        const promotionObj = { name: allOfferCards[i].product.product_promotion.name, tag: allOfferCards[i].product.product_promotion.tag }
        if (!promotionsAlreadyAdded.includes(promotionObj.tag)) {
            promotionCheckboxes.push(promotionObj)
            promotionsAlreadyAdded.push(promotionObj.tag)
        }
    }

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

    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_promotion) {
            continue
        }

        const promotionObj = { name: allOfferCards[i].product.product_promotion.name, tag: allOfferCards[i].product.product_promotion.tag }
        if (!promotionsAlreadyAdded.includes(promotionObj.tag)) {
            promotionRadios.push(promotionObj)
            promotionsAlreadyAdded.push(promotionObj.tag)
        }
    }

    promotionRadios.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    promotionBlock.type = 'promotions'
    promotionBlock.heading = 'By Promotion'
    promotionBlock.values = promotionRadios
    return promotionBlock
}

export const generateAnnualFeesBlock = allOfferCards => {
    let annualFees = []
    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_annual_fee) {
            continue
        }
        const { product_annual_fee } = allOfferCards[i].product
        if(product_annual_fee && product_annual_fee.annual_fee_fy) {
            annualFees.push(product_annual_fee.annual_fee_fy)
        }
    }

    if(annualFees.length) {
        const max = Math.max(...annualFees)
        const min = Math.min(...annualFees)
        const annualFeesSlider = { heading: 'By Annual Fees', max, min }
        return annualFeesSlider
    }
}

export const generateEmiBlock = allOfferCards => {
    let emis = []
    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_emi) {
            continue
        }
        const { product_emi } = allOfferCards[i].product
        if(product_emi && product_emi.emi) {
            emis.push(product_emi.emi)
        }
    }

    if(emis.length) {
        const max = Math.max(...emis)
        const min = Math.min(...emis)
        const emiSlider = { heading: 'By EMI', max, min }
        return emiSlider
    }
}

export const generateLoanAmountBlock = allOfferCards => {
    let loanAmounts = []
    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_loan_amount) {
            continue
        }
        const { product_loan_amount } = allOfferCards[i].product
        if(product_loan_amount && product_loan_amount.amount) {
            loanAmounts.push(product_loan_amount.amount)
        }
    }

    if(loanAmounts.length) {
        const max = Math.max(...loanAmounts)
        const min = Math.min(...loanAmounts)
        const loanAmountSlider = { heading: 'By Loan Amount', max, min }
        return loanAmountSlider
    }
}

export const generateRoiBlock = allOfferCards => {
    let rois = []
    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_return_on_investment) {
            continue
        }
        const { product_return_on_investment } = allOfferCards[i].product
        if(product_return_on_investment && product_return_on_investment.roi) {
            rois.push(product_return_on_investment.roi)
        }
    }

    if(rois.length) {
        const max = Math.max(...rois)
        const min = Math.min(...rois)
        const roiSlider = { heading: 'By Return On Investment', max, min }
        return roiSlider
    }
}

export const generateTenureBlock = allOfferCards => {
    let tenures = []
    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_tenure) {
            continue
        }
        const { product_tenure } = allOfferCards[i].product
        if(product_tenure && product_tenure.tenure) {
            tenures.push(product_tenure.tenure)
        }
    }

    if(tenures.length) {
        const max = Math.max(...tenures)
        const min = Math.min(...tenures)
        const tenureSlider = { heading: 'By Tenure', max, min }
        return tenureSlider
    }
}

export const generateInterestRateBlock = allOfferCards => {
    let interestRates = []
    for(let i = 0; i < allOfferCards.length; i++) {
        if(!allOfferCards[i].product.product_interest_rate) {
            continue
        }
        const { product_interest_rate } = allOfferCards[i].product
        if(product_interest_rate && product_interest_rate.min_value) {
            interestRates.push(product_interest_rate.min_value)
        }
        if(product_interest_rate && product_interest_rate.max_value) {
            interestRates.push(product_interest_rate.max_value)
        }
    }

    if(interestRates.length) {
        const max = Math.max(...interestRates)
        const min = Math.min(...interestRates)
        const interestRatesSlider = { heading: 'By Interest Rate', max, min }
        return interestRatesSlider
    }
}