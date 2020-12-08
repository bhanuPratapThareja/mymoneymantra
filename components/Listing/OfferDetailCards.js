import Strapi from '../../providers/strapi'
import { getApiData } from '../../api/api';

import { useEffect, useState } from 'react'
import Router from 'next/router';


const OfferDetailCards = props => {
    const strapi = new Strapi()
    const [offers, setOffers] = useState([])
    const { url, body } = getApiData('leadProductDecision');
    console.log("getApiData('leadProductDecision')",getApiData('leadProductDecision'))
    let reqBody = body.request.payload;
    console.log("reqBody----------------------------",reqBody)

    useEffect(() => {
        setOffers(props.data.offer_cards)
    })

    const cardButtonClick = type => {
        if (type == "eConnect") {
            Router.push(`/credit-cards/long-form`)
        }
        if (type == "applyNow") {
            Router.push(`/credit-cards/thank-you`)
        }
        if(type == "instantApproval") {
            Router.push(`/credit-cards/long-form`) 
        }
    }

    const goToVDetailsPage = () => {
        Router.push(`/credit-cards/bank-product`)
    }

    return (
        <section className="container long-cards">
            {offers.map((offer, i) => {
                return (
                    <div className="long-cards-wrapper" key={offer.id}>
                        <div data-aos={i ? 'fade-up' : ''} className="long-cards-wrapper-card aos-init">
                            {offer.recommend ?
                                <img className="recommended" src="../../images/icons/stamp.svg" /> : null}
                            <div className="top">
                                <div className="name">
                                    <img className="mob-logo" src={`${strapi.baseUrl}${offer.bank_logo.url}`} alt={offer.bank_logo.name} />
                                    <h3><span>{offer.bank_name}</span><br />{offer.product_type}</h3>
                                    <div>
                                        <img src={`${strapi.baseUrl}${offer.card_image.url}`} alt={offer.card_image.name} />
                                    </div>
                                </div>
                                <div className="content">
                                    <ul>
                                        {offer.offer_details_card_feature.feature_text.map(fbp => <li key={fbp.id}>{fbp.questions}</li>)}
                                    </ul>
                                </div>
                                <div className="fee">
                                    <h5>Annual fee:</h5>
                                    <p><b></b> (First year)</p>
                                    <p><b>{offer.intrest_rate}</b> (Second year onwards)</p>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="lifetime">
                                    <h5>Lifetime reward points</h5>
                                </div>
                                <div className="options">
                                    <button id="view-details" onClick={goToVDetailsPage}>{offer.view_details_link}</button>
                                    {offer.button_type == "applyNow" ? <button onClick={() => cardButtonClick(offer.button_type)} id="apply-now">{offer.button_text}</button> : null}
                                    {offer.button_type == "eConnect" ? <button onClick={() => cardButtonClick(offer.button_type)} id="apply-now">{offer.button_text}</button> : null}
                                    {offer.button_type == "instantApproval" ? <button onClick={() => cardButtonClick(offer.button_type)} id="apply-now">{offer.button_text}</button> : null}
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