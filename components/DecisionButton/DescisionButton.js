import { useRouter } from 'next/router'

const DecisionButton = props => {
    const router = useRouter()
    const { id, primaryPath, buttonText, offer } = props

    const onButtonClick = () => {
        console.log('offer: ', offer)
        props.onButtonClick(primaryPath, buttonText, offer)
    }

    // const onButtonClick = () => {
    //     const { bank: { bank_name: bankName, slug: bankSlug }, slug: productSlug } = offer
    //     let pathName = ''
    //     let query = {}

    //     switch (buttonText) {
    //         case 'Apply Now':
    //             pathName = `${primaryPath}/thank-you`
    //             break

    //         case 'E Connect':
    //         case 'Instant Approval':
    //             pathName = `${primaryPath}/long-form/${bankSlug}/${productSlug}`
    //             query = { bankName }
    //             break

    //         // view details
    //         default:
    //             pathName = `${primaryPath}/${bankSlug}/${productSlug}`
    //             query = { bankName }
    //     }

    //     routerRedirect(pathName, query)
    // }

    // const routerRedirect = (pathname, query) => {
    //     router.push({ pathname, query }, pathname, { shallow: true })
    // }

    return (
        <button id={id} onClick={onButtonClick}>{buttonText}</button>
    )
}

export default DecisionButton