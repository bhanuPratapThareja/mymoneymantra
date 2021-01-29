export const setPrimaryPath = primaryPath => {
    localStorage.setItem('primaryPath', primaryPath)
}

export const setProductType = productType => {
    localStorage.setItem('productType', JSON.stringify(productType))
}

export const setLeadId = newLeadId => {
    const primaryPath = getPrimaryPath()
    const leadIdData = JSON.parse(localStorage.getItem('leadId'))
    const leadId = { ...leadIdData, [primaryPath]: newLeadId }
    localStorage.setItem('leadId', JSON.stringify(leadId))
}

export const setLeadBank = newleadBank => {
    const primaryPath = getPrimaryPath()
    const leadBankData = JSON.parse(localStorage.getItem('leadBank'))
    const leadBank = { ...leadBankData, [primaryPath]: newleadBank }
    localStorage.setItem('leadBank', JSON.stringify(leadBank))
}

export const getPrimaryPath = () => {
    return localStorage.getItem('primaryPath')
}

export const getProductType = () => {
    return JSON.parse(localStorage.getItem('productType'))
}

export const getLeadId = () => {
    const primaryPath = getPrimaryPath()
    const leadIdData = JSON.parse(localStorage.getItem('leadId'))
    const leadId = leadIdData && leadIdData[primaryPath] ? leadIdData[primaryPath] : ''
    return leadId
}

export const getLeadBank = () => {
    const primaryPath = getPrimaryPath()
    const leadBankData = JSON.parse(localStorage.getItem('leadBank'))
    const leadBank = leadBankData && leadBankData[primaryPath] ? leadBankData[primaryPath] : ''
    return leadBank
}

export const clearLeadId = () => {
    localStorage.removeItem('leadId')
}