import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from '../../components/ImageComponent/ImageComponent'

const ProductDetails = props => {
    const router = useRouter()
    const primaryPath = router.query.primaryPath
    const [leftPositionedOffers, setlLeftPositionedOffers] = useState([])
    const [rightPositionedOffers, setlRightPositionedOffers] = useState([])

    useEffect(() => {
        let leftOffers = []
        let rightOffers = []
        props.product.details_component.forEach(offer => {
            if (offer.position === 'left') {
                leftOffers.push(offer)
            } else {
                rightOffers.push(offer)
            }
        })
        setlLeftPositionedOffers(leftOffers)
        setlRightPositionedOffers(rightOffers)
    }, [])

    const { bank } = props

    return (
        <div className="c-detail-page">
            <section className="container annual-fee">
                <div className="annual-fee-wrapper">
                    <div className="left">
                        {primaryPath === 'personal-loans' || 'home-loans'? <div className="logo"><Image image={bank.bank_image} /></div> : null}
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