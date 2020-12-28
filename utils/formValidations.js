import { validMobileRegex, isValidPanNumber } from './validator'

export const isEmailValid = inp => {
    return RegExp(inp.pattern).test(inp.value)
}

export const isNumberValid = inp => {
    return RegExp(inp.pattern).test(inp.value)
}

export const isPanValid = inp => {
    return RegExp(inp.pattern).test(inp.value)
}

// ^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$