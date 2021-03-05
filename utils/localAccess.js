export const setLeadId = newLeadId => {
    sessionStorage.setItem('leadId', newLeadId)
}

export const getLeadId = () => {
    return sessionStorage.getItem('leadId')
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

export const setFormData = data => {
    const previouslySavedData = JSON.parse(localStorage.getItem('formData'))
    const formData =  { ...previouslySavedData, ...data }
    sessionStorage.setItem('formData', JSON.stringify(formData))
}

export const getFormData = ()  => {
    return JSON.parse(sessionStorage.getItem('formData')) 
}

export const clearFormData = () => {
    sessionStorage.removeItem('formData')
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