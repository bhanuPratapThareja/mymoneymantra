import $ from 'jquery'

export const closeFilter = (filters, filterFunction) => {
    $(".filter-cross").closest(".mm-modal").slideToggle(300);
    $('body', "html").css("overflow", "scroll")
    if (filterFunction) {
        setTimeout(() => {
            filterFunction(filters)
        }, 1000)
    }
}

export const filterOfferCardsInFilterComponent = (unFilteredCards, filters) => {
    const filteredByBanks = filterByBanks(unFilteredCards, filters)
    const filteredByCategories = filterByCategories(filteredByBanks, filters)
    const filteredByPromotions = filterByPromotions(filteredByCategories, filters)
    const filteredByAnnualFees = filterByAnnualFees(filteredByPromotions, filters)
    const filteredByEmi = filterByEmi(filteredByAnnualFees, filters)
    const filteredByInterestRate = filterByInterestRate(filteredByEmi, filters)
    const filteredMaxLoanAmount = filterByMaxLoanAmount(filteredByInterestRate, filters)
    const filteredByTenure = filterByTenure(filteredMaxLoanAmount, filters)
    return filteredByTenure
}

const filterByBanks = (unFilteredCards, filters) => {
    const filteredByBanks = unFilteredCards.filter(card => {
        if (!filters.banks || !filters.banks.length) {
            return card
        }
        if (filters.banks.includes(card.bank.bank_id)) {
            return card
        }
    })
    return [...filteredByBanks]
}

const filterByCategories = (filteredByBanks, filters) => {
    const filteredBycategories = filteredByBanks.filter(card => {
        if (!filters.categories || !filters.categories.length) {
            return card
        }
        if(!card.product.product_category) {
            return card
        }
        if (filters.categories.includes(card.product.product_category.tag)) {
            return card
        }
    })
    return [...filteredBycategories]
}

const filterByPromotions = (filteredByCategories, filters) => {
    const filteredByPromotions = filteredByCategories.filter(card => {
        if (!filters.promotions || !filters.promotions.length) {
            return card
        }
        if(!card.product.product_promotion) {
            return card
        }
        if (filters.promotions.includes(card.product.product_promotion.tag)) {
            return card
        }
    })
    return [...filteredByPromotions]
}

const filterByAnnualFees = (filteredByPromotions, filters) => {
    const filteredByAnnualFees = filteredByPromotions.filter(card => {
        if (!filters.annualFees || !filters.annualFees.length) {
            return card
        }
        if(!card.product.product_annual_fee) {
            return card
        }
        const annualFee = Number(card.product.product_annual_fee.annual_fee_fy)
        const minSelected = Number(filters.annualFees[0])
        const maxSelected = Number(filters.annualFees[1])
        const max = Number(filters.annualFees[2])

        if(maxSelected === max) {
            if(annualFee >= minSelected) {
                return card
            }

        } else if (annualFee >= minSelected && annualFee <= maxSelected) {
            return card
        }
    })
    return [...filteredByAnnualFees]
}

const filterByEmi = (filteredByAnnualFees, filters) => {
    const filteredByEmi = filteredByAnnualFees.filter(card => {
        if (!filters.emi || !filters.emi.length) {
            return card
        }
        if(!card.product.product_emi) {
            return card
        }
        const emi = Number(card.product.product_emi.emi)
        const minSelected = Number(filters.emi[0])
        const maxSelected = Number(filters.emi[1])
        const max = Number(filters.emi[2])

        if(maxSelected === max) {
            if(emi >= minSelected) {
                return card
            }

        } else if (emi >= minSelected && emi <= maxSelected) {
            return card
        }
    })
    return [...filteredByEmi]
}

const filterByInterestRate = (filteredByEmi, filters) => {
    const filteredByInterestRate = filteredByEmi.filter(card => {
        if (!filters.interestRate || !filters.interestRate.length) {
            return card
        }
        if(!card.product.product_interest_rate) {
            return card
        }
        const interestRate = Number(card.product.product_interest_rate.min_value)
        const minSelected = Number(filters.interestRate[0])
        const maxSelected = Number(filters.interestRate[1])
        const max = Number(filters.interestRate[2])

        if(maxSelected === max) {
            if(interestRate >= minSelected) {
                return card
            }

        } else if (interestRate >= minSelected && interestRate <= maxSelected) {
            return card
        }
    })
    return [...filteredByInterestRate]
}

const filterByMaxLoanAmount = (filteredByInterestRate, filters) => {
    const filteredByMaxLoanAmount = filteredByInterestRate.filter(card => {
        if (!filters.maxLoanAmount || !filters.maxLoanAmount.length) {
            return card
        }
        if(!card.product.product_loan_amount) {
            return card
        }
        const maxLoanAmount = Number(card.product.product_loan_amount.amount)
        const minSelected = Number(filters.maxLoanAmount[0])
        const maxSelected = Number(filters.maxLoanAmount[1])
        const max = Number(filters.maxLoanAmount[2])

        if(maxSelected === max) {
            if(maxLoanAmount >= minSelected) {
                return card
            }

        } else if (maxLoanAmount >= minSelected && maxLoanAmount <= maxSelected) {
            return card
        }
    })
    return [...filteredByMaxLoanAmount]
}

const filterByTenure = (filteredByMaxLoanAmount, filters) => {
    const filteredByTenure = filteredByMaxLoanAmount.filter(card => {
        if (!filters.tenure || !filters.tenure.length) {
            return card
        }
        if(!card.product.product_tenure) {
            return card
        }
        const tenure = Number(card.product.product_tenure.tenure)
        const minSelected = Number(filters.tenure[0])
        const maxSelected = Number(filters.tenure[1])
        const max = Number(filters.tenure[2])

        if(maxSelected === max) {
            if(tenure >= minSelected) {
                return card
            }

        } else if (tenure >= minSelected && tenure <= maxSelected) {
            return card
        }
    })
    return [...filteredByTenure]
}