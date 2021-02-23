import { isEmpty } from 'lodash'

export const setLeadId = (newLeadId, primaryPath) => {
    const leadIdData = JSON.parse(localStorage.getItem('leadId'))
    const leadId = { ...leadIdData, [primaryPath]: newLeadId }
    localStorage.setItem('leadId', JSON.stringify(leadId))
}

export const setLeadBank = leadBank => {
    localStorage.setItem('leadBank', JSON.stringify(leadBank))
}

export const getLeadId = primaryPath => {
    const leadIdData = JSON.parse(localStorage.getItem('leadId'))
    const leadId = leadIdData && leadIdData[primaryPath] ? leadIdData[primaryPath] : ''
    return leadId
}

export const getLeadBank = () => {
    return JSON.parse(localStorage.getItem('leadBank'))
}

export const clearLeadId = primaryPath => {
    const leadIdData = JSON.parse(localStorage.getItem('leadId'))
    if (leadIdData && leadIdData[primaryPath]) {
        delete leadIdData[primaryPath]
        if (isEmpty(leadIdData)) {
            localStorage.removeItem('leadId')
        } else {
            localStorage.setItem('leadId', JSON.stringify(leadIdData))
        }
    }
}

export const clearLeadBank = () => {
    localStorage.removeItem('leadBank')
}

export const setFormData = (data, primaryPath) => {
    const previouslySavedData = JSON.parse(localStorage.getItem('formData'))
    const formData = { ...previouslySavedData, [primaryPath]: data }
    localStorage.setItem('formData', JSON.stringify(formData))
}

export const clearFormData = primaryPath => {
    const formData = JSON.parse(localStorage.getItem('formData'))
    if (formData && formData[primaryPath]) {
        delete formData[primaryPath]
        if (isEmpty(formData)) {
            localStorage.removeItem('formData')
        } else {
            localStorage.setItem('formData', JSON.stringify(formData))
        }
    }
}

export const setBlogId = (blogId) => {
    localStorage.setItem('blogId', blogId)
}

export const getBlogId = () => {
    let blogId = localStorage.getItem('blogId')
    return blogId
}
export const setContributorId = (contributorId) => {
    localStorage.setItem('contributorId', contributorId)
}

export const getContributorId = () => {
    let contributorId = localStorage.getItem('contributorId')
    return contributorId
}