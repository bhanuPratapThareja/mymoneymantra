import { useEffect, useState } from 'react'
import Image from '../ImageComponent/ImageComponent'

import { getProductDecision } from '../../services/offersService'

const DetailsBanner = props => {
    const [productDetails, setPoductDetails] = useState(null)

    useEffect(() => {
        getDetailsWithButtonText(props.product)
    }, [])

    const getDetailsWithButtonText = async product => {
        const productDetails = await getProductDecision([product])
        setPoductDetails(productDetails[0])
    }

    const { bank_name } = props.bank
    const { product_name, product_image } = props.product
    const details = props.data.credit_cards_details_banner || props.data.personal_loans_details_banner

    return (
        <div className="combined-wrapper">
            <section className="banner container">
                <div className="banner-wrapper">
                    <h1><b>{bank_name}</b><br />{product_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: details.content }}></div>
                    {productDetails ? <button>{productDetails.productDecision}</button> : null}
                </div>
                <div>
                    <Image className="banner-card" image={product_image} />
                </div>
            </section>
        </div>
    )
}

export default DetailsBanner