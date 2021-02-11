export const cleanAuthorName = (authorName) => {
    let openingTag = authorName.replace('<h3>', '')
    let cleanedName = openingTag.replace('</h3>', '')

    return cleanedName
}