import { useEffect, useState } from 'react'
import Image from '../ImageComponent/ImageComponent'
import DecisionButton from '../DecisionButton/DescisionButton'
import { useRouter } from 'next/router'
import { getPrimaryPath } from '../../Utils/getPaths';

const OfferDetailCards = props => {
    const router = useRouter()
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
                                        {offer.listing_cards_features.map(feature => <li key={feature.id}>
                                            <span dangerouslySetInnerHTML={{ __html: feature.listing_card_feature }}></span>
                                        </li>)}
                                    </ul>
                                </div>
                                {offer.annual_fee_fy ? <div className="fee">
                                    <h5>Annual fee:</h5>
                                    <p><b>₹ {offer.annual_fee_fy}</b> (First Year)</p>
                                    {offer.annual_fee_sy ? <p><b>₹ {offer.annual_fee_sy}</b> (Second year onwards)</p> : null}

                                </div> : null}

                                {offer.intrest_rate ? <div className="fee">
                                    <h5>Interest Rate:</h5>
                                    <p dangerouslySetInnerHTML={{ __html: offer.intrest_rate }}></p>
                                </div> : null}
                            </div>
                            <div className="bottom">
                                <div className="lifetime">
                                    <h5><span dangerouslySetInnerHTML={{ __html: offer.usp_highlights }}></span></h5>
                                </div>
                                <div className="options">
                                    <DecisionButton
                                        id='view-details'
                                        primaryPath={`/${props.primaryPath}`}
                                        buttonText='View Details'
                                        offer={offer}
                                    />
                                    <DecisionButton
                                        id='apply-now'
                                        primaryPath={`/${props.primaryPath}`}
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