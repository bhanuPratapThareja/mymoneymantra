export const setLeadId = (primaryPath, newLeadId) => {
    if(primaryPath) {
        const leadIdData = JSON.parse(localStorage.getItem('leadId'))
        const leadId = { ...leadIdData, [primaryPath]: newLeadId }
        localStorage.setItem('leadId', JSON.stringify(leadId))
    }
}

export const getLeadId = primaryPath => {
    const leadIdData = JSON.parse(localStorage.getItem('leadId'))
    const leadId = leadIdData && leadIdData[primaryPath] ? leadIdData[primaryPath] : ''
    return leadId
}