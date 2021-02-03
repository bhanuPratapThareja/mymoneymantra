import { useState, useEffect } from 'react'
import Image from '../../components/ImageComponent/ImageComponent'

const ProductDetails = props => {
    const [leftPositionedOffers, setlLeftPositionedOffers] = useState([])
    const [rightPositionedOffers, setlRightPositionedOffers] = useState([])

    useEffect(() => {
        getOffersDetails()
    }, [])

    const getOffersDetails = async () => {
        let leftOffers = []
        let rightOffers = []
        props.productData.product.product_detail.details.forEach(offer => {
            if (offer.position === 'left') {
                leftOffers.push(offer)
            } else {
                rightOffers.push(offer)
            }
        })
        setlLeftPositionedOffers(leftOffers)
        setlRightPositionedOffers(rightOffers)
    }

    const { bank } = props.productData

    return (
        <div className="c-detail-page">
            <section className="container annual-fee">
                <div className="annual-fee-wrapper">
                    <div className="left">
                        {props.primaryPath != "credit-cards" && bank ?
                            <div className="logo"><Image image={bank.bank_image} /></div>
                            : null}
                        {leftPositionedOffers.map(offer => {
                            return (
                                <React.Fragment key={offer.id}>
                                    <div dangerouslySetInnerHTML={{ __html: offer.content }}></div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className="right">
                        {rightPositionedOffers.map(offer => {
                            return (
                                <React.Fragment key={offer.id}>
                                    <div dangerouslySetInnerHTML={{ __html: offer.content }}></div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDetails