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
    const filteredByRoi = filterByRoi(filteredByEmi, filters)
    const filteredMaxLoanAmount = filterByMaxLoanAmount(filteredByRoi, filters)
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
        if (!filters.promotion || !filters.promotion.length) {
            return card
        }
        if(!card.product.product_promotion) {
            return card
        }
        if (filters.promotion.includes(card.product.product_promotion.tag)) {
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

const filterByRoi = (filteredByEmi, filters) => {
    const filteredByRoi = filteredByEmi.filter(card => {
        if (!filters.roi || !filters.roi.length) {
            return card
        }
        if(!card.product.product_return_on_investment) {
            return card
        }
        const roi = Number(card.product.product_return_on_investment.roi)
        const minSelected = Number(filters.roi[0])
        const maxSelected = Number(filters.roi[1])
        const max = Number(filters.roi[2])

        if(maxSelected === max) {
            if(roi >= minSelected) {
                return card
            }

        } else if (roi >= minSelected && roi <= maxSelected) {
            return card
        }
    })
    return [...filteredByRoi]
}

const filterByMaxLoanAmount = (filteredByRoi, filters) => {
    const filteredByMaxLoanAmount = filteredByRoi.filter(card => {
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