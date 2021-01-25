export const makeDecision = (buttonText, primaryPath, offer) => {

    const { bank: { bank_name: bankName, slug: bankSlug }, product: { slug: productSlug } } = offer
    let pathname = ''
    const query = { bankName }

    switch (buttonText) {
      case "Apply Now":
      case "Instant Approval":
        pathname = `/${primaryPath}/thank-you`;
        break;

      case "EConnect":
        pathname = `/${primaryPath}/long-form/${bankSlug}/${productSlug}`;
        break;

      // view details
      default:
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}`;
    }

    return { pathname, query }
}