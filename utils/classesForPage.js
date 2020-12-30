const classes = {
    'home-page': ['credit-card-flow', 'homepage-flow'],
    'credit-cards': ['credit-card-flow'],
    'personal-loans': ['credit-card-flow', 'personal-loan-flow'],
    'home-loans': ['credit-card-flow', 'personal-loan-flow', 'home-loan-flow', 'lap-flow', 'gold-loan-flow', 'health-flow'],
    'listings': {
        'credit-cards': ['listings'],
        'personal-loans': ['listings', 'personal-loan-listing'],
        'home-loans': ['listings', 'personal-loan-listing', 'home-loan-listing']
    },
    'thank-you': {
        'credit-cards': ['credit-card-flow', 'thankyou-page'],
        'personal-loans': ['credit-card-flow', 'thankyou-page', 'personal-loan-thankyou'],
        'home-loans': ['credit-card-flow', 'thankyou-page', 'personal-loan-thankyou', 'home-loan-thank-you', 'health-flow']
    },
    'details': {
        'credit-cards': ['credit-card-flow', 'c-detail-page'],
        'personal-loans': ['credit-card-flow', 'c-detail-page', 'personal-detail-flow'],
        'home-loans': ['credit-card-flow', 'c-detail-page', 'personal-detail-flow', 'home-loan-flow-detail']
    }

}

export const getClassesForPage = (primary, secondary) => {
    console.log('primary, secondary:: ', primary, secondary)
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