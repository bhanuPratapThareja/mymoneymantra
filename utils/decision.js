export const makeDecision = (buttonText, primaryPath, offer, changePageType) => {

    const { bank: { bank_name: bankName, slug: bankSlug }, product: { slug: productSlug } } = offer
    let pathname = ''
    let query = { bankName }

    switch (buttonText) {
      case "Apply Now":
      case "Instant Approval":
        pathname = `/${primaryPath}/thank-you`;
        break;

      case "EConnect":
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}?type=long-form`
        if(changePageType) {
          changePageType('long-form')
        }
        // query = { bankName, type: 'long-form' }
        break;

      // view details
      default:
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}`
        if(changePageType) {
          changePageType('details')
        }
    }

    return { pathname, query }
}