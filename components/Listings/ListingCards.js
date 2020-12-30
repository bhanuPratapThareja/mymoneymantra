import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'
import DecisionButton from '../DecisionButton/DescisionButton'
import { getDevice } from '../../utils/getDevice'

const ListingCards = props => {
    const router = useRouter()
    const [offers, setOffers] = useState([])

    useEffect(() => {
        setOffers(props.offerCards)
        const productType = props.primaryPath === 'personal-loans' ? 'Personal Loan' : ''
    })

    const onOfferClick = (primaryPath, buttonText, offer) => {
        if (getDevice() !== 'desktop') {
            onButtonClick(primaryPath, buttonText, offer)
        }
    }

    const onButtonClick = (primaryPath, buttonText, offer) => {
        const { bank: { bank_name: bankName, slug: bankSlug }, slug: productSlug } = offer
        let pathname = ''
        const query = { bankName }

        switch (buttonText) {
            case 'Apply Now':
            case 'Instant Approval':
                pathname = `/${primaryPath}/thank-you`
                // pathname = `/${primaryPath}/thank-you/${bankSlug}/${productSlug}`
                break

            // case 'Apply Now':
            case 'E Connect':
                pathname = `/${primaryPath}/long-form/${bankSlug}/${productSlug}`
                break
            // view details
            default:
                pathname = `/${primaryPath}/${bankSlug}/${productSlug}`
                router.push({ pathname, query }, pathname, { shallow: true })
        }

        routerRedirect(pathname, query)
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
                    <div className="long-cards-wrapper" key={offer.id} onClick={() => onOfferClick(props.primaryPath, offer.productDecision, offer)}>
                        <div data-aos={i ? 'fade-up' : ''} className="long-cards-wrapper-card aos-init">
                            {offer.recommended ?
                                <img className="recommended" src="/assets/images/icons/stamp.svg" /> : null}
                            <div className="top">
                                <div className="name">
                                    {props.primaryPath === 'credit-cards' ?
                                        <Image className="mob-logo" image={offer.bank.bank_logo}
                                        /> : null}

                                    <h3><span>{offer.bank.bank_name}</span></h3>
                                    <h3>{offer.product_name}</h3>
                                    <h3>{offer.product_card_name}</h3>

                                    {props.primaryPath === 'credit-cards' ? <div>
                                        <Image image={offer.product_image} />
                                    </div> : null}

                                    {props.primaryPath !== 'credit-cards' ? <div>
                                        <Image image={offer.bank.bank_logo} />
                                    </div> : null}

                                </div>
                                <div className="content">
                                    <h5>Features:</h5>
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
                                        primaryPath={props.primaryPath}
                                        buttonText='View Details'
                                        offer={offer}
                                        onButtonClick={onButtonClick}
                                    />
                                    <DecisionButton
                                        id='apply-now'
                                        primaryPath={props.primaryPath}
                                        buttonText={offer.productDecision}
                                        offer={offer}
                                        onButtonClick={onButtonClick}
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

export default ListingCards