export const getFormPercentage = state => {
    let valueslength = 0
    const totalValues = state.totalValues
    deleteStateKeys(state);

    if(!Object.keys(state).length) {
        return 0
    };

    (Object.values(state)).forEach(value => { 
        if (value)
        valueslength++ 
    })
    
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
    // if(!state.residenceAddress.address1 || !state.residenceAddress.address2 || !state.residenceAddress.city || !state.residenceAddress.pincode) {
    //     delete state.residenceAddress;
    // }
    // if(!state.officeAddress.officeAddress1 || !state.officeAddress.officeAddress2 || !state.officeAddress.officeCity || !state.officeAddress.officePincode) {
    //     delete state.officeAddress;
    // }
   
    if(!state.address1 || !state.address2 || !state.nearBy || !state.city || !state.pincode) {
        delete state.residenceAddress;
    }
    if(!state.officeAddress1 || !state.officeAddress2 || !state.officeNearBy || !state.officeCity || !state.officePincode) {
        delete state.officeAddress;
    }
    
   
     delete state.tnc
    delete state.errors
    delete state.firstName
    delete state.lastName
    delete state.fathersFirstName
    delete state.fathersLastName
    delete state.mothersFirstName
    delete state.mothersLastName
    delete state.address1
    delete state.address2
    delete state.nearBy
    delete state.city
    delete state.pincode
    delete state.officeAddress1
    delete state.officeAddress2
    delete state.officeNearBy
    delete state.officeCity
    delete state.officePincode
    delete state.selectedPan
    delete state.selectedSalarySlip
    delete state.selectedAddressProof
    delete state.percentageComplete
    delete state.totalValues
}