import { getPrimaryPath } from "./localAccess"

export const makeDecision = (buttonText, offer, changePageType) => {
    const primaryPath = getPrimaryPath()
    const { bank: { bank_name: bankName, slug: bankSlug }, product: { slug: productSlug } } = offer
    let pathname = ''
    let query = { bankName }

    switch (buttonText) {
      case "Apply Now":
      case "Instant Approval":
        pathname = `/${primaryPath}/thank-you`;
        break;

      case "EConnect":
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}?page=long-form`
        if(changePageType) {
          changePageType('long-form')
        }
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