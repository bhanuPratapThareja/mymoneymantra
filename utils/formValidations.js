import { getWholeNumberFromCurrency } from './formattedCurrency'

export const isInputValid = inp => {
    if(!inp.pattern){
        return true
    }
    return RegExp(inp.pattern).test(inp.value)
}

export const isMonetaryValid = inp => {
    if(!inp.min_value) {
        return false
    }
    const money = getWholeNumberFromCurrency(inp.value)
    return Number(money) > inp.min_value
}