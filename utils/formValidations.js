import { getWholeNumberFromCurrency } from './formattedCurrency'
import moment from 'moment'

export const isInputValid = inp => {
    if (!inp.pattern) {
        return true
    }
    return RegExp(inp.pattern).test(inp.value)
}

export const isMonetaryValid = inp => {
    if (!inp.min_value) {
        return false
    }
    const money = getWholeNumberFromCurrency(inp.value)
    return Number(money) > inp.min_value
}

export const isDateValid = inp => {
    const invalidDateMsg = 'Invalid Date'
    const dateArr = inp.value.split('/')
    const [date, month, fullYear] = dateArr
    const dateConcat = date + month + fullYear
    const trimmedDateConcat = dateConcat.trim()
    if (trimmedDateConcat.length !== 8) {
        inp.validation_error = invalidDateMsg
        return false
    }

    const dateString = `${fullYear}-${month}-${date}`
    const m = moment(dateString, 'YYYY-MM-DD')
    if(!m.isValid()) {
        inp.validation_error = invalidDateMsg
        return false
    }
   
    return true
}