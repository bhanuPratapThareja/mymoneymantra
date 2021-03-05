import { pageTitle } from './types'

export const addSeoMetaData = (data, id) => {
    const head = document.querySelector('head')
    const { meta_title, page_schema, meta_conical_link, meta_description, meta_keywords } = data
    addMetaTitle(meta_title, head)
    const scriptId = addSchemaScript(page_schema, id, head)
    const canonicalId = addCanonicalLink(meta_conical_link, id, head)
    const metaDescriptionId = addMetaDescription(meta_description, id, head)
    const metaKeywordId = addMetaKeyword(meta_keywords, id, head)
    return { scriptId, canonicalId, metaDescriptionId, metaKeywordId }
}

export const addMetaTitle = (meta_title, head) => {
    const existingTitle = document.querySelector('title')
    if (existingTitle) {
        existingTitle.parentNode.removeChild(existingTitle)
    }
    const title = document.createElement('title')
    if (meta_title) {
        title.innerHTML = meta_title
    } else {
        title.innerHTML = pageTitle
    }
    head.appendChild(title)
}

export const addSchemaScript = (page_schema, id, head) => {
    let scriptId
    const newHead = head ? head : document.querySelector('head')
    if (page_schema) {
        const script = document.createElement('script')
        script.type = 'application/json'
        scriptId = `schema_${id}`
        script.id = scriptId
        script.append(page_schema)
        newHead.appendChild(script)
    }
    return scriptId
}

export const addCanonicalLink = (meta_conical_link, id, head) => {
    let canonicalId
    if (meta_conical_link) {
        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        if (meta_conical_link) {
            canonicalLink.href = meta_conical_link
        } else {
            canonicalLink.href = window.location.href
        }
        canonicalLink.id = `canonical_${id}`
        canonicalId = canonicalLink.id
        head.appendChild(canonicalLink)
        return canonicalId
    }
}

export const addMetaDescription = (meta_description, id, head) => {
    let metaDescriptionId
    if (meta_description) {
        const metaDescription = document.createElement('meta')
        metaDescription.name = 'Description'
        metaDescription.content = meta_description
        metaDescription.id = `description_${id}`
        metaDescriptionId = metaDescription.id
        head.appendChild(metaDescription)
        return metaDescriptionId
    }
}

export const addMetaKeyword = (meta_keywords, id, head) => {
    let metaKeywordId
    if (meta_keywords) {
        const metaKeyword = document.createElement('meta')
        metaKeyword.name = 'Keyword'
        metaKeyword.content = meta_keywords
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

const createLearnMoreSchema = entities => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    }
    const schemaMainEntityObject = {
        "@type": "Question",
        "name": "",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": ""
        }
    }
    entities.forEach(entity => {
        const schemaMainEntityObjectCopy = JSON.parse(JSON.stringify(schemaMainEntityObject))
        schemaMainEntityObjectCopy['name'] = entity.heading
        schemaMainEntityObjectCopy['acceptedAnswer']['text'] = entity.questions_and_answers
        schema['mainEntity'].push(schemaMainEntityObjectCopy)
    })
    return JSON.stringify(schema)
}

export const addLearnMoreSchema = learnMore => {
    const { learn_more_section_component: entities, id } = learnMore
    const lmSchema = createLearnMoreSchema(entities)
    const scriptId = addSchemaScript(lmSchema, id)
    return scriptId
}