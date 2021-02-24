export const addSchemaScript = (data, id) => {
    const head = document.querySelector('head')
    const canonicalLink = document.createElement('link')

    const { page_schema, seo_meta_conical_link } = data
    let scriptId
    let canonicalId
    if (page_schema) {
        const script = document.createElement('script')
        scriptId = `schema_${id}`
        script.id = scriptId
        script.type = "application/json"
        script.append(page_schema)
        head.appendChild(script)
    }

    if(seo_meta_conical_link) {
        canonicalLink.href = seo_meta_conical_link
    } else {
        canonicalLink.href = window.location.href
    }
    canonicalLink.rel='canonical' 
    canonicalLink.id = `canonical_${id}`
    canonicalId = canonicalLink.id
    head.appendChild(canonicalLink)


    return { scriptId, canonicalId }
}

export const removeSchemaScript = (scriptId, canonicalId) => {
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