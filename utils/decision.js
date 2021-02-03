export const makeDecision = (buttonText, offer, primaryPath, changePageType) => {
    const { bank: { bank_name: bankName, slug: bankSlug }, product: { slug: productSlug } } = offer
    let pathname = ''
    let query = { bankName }

    switch (buttonText) {
      case "Apply Now":
      case "Instant Approval":
        pathname = `/${primaryPath}/thank-you`;
        break;

      case "EConnect":
        console.log('here')
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}?page=long-form`
        query.page = 'long-form'
        if(changePageType) {
          changePageType('long-form')
        }
        break;

      // view details
      default:
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}`
        query.page = 'details'
        if(changePageType) {
          changePageType('details')
        }
    }

    return { pathname, query }
}