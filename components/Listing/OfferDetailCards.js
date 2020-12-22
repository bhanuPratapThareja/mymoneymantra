import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Strapi from '../../providers/strapi'
import DecisionButton from '../DecisionButton/DescisionButton'

const OfferDetailCards = props => {
    const router = useRouter()
    const strapi = new Strapi()
    const [offers, setOffers] = useState([])

    useEffect(() => {
        setOffers(props.offerCards)
    })

    const cardButtonClick = offer => {
        //     const basePath = '/credit-cards'
        //     const { bank_slug: bank, product_slug: product, 
        //         type, button_type: buttonType, button_type: 
        //         buttonText, bank_name } = offer

        //     let pathName = ''
        //     if (type == "eConnect" || type == 'instantApproval') {
        //         pathName = `${basePath}/long-form/${bank}/${product}`
        //     } else {
        //         pathName = `${basePath}/thank-you`
        //     }
        //     const query = { buttonType, buttonText, bank_name }
        //     routerRedirect(pathName, query)
    }

    const goToDetailsPage = offer => {
        const { bank: { bank_name: bankName, slug: bankSlug }, slug: productSlug } = offer
        const basePath = '/credit-cards'
        const pathName = `${basePath}/${bankSlug}/${productSlug}`
        const query = { bankName }
        routerRedirect(pathName, query)
    }

    const routerRedirect = (pathname, query) => {
        router.push({ pathname, query }, pathname, { shallow: true })
    }

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
                                    <img className="mob-logo" src={`${strapi.baseUrl}${offer.bank.bank_logo.url}`} alt={offer.bank.bank_logo.name} />
                                    <h3><span>{offer.bank.bank_name}</span><br />{offer.product_name}</h3>
                                    <div>
                                        <img src={`${strapi.baseUrl}${offer.product_image.url}`} alt={offer.product_image.name} />
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
                                    {/* <button id="view-details" onClick={() => goToDetailsPage(offer)}>View Details</button> */}
                                    <DecisionButton
                                        id='view-details'
                                        basePath='/credit-cards'
                                        buttonText='View Details'
                                        offer={offer}
                                    />
                                    {/* <button onClick={() => cardButtonClick(offer)} id="apply-now">{offer.productDecision}</button> */}
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