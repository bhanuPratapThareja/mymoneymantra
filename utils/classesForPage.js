const classes = {
    'home-page': ['credit-card-flow', 'homepage-flow'],
    'credit-cards': ['credit-card-flow'],
    'personal-loans': ['credit-card-flow', 'personal-loan-flow'],
    'home-loans': ['credit-card-flow', 'personal-loan-flow', 'home-loan-flow', 'gold-loan-flow', 'health-flow'],
    'blog': ['credit-card-flow', 'b2c-flow', 'blogs-flow'],
    'long-form': ['long-form'],
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
        'home-loans': ['credit-card-flow', 'c-detail-page', 'personal-detail-flow'],
        'blog': ['credit-card-flow', 'b2c-flow', 'blogs-flow', 'blog-details']
    }

}

export const getClassesForPage = (primary, secondary) => {
    let pageClasses = ''
    if (!secondary) {
        pageClasses = classes[primary]
    } else {
        pageClasses = classes[secondary][primary]
    }

    if (pageClasses && pageClasses.length) {
        return pageClasses.join(' ')
    } else {
        return ''
    }
}