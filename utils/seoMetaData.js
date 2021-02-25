let head
export const addSeoMetaData = (data, id) => {
    head = document.querySelector('head')
    const { seo_meta_title, page_schema, seo_meta_conical_link, seo_meta_description, seo_meta_keywords } = data
    addMetaTitle(seo_meta_title)
    const scriptId = addSchemaScript(page_schema, id)
    const canonicalId = addCanonicalLink(seo_meta_conical_link, id)
    const metaDescriptionId = addMetaDescription(seo_meta_description, id)
    const metaKeywordId = addMetaKeyword(seo_meta_keywords, id)
    return { scriptId, canonicalId, metaDescriptionId, metaKeywordId }
}

export const addMetaTitle = seo_meta_title => {
    const existingTitle =  document.querySelector('title')
    if(existingTitle) {
        existingTitle.parentNode.removeChild(existingTitle)
    }
    const title = document.createElement('title')
    if(seo_meta_title) {
        title.innerHTML = seo_meta_title
    } else {
        title.innerHTML = 'My Money Mantra' 
    }
    head.appendChild(title)
}

export const addSchemaScript = (page_schema, id) => {
    let scriptId
    if (page_schema) {
        const script = document.createElement('script')
        script.type = 'application/json'
        scriptId = `schema_${id}`
        script.id = scriptId
        script.append(page_schema)
        head.appendChild(script)
    }
    return scriptId
}

export const addCanonicalLink = (seo_meta_conical_link, id) => {
    let canonicalId
    if(seo_meta_conical_link) {
        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        if (seo_meta_conical_link) {
            canonicalLink.href = seo_meta_conical_link
        } else {
            canonicalLink.href = window.location.href
        }
        canonicalLink.id = `canonical_${id}`
        canonicalId = canonicalLink.id
        head.appendChild(canonicalLink)
        return canonicalId
    }
}

export const addMetaDescription = (seo_meta_description, id) => {
    let metaDescriptionId
    if (seo_meta_description) {
        const metaDescription = document.createElement('meta')
        metaDescription.name = 'Description'
        metaDescription.content = seo_meta_description
        metaDescription.id = `description_${id}`
        metaDescriptionId = metaDescription.id
        head.appendChild(metaDescription)
        return metaDescriptionId
    }
}

export const addMetaKeyword = (seo_meta_keywords, id) => {
    let metaKeywordId
    if (seo_meta_keywords) {
        const metaKeyword = document.createElement('meta')
        metaKeyword.name = 'Keyword'
        metaKeyword.content = seo_meta_keywords
        metaKeyword.id = `keyword_${id}`
        metaKeywordId = metaKeyword.id
        head.appendChild(metaKeyword)
        return metaKeywordId
    }
}

export const removeSeoMetaData = (scriptId, canonicalId, metaDescriptionId, metaKeywordId) => {
    if (scriptId) {
        const script = document.getElementById(scriptId)
        script.parentNode.removeChild(script)
    }
    if (canonicalId) {
        const canonicalLink = document.getElementById(canonicalId)
        canonicalLink.parentNode.removeChild(canonicalLink)
    }
    if (metaDescriptionId) {
        const metaDescriptionLink = document.getElementById(metaDescriptionId)
        metaDescriptionLink.parentNode.removeChild(metaDescriptionLink)
    }
    if (metaKeywordId) {
        const metaKeyword = document.getElementById(metaKeywordId)
        metaKeyword.parentNode.removeChild(metaKeyword)
    }
}

export const createLearnMoreSchema = () => {

}