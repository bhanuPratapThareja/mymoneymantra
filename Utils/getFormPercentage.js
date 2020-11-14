export const getFormCompletePercent = state => {
    let valueslength = 0

    console.log('state: ', state)

    const totalValues = state.totalValues
    if (!state.firstName || !state.lastName) {
        delete state.fullName
    }
    delete state.firstName
    delete state.lastName
    delete state.percentageComplete
    delete state.totalValues;

    console.log('state: ', state)


    (Object.values(state)).forEach(value => { if (value) valueslength++ })
    return Math.ceil(valueslength * 100 / totalValues)
}