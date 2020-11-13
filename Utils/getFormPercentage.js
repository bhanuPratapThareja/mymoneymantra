export const getFormCompletePercent = state => {
    let valueslength = 0
    const totalValues = state.totalValues
    console.log('state inside percentagecomp',state);
    delete state.percentageComplete;
    delete state.totalValues;

    console.log('---', (Object.values(state)));

    (Object.values(state)).forEach(value => { 
        if (value) valueslength++ })
        

    return Math.ceil(valueslength * 100 / totalValues)
}