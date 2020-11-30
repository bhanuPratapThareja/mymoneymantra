export const offerSlick = (cards) => {

    let arrLength = cards.length
    let centerIndex = Math.round(arrLength / 3)
    let array1 = []
    let array2 = []
    let array3 = []

    cards.forEach((card, index) => {
        if (index === centerIndex) {
            card['data-slick-index'] = 0
            array2.push(card);
        }
        if (index < centerIndex) {
            array1.push(card);
        }
        if (index > centerIndex) {
            array3.push(card);
        }
    })

    let revIndex = 0
    for (var i = array1.length - 1; i >= 0; i--) {
        array1[i]['data-slick-index'] = revIndex - 1
        revIndex--
    }

    for (let i = 0; i < array3.length; i++) {
        array3[i]['data-slick-index'] = i + 1
    }

    let newCards = array1.concat(array2, array3);
    newCards.forEach(card => {
        if (card['data-slick-index'] < -1 || card['data-slick-index'] > 1) {
            card.tabIndex = -1
            card.classes = "slick-slide slick-cloned"
        }
        if (card['data-slick-index'] == -1 || card['data-slick-index'] == 1) {
            card.tabIndex = 0
            card.classes = "slick-slide slick-cloned slick-active"
        }
        if (card['data-slick-index'] == 0) {
            card.tabIndex = -1
            card.classes = "slick-slide slick-current slick-active slick-center"
        }
    })

    return newCards
}
