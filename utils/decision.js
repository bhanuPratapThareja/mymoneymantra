import { setLeadBank, setFormData, clearLeadId, clearFormData } from './localAccess.js'
import { sf, ApplyNow, EConnect, InstantApproval, InstantApprove } from './types.js'

export const makeDecision = (buttonText, offer, primaryPath, changePageType) => {
  const { bank: { bank_name: bankName, slug: bankSlug, bank_id: bankId }, product: { slug: productSlug } } = offer
  let pathname = ''
  let query = { bankName }

  switch (buttonText) {
    case ApplyNow:
      const leadBank = { bankId, bankName }

      if (offer.formRedirection === sf) {
        pathname = `/${primaryPath}`
        query.formRedirection = offer.formRedirection
        let data = {}
        data.leadBank = leadBank
        clearFormData(primaryPath)
        clearLeadId(primaryPath)
        setFormData(data, primaryPath)
      } else {
        pathname = `/thank-you`
      }

      setLeadBank(leadBank)
      break

    case InstantApproval:
    case InstantApprove:
      setLeadBank(leadBank)
      pathname = `/thank-you`;
      break;

    case EConnect:
      if (primaryPath === 'credit-cards') {
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}?page=long-form`
      } else {
        pathname = `/${primaryPath}/${bankSlug}?page=long-form`
      }
      query.page = 'long-form'
      if (changePageType) {
        changePageType('long-form')
      }
      break;

    // view details
    default:
      if (primaryPath === 'credit-cards') {
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}`
      } else {
        pathname = `/${primaryPath}/${bankSlug}`
      }

      query.page = 'details'
      if (changePageType) {
        changePageType('details')
      }
  }

  return { pathname, query }
}