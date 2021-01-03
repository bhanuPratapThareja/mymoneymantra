export const isInputValid = inp => {
    return RegExp(inp.pattern).test(inp.value)
}