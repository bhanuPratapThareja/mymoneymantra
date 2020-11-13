export const getFormCompletePercent = state => {
    let valueslength = 0
    const totalValues = state.totalValues
    delete state.percentageComplete
    delete state.totalValues;
    (Object.values(state)).forEach(value => { if (value) valueslength++ })
    return Math.ceil(valueslength * 100 / totalValues)
}