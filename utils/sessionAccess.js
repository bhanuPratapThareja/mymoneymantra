export const setLeadId = newLeadId => {
    sessionStorage.setItem('leadId', newLeadId)
}

export const getLeadId = () => {
    const leadId =  sessionStorage.getItem('leadId')
    return leadId ? leadId : ''
}

export const clearLeadId = () => {
    sessionStorage.removeItem('leadId')
}

export const setLeadBank = leadBank => {
    sessionStorage.setItem('leadBank', JSON.stringify(leadBank))
}

export const getLeadBank = () => {
    return JSON.parse(sessionStorage.getItem('leadBank'))
}

export const clearLeadBank = () => {
    sessionStorage.removeItem('leadBank')
}