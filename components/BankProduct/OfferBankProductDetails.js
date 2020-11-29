import MarkDown from '../../Utils/markdown'
import { useState, useEffect } from 'react';

const OfferBankProductDetails = props => {
    const [leftPositionedOffers, setlLeftPositionedOffers] = useState([])
    const [rightPositionedOffers, setlRightPositionedOffers] = useState([])

    useEffect(() => {
        let leftOffers = []
        let rightOffers = []
        props.data.offers.forEach(offer => {
            if (offer.position === 'left') {
                leftOffers.push(offer)
            } else {
                rightOffers.push(offer)
            }
        })
        setlLeftPositionedOffers(leftOffers)
        setlRightPositionedOffers(rightOffers)
    }, [])

    return (
        <div className="c-detail-page">
            <section className="container annual-fee">
                <div className="annual-fee-wrapper">
                    <div className="left">
                        {leftPositionedOffers.map(offer => {
                            return (
                                <React.Fragment key={offer.id}>
                                    <h3>{offer.heading}</h3>
                                    <MarkDown markDown={offer.content} />
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className="right">
                        {rightPositionedOffers.map(offer => {
                            return (
                                <React.Fragment key={offer.id}>
                                    <h3>{offer.heading}</h3>
                                    <MarkDown markDown={offer.content} />
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OfferBankProductDetails