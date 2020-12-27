export const getPrimaryPath = resolvedUrl => {
    const pathSplit = resolvedUrl.split('/')
    return pathSplit[1]
}

export const getSecondaryPath = resolvedUrl => {
    const pathSplit = resolvedUrl.split('/')
    return pathSplit[2]
}