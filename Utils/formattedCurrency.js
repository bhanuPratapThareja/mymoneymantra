export const getFormattedCurrency = value => {
    const currencyArray = value.split(',')
    const currencyNumner = currencyArray.join('').trim()
    const currency = new Intl.NumberFormat().format(currencyNumner)
    return currency
}