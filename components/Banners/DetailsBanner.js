import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from '../ImageComponent/ImageComponent'
import DecisionButton from '../DecisionButton/DescisionButton'

import { getProductDecision } from '../../services/offersService'
import { unpackComponents } from '../../services/componentsService'

const DetailsBanner = props => {
    const router = useRouter()
    const primaryPath = router.query.primaryPath
    const [productData, setproductData] = useState(null)

    useEffect(() => {
        getProductData()
    }, [])

    const getProductData = async () => {
        const productData = await unpackComponents(props.productData[0])
        await getProductDecision([productData], primaryPath)
        setproductData(productData)
    }

    if (!productData) {
        return null
    }

    const { bank, product, productDecision } = productData

    return (
        <div className="combined-wrapper">
            <div className="mobile-background"></div>
            <section className="banner container">
                <div className="banner-wrapper">
                    <h1><b>{bank.bank_name}</b><br />
                        {product.product_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: product.product_banner_detail.content }}></div>

                    {productDecision ?
                        <span className="details-button-div">
                            <DecisionButton 
                                buttonText={productDecision} 
                                offer={productData}
                                changePageType={props.changePageType}
                            />
                        </span> : null}
                </div>

                <div>
                    <Image className="banner-card" image={product.product_image.image} />
                </div>
            </section>
        </div>
    )
}

export default DetailsBanner