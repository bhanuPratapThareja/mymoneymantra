import { validMobileRegex, isValidPanNumber, validPincodeRegex } from './validator'

export const isEmailValid = (e) => {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}

export const isNumberValid = value => {
    return validMobileRegex.test(value)
}

export const isPanValid = value => {
    return isValidPanNumber.test(value)
}

export const isPincodeValid = value => {
    return validPincodeRegex(value)
}