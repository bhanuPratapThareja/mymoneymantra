export const getBasePath = resolvedUrl => {
    const pathSplit = resolvedUrl.split('/')
    return pathSplit[1]
}

export const getFirstPath = resolvedUrl => {
    const pathSplit = resolvedUrl.split('/')
    return pathSplit[2]
}