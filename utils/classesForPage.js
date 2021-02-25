const classes = {
  'home-page': ['credit-card-flow', 'homepage-flow'],
  'credit-cards': ['credit-card-flow'],
  'personal-loans': ['credit-card-flow', 'personal-loan-flow'],
  'home-loans': ['credit-card-flow', 'personal-loan-flow', 'home-loan-flow', 'gold-loan-flow', 'health-flow'],
  'blog': ['credit-card-flow', 'b2c-flow', 'blogs-flow'],
  'blog-search': ['credit-card-flow', 'b2c-flow', 'blogs-flow', 'blogs-search'],
  'contributor-detail': ['credit-card-flow', 'b2c-flow', 'blogs-flow', 'blog-details', 'contributor-detail'],
  'Forms': ['credit-card-flow', 'homepage-flow'],
  'long-form': ['long-form'],
  'listings': {
    'credit-cards': ['listings'],
    'personal-loans': ['listings', 'personal-loan-listing'],
    'home-loans': ['listings', 'personal-loan-listing', 'home-loan-listing']
  },
  'thank-you': {
    'credit-cards': ['credit-card-flow', 'thankyou-page'],
    'personal-loans': ['credit-card-flow', 'thankyou-page', 'personal-loan-thankyou'],
    'home-loans': ['credit-card-flow', 'thankyou-page', 'personal-loan-thankyou', 'home-loan-thank-you', 'health-flow'],
    'rkpl': ['credit-card-flow', 'thankyou-page']
  },
  'details': {
    'credit-cards': ['credit-card-flow', 'c-detail-page'],
    'personal-loans': ['credit-card-flow', 'c-detail-page', 'personal-detail-flow'],
    'home-loans': ['credit-card-flow', 'c-detail-page', 'personal-detail-flow'],
    'blog': ['credit-card-flow', 'b2c-flow', 'blogs-flow', 'blog-details']
  },
  'user-profile': ['credit-card-flow', 'profile-flow'],
  'sign-up': ['credit-card-flow', 'b2c-flow', 'b2c-thank-you', 'thankyou-page'],
  'credit-score-profile': ['credit-card-flow', 'credProfile', 'dashboard', 'app-progress', 'app-status', 'creditProfile-score-flow'],
  'cp-rank': ['credit-card-flow', 'credProfile', 'dashboard', 'app-progress', 'app-status', 'credit-rank-flow'],
  'cp-utilization': ['credit-card-flow', 'credProfile', 'dashboard', 'app-progress', 'app-status', 'creditProfile-utilization-flow'],
  'cp-age': ['credit-card-flow', 'credProfile', 'dashboard', 'app-progress', 'app-status', 'creditProfile-age-flow'],
  'cp-accounts': ['credit-card-flow', 'credProfile', 'dashboard', 'app-progress', 'app-status', 'creditProfile-account-flow'],
  'cp-enquiries': ['credit-card-flow', 'credProfile', 'dashboard', 'app-progress', 'app-status', 'creditProfile-enquiries-flow'],

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
