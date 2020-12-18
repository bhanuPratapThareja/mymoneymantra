import Strapi from '../../providers/strapi'
import { useEffect, useState } from 'react'
import Router from 'next/router';

const OfferDetailCards = props => {
    console.log('inside offerDetailCards props',props);
    const strapi = new Strapi()
    const [offers, setOffers] = useState([])

    
    useEffect(() => {
        setOffers(props.offerCards)
    })

    const cardButtonClick = offer => {
        const basePath = '/credit-cards'
        const { bank_slug: bank, product_slug: product, 
            type, button_type: buttonType, button_type: 
            buttonText, bank_name } = offer

        let pathName = ''
        if (type == "eConnect" || type == 'instantApproval') {
            pathName = `${basePath}/long-form/${bank}/${product}`
        } else {
            pathName = `${basePath}/thank-you`
        }
        const query = { buttonType, buttonText, bank_name }
        routerRedirect(pathName, query)
    }

    const goToDetailsPage = offer => {
        const { bank_slug: bank, product_slug: product,
            button_type: buttonType, button_type: buttonText,
            bank_name } = offer

        const basePath = '/credit-cards'
        const pathName = `${basePath}/${bank}/${product}`
        const query = { buttonType, buttonText, bank_name }
        routerRedirect(pathName, query)
    }

    const routerRedirect = (pathname, query) => {
        Router.push({ pathname, query }, pathname, { shallow: true })
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
                                    {offer.annual_fee_sye ? <p><b>₹ {offer.annual_fee_sye}</b> (Second year onwards)</p> : null}

                                </div>
                            </div>
                            <div className="bottom">
                                <div className="lifetime">
                                    <h5>{offer.usp_highlights}</h5>
                                </div>
                                <div className="options">
                                    <button id="view-details" onClick={() => goToDetailsPage(offer)}>{offer.view_details_link}</button>
                                    <button onClick={() => cardButtonClick(offer)} id="apply-now">{offer.button_text}</button>
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