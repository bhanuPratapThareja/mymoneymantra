export const getFormattedName = value => {
    const fullName = value.trim()
    const fullNameSplit = splitAtFirstSpace(fullName)
    const firstName = fullNameSplit[0]
    const lastName = fullNameSplit[1] ? fullNameSplit[1] : ''
    return { fullName, firstName, lastName }
}

export const getFormattedDate = calDate => {
    if(!calDate){
        return ''
    }
    const dateArr = calDate.split('/')
    const date = dateArr[1]
    const month = dateArr[0]
    const fullYear = dateArr[2]
    return `${date}-${month}-${fullYear}`
}

const splitAtFirstSpace = str => {
    if (!str) return [];
    var i = str.indexOf(' ');
    if (i > 0) {
        return [str.substring(0, i), str.substring(i + 1)];
    }
    else return [str];
}