import { useEffect, useState } from 'react'
import Image from '../ImageComponent/ImageComponent'
import DecisionButton from '../DecisionButton/DescisionButton'
import { getProductDecision } from '../../services/offersService'
import { sf, lf, ApplyNow, EConnect } from '../../utils/types'

const DetailsBanner = props => {
    const [productData, setProductData] = useState(null)

    useEffect(() => {
        getProductData()
    }, [])

    const getProductData = async () => {
        if (props.formRedirection) {
            props.productData.formRedirection = props.formRedirection
            if (props.formRedirection === lf) {
                props.productData.productDecision = EConnect
            } else if (props.formRedirection === sf) {
                props.productData.productDecision = ApplyNow
            }
            setProductData(props.productData)
            return
        }
        const productWithDesicion = await getProductDecision([props.productData], props.productType)
        setProductData(productWithDesicion[0])
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
                        {props.primaryPath === 'credit-cards' ?
                            product.product_name : props.productType.product_type_name.slice(0, -1)}
                    </h1>
                    {props.primaryPath !== 'credit-cards' && product.product_banner_detail ? <div dangerouslySetInnerHTML={{ __html: product.product_banner_detail.content }}></div> : null}


                    {productDecision ?
                        <span className="details-button-div">
                            <DecisionButton
                                buttonText={productDecision}
                                offer={productData}
                                primaryPath={props.primaryPath}
                                changePageType={props.changePageType}
                            />
                        </span> : null}
                </div>

                <div>
                    {productData.product.product_image ? <Image className="banner-card" image={productData.product.product_image.image} /> : null}
                    {productData.bank ? <Image className="banner-card" image={productData.bank.image} /> : null}
                </div>
            </section>
        </div>
    )
}

export default DetailsBanner