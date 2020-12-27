export const manageRichText = text => {
    let newText  = text.replace(/h2>/g, 'h1>')
    newText = newText.replace(/strong>/g, 'b>')
    return newText
}