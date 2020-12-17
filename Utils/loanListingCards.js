export const getOfferCards = data => {
    let cards = []
    data.dynamic.forEach(block => {
        if(block.__component === 'blocks.offer-details-card') {
            cards = block.offer_cards
        }
    })
    return cards
}