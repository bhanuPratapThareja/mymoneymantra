import Strapi from '../../providers/strapi'
import { useEffect, useState } from 'react'
import Router from 'next/router';

const OfferDetailCards = props => {
    const strapi = new Strapi()
    const [offers, setOffers] = useState([])

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
        if (type == "instantApproval") {
            Router.push(`/credit-cards/long-form`)
        }
    }

    const goToDetailsPage = (bank, product, buttonType, buttonText) => {
        Router.push({
            pathname: `/credit-cards/${bank}/${product}`,
            query: { buttonType, buttonText }
        }, 
        `/credit-cards/${bank}/${product}`, { shallow: true })
    }

    return (
        <section className="container long-cards">
            {offers.map((offer, i) => {
                return (
                    <div className="long-cards-wrapper" key={offer.id}>
                        <div data-aos={i ? 'fade-up' : ''} className="long-cards-wrapper-card aos-init">
                            {offer.recommend ?
                                <img className="recommended" src="/assets/images/icons/stamp.svg" /> : null}
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
                                    <p><b>₹ {offer.interest_rate}</b> (First Year)</p>
                                    {offer.annual_fee_sye ?<p><b>₹ {offer.annual_fee_sye}</b> (Second year onwards)</p>:null}
                                    
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="lifetime">
                                    <h5>{offer.usp_highlights}</h5>
                                </div>
                                <div className="options">
                                    <button id="view-details" onClick={() => goToDetailsPage(offer.bank_slug, offer.product_slug, offer.button_type, offer.button_text)}>{offer.view_details_link}</button>
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