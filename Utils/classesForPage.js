const classes = {
    'credit-cards': ['credit-card-flow'],
    'personal-loans': ['credit-card-flow', 'personal-loan-flow'],
    'listings': {
        'credit-cards': ['listings'],
        'personal-loans': ['listings', 'personal-loan-listing']
    },
    'thank-you': {
        'credit-cards': ['credit-card-flow', 'thankyou-page'],
        'personal-loans': ['credit-card-flow', 'thankyou-page', 'personal-loan-thankyou']
    },
    'details': {
        'credit-cards': ['credit-card-flow', 'c-detail-page'],
        'personal-loans': ['credit-card-flow', 'c-detail-page', 'personal-detail-flow']
    }

}

export const getClassesForPage = (primary, secondary) => {
    let pageClasses = ''
    if (!secondary) {
        pageClasses = classes[primary]
    } else {
        pageClasses = classes[secondary][primary]
    }

    if(pageClasses && pageClasses.length) {
        return pageClasses.join(' ')
    } else {
        return ''
    }
}