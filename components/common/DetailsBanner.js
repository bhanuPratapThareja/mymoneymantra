import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from '../ImageComponent/ImageComponent'

import { getProductDecisionForDetailsBanner } from '../../services/offersService'

const DetailsBanner = props => {
    const router = useRouter()
    const primaryPath = router.query.primaryPath
    const [productDetails, setPoductDetails] = useState(null)

    useEffect(() => {
        getDetailsWithButtonText(props.product)
    }, [])

    const getDetailsWithButtonText = async product => {
        const productDetails = await getProductDecisionForDetailsBanner(product, props.bank, primaryPath)
        setPoductDetails(productDetails)
    }

    const { bank_name } = props.bank
    const { product_name, product_image, product_card_name } = props.product
    const details = props.data.credit_cards_details_banner || props.data.personal_loans_details_banner ||  props.data.home_loans_details_banner

    const onButtonClick = (buttonText, bank, offer) => {
        const { slug: productSlug } = offer
        const { bank_name: bankName, slug: bankSlug } = bank

        let pathname = ''
        const query = { bankName }


        switch (buttonText) {
            case 'Apply Now':
            case 'Instant Approval':
                pathname = `/${primaryPath}/thank-you`
                break

            // case 'Apply Now':
            case 'EConnect':
                pathname = `/${primaryPath}/long-form/${bankSlug}/${productSlug}`

                break
            // view details
            default:
                pathname = `/${primaryPath}/${bankSlug}/${productSlug}`
                router.push({ pathname, query }, pathname, { shallow: true })
        }

        routerRedirect(pathname, query)
    }

    const routerRedirect = (pathname, query) => {
        router.push({ pathname, query }, pathname, { shallow: true })
    }

    return (
        <div className="combined-wrapper">
            <div className="mobile-background"></div>
            <section className="banner container">
                <div className="banner-wrapper">
                    <h1><b>{bank_name}</b><br />{product_name || product_card_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: details.content }}></div>
                    {productDetails ? <span className="details-button-div">
                        <button onClick={() => onButtonClick(productDetails.productDecision, props.bank, productDetails)}>{productDetails.productDecision}</button>
                    </span> : null}
                </div>
                <div>
                    <Image className="banner-card" image={product_image} />
                </div>
            </section>
        </div>
    )
}

export default DetailsBanner