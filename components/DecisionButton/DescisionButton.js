import { useRouter } from 'next/router'

const DecisionButton = props => {
    const router = useRouter()
    const { id, basePath, buttonText, offer } = props

    const onButtonClick = () => {
        const { bank: { bank_name: bankName, slug: bankSlug }, slug: productSlug } = offer
        let pathName = ''
        let query = {}

        switch (buttonText) {
            case 'Apply Now':
                pathName = `${basePath}/thank-you`
                query = { bankName, buttonText }
                break

            case 'E Connect':
            case 'Instant Approval':
                pathName = `${basePath}/long-form/${bankSlug}/${productSlug}`
                query = { bankName, buttonText }
                break

            // view details
            default:
                pathName = `${basePath}/${bankSlug}/${productSlug}`
        }

        routerRedirect(pathName, query)
    }

    const routerRedirect = (pathname, query) => {
        console.log('pathname: ', pathname)
        console.log('query: ', query)
        router.push({ pathname, query }, pathname, { shallow: true })
    }


    return (
        <button id={id} onClick={onButtonClick}>{buttonText}</button>
    )
}

export default DecisionButton