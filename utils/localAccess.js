export const setFormData = data => {
    const previouslySavedData = JSON.parse(localStorage.getItem('formData'))
    const formData =  { ...previouslySavedData, ...data }
    localStorage.setItem('formData', JSON.stringify(formData))
}

export const getFormData = ()  => {
    return JSON.parse(localStorage.getItem('formData')) 
}

export const clearFormData = ()  => {
    return localStorage.removeItem('formData')
}

export const clearFieldInFormData = field => {
    const formData = JSON.parse(localStorage.getItem('formData'))
    if(formData) {
        delete formData[field]  
        localStorage.setItem('formData', JSON.stringify(formData))
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