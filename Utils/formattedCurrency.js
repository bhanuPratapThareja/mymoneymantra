export const getFormattedCurrency = value => {
    console.log('val: ', value)
    const currencyNumber = getWholeNumberFromCurrency(value)
    console.log('currencyNumber: ', currencyNumber)
    const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(currencyNumber)
    const wholeNumberWithCurrency = currency.split('.')[0]
    return wholeNumberWithCurrency
}

export const getWholeNumberFromCurrency = value => {
    if(!value) {
        return ''
    }
    let wholeNumber = value
    if(isNaN(wholeNumber[0])) {
        wholeNumber = wholeNumber.substring(1)
    }
    wholeNumber = wholeNumber.split(',').join('').trim()
    return wholeNumber
}