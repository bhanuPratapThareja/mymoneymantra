export const cleanAuthorName = (authorName) => {
    let openingTag = authorName.replace('<h3>', '')
    let cleanedName = openingTag.replace('</h3>', '')
    return cleanedName
}

export const formatCategoryForUrl = (categoryName) => {
    let splittedString = categoryName.trim().split(' ')
    if (splittedString) {
        return splittedString.join('-')
    } else {
        return categoryName
    }
}

export const unformatCategoryName = (categoryName) => {
    let splittedString = categoryName.trim().split('-')
    if (splittedString) {
        return splittedString.join(' ')
    } else {
        return categoryName
    }
}