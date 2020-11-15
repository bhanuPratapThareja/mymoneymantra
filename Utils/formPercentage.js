export const getFormPercentage = state => {
    let valueslength = 0
    const totalValues = state.totalValues
    deleteStateKeys(state);
    (Object.values(state)).forEach(value => { if (value) valueslength++ })
    return Math.ceil(valueslength * 100 / totalValues)
}

function deleteStateKeys(state) {
    if (!state.firstName || !state.lastName) {
        delete state.fullName
    }
    if (!state.fathersFirstName || !state.fathersLastName) {
        delete state.fathersFullName
    }
    if (!state.mothersFirstName || !state.mothersLastName) {
        delete state.mothersFullName
    }
    delete state.firstName
    delete state.lastName
    delete state.fathersFirstName
    delete state.fathersLastName
    delete state.mothersFirstName
    delete state.mothersLastName
    delete state.percentageComplete
    delete state.totalValues
}