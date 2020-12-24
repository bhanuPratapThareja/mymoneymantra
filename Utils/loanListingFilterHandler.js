import $ from 'jquery'

export const closeFilter = (filters, filterFunction) => {
    console.log('filters: ', filters)
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
    const filteredByAnnualFees = filterByAnnualFees(filteredByCategories, filters)
    const filteredByPromotions = filterByPromotions(filteredByAnnualFees, filters)
    return filteredByPromotions
}

const filterByPromotions = (filteredByAnnualFees, filters) => {
    const filteredByPromotions = filteredByAnnualFees.filter(card => {
        if (!filters.promotion || !filters.promotion.length) {
            return card
        }
        if (filters.promotion.includes(card.promotion)) {
            return card
        }
    })
    return [...filteredByPromotions]
}


const filterByAnnualFees = (filteredByCategories, filters) => {
    const filteredByAnnualFees = filteredByCategories.filter(card => {
        if (!filters.annualFees || !filters.annualFees.length) {
            return card
        }
        const annualFee = Number(card.annual_fee_fy)
        const minValue = Number(filters.annualFees[0])
        const maxValue = Number(filters.annualFees[1])
        if (annualFee >= minValue && annualFee <= maxValue) {
            return card
        }
    })
    return [...filteredByAnnualFees]
}

const filterByCategories = (filteredByBanks, filters) => {
    const filteredBycategories = filteredByBanks.filter(card => {
        if (!filters.categories || !filters.categories.length) {
            return card
        }
        if (filters.categories.includes(card.category)) {
            return card
        }
    })
    return [...filteredBycategories]
}


const filterByBanks = (unFilteredCards, filters) => {
    const filteredByBanks = unFilteredCards.filter(card => {
        if (!filters.banks || !filters.banks.length) {
            return card
        }
        if (filters.banks.includes(card.bank.slug)) {
            return card
        }
    })
    return [...filteredByBanks]
}