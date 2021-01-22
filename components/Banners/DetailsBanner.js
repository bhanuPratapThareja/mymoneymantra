import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from '../ImageComponent/ImageComponent'

import { getProductDecision } from '../../services/offersService'
import { unpackComponents } from '../../services/componentsService';

const DetailsBanner = props => {
    const productData = unpackComponents(props.productData[0])
    const router = useRouter()
    const primaryPath = router.query.primaryPath
    const [productDecision, setProductDecision] = useState('')

    const { bank_name } = productData.bank
    const { product_name, product_banner_detail, product_image } = productData.product

    useEffect(() => {
        getDetailsWithButtonText()
    }, [])

    const getDetailsWithButtonText = async () => {
        const response = await getProductDecision([productData], primaryPath)
        setProductDecision(response[0].productDecision)
    }

    const onButtonClick = productDecision => {
        const { bank_name: bankName, slug: bankSlug } = productData.bank
        const { slug: productSlug } = productData.product

        let pathname = ''
        const query = { bankName }

        switch (productDecision) {
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
                    <h1><b>{bank_name}</b><br />
                        {product_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: product_banner_detail.content }}></div>
                    {productDecision ? <span className="details-button-div">
                        <button onClick={() => onButtonClick(productDecision)}>{productDecision}</button>
                    </span> : null}
                </div>
                <div>
                    <Image className="banner-card" image={product_image.image} />
                </div>
            </section>
        </div>
    )
}

export default DetailsBanner