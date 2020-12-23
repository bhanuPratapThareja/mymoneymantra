import { useEffect, useState } from 'react'
import Image from '../ImageComponent/ImageComponent'
import DecisionButton from '../DecisionButton/DescisionButton'

const OfferDetailCards = props => {
    const [offers, setOffers] = useState([])

    useEffect(() => {
        setOffers(props.offerCards)
    })

    if (!offers) {
        return null
    }

    return (
        <section className="container long-cards">
            {offers.map((offer, i) => {
                return (
                    <div className="long-cards-wrapper" key={offer.id}>
                        <div data-aos={i ? 'fade-up' : ''} className="long-cards-wrapper-card aos-init">
                            {offer.recommended ?
                                <img className="recommended" src="/assets/images/icons/stamp.svg" /> : null}
                            <div className="top">
                                <div className="name">
                                    <Image className="mob-logo" image={offer.bank.bank_logo} />
                                    <h3><span>{offer.bank.bank_name}</span><br />{offer.product_name}</h3>
                                    <div>
                                        <Image image={offer.product_image} />
                                    </div>
                                </div>
                                <div className="content">
                                    <ul>
                                        {offer.loan_listing_card_features.map(feature => <li key={feature.id}>{feature.loan_listing_card_feature}</li>)}
                                    </ul>
                                </div>
                                <div className="fee">
                                    <h5>Annual fee:</h5>
                                    <p><b>₹ {offer.annual_fee_fy}</b> (First Year)</p>
                                    <p><b>₹ {offer.annual_fee_sy}</b> (Second year onwards)</p>

                                </div>
                            </div>
                            <div className="bottom">
                                <div className="lifetime">
                                    <h5>{offer.usp_highlights}</h5>
                                </div>
                                <div className="options">
                                    <DecisionButton
                                        id='view-details'
                                        basePath='/credit-cards'
                                        buttonText='View Details'
                                        offer={offer}
                                    />
                                    <DecisionButton
                                        id='apply-now'
                                        basePath='/credit-cards'
                                        buttonText={offer.productDecision}
                                        offer={offer}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
    )

}

export default OfferDetailCards