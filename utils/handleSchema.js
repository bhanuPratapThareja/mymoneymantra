let head
export const addSeo = (data, id) => {
    head = document.querySelector('head')
    const { page_schema, seo_meta_conical_link } = data
    const scriptId = addSchemaScript(page_schema, id)
    const canonicalId = addCanonicalLink(seo_meta_conical_link, id)
    return { scriptId, canonicalId }
}

export const addSchemaScript = (page_schema, id) => {
    let scriptId
    if (page_schema) {
        const script = document.createElement('script')
        scriptId = `schema_${id}`
        script.id = scriptId
        script.type = "application/json"
        script.append(page_schema)
        head.appendChild(script)
    }
    return scriptId
}

export const addCanonicalLink = (seo_meta_conical_link, id) => {
    const canonicalLink = document.createElement('link')
    let canonicalId
    if(seo_meta_conical_link) {
        canonicalLink.href = seo_meta_conical_link
    } else {
        canonicalLink.href = window.location.href
    }
    canonicalLink.rel='canonical' 
    canonicalLink.id = `canonical_${id}`
    canonicalId = canonicalLink.id
    head.appendChild(canonicalLink)
    return canonicalId
}

export const removeSeo = (scriptId, canonicalId) => {
    if(scriptId) {
        const script = document.getElementById(scriptId)
        script.parentNode.removeChild(script)
    }
    if(canonicalId) {
        const canonicalLink = document.getElementById(canonicalId)
        canonicalLink.parentNode.removeChild(canonicalLink)
    }
}

export const createLearnMoreSchema = () => {

}