import Strapi from '../../providers/strapi'
import { useEffect, useState } from 'react'
import Router from 'next/router';


const OfferDetailCards = props => {
    const friends = ["a", "b", "c", "d"]
    const strapi = new Strapi();
    const [offers, setOffers] = useState([]);
    useEffect(() => {
        if (props.data) {
            setOffers(props.data.offer_cards)
            console.log("------------------props.data", Array.isArray(offers))
            console.log("------------------props.data", offers)

        }

    })

    const cardButtonClick = (type) => {
        if (type == "eConnect") {
            Router.push(`/credit-cards/long-form`)
        }
        if (type == "applyNow") {
            Router.push(`/credit-cards/thank-you`)
        }
        
    }
    return (
        <section className="container long-cards">
            {offers.map(offer => {
                return (
                    <div className="long-cards-wrapper">
                        <div className="long-cards-wrapper-card">
                            <img className="recommended" src={`${strapi.baseUrl}${offer.bank_logo.url}`} alt={offer.bank_logo.name} />
                            <div className="top">
                                <div className="name">
                                    {/* <img className="mob-logo" src="../../images/icons/citi-logo.png" /> */}

                                    <h3><span>{offer.bank_name}</span><br />{offer.product_type}</h3>
                                    <div>
                                        <img src="../../images/listings/card.svg" />
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
                                    <button id="view-details">{offer.view_details_link}</button>
                                    {offer.button_type == "applyNow" ? <button onClick={()=> cardButtonClick(offer.button_type)} id="apply-now">{offer.button_text}</button> : null}
                                    {offer.button_type == "eConnect" ? <button onClick={ () => cardButtonClick(offer.button_type)} id="apply-now">{offer.button_text}</button> : null}
                                    {offer.button_type == "instantApproval" ? <button onClick={ () => cardButtonClick(offer.button_type)} id="apply-now">{offer.button_text}</button> : null}
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
// const OfferDetailCards = () => {
//     return (
//         <section className="container long-cards">
//             <div className="long-cards-wrapper">
//             <div className="long-cards-wrapper-card">
//                 <img className="recommended" src="../../images/icons/stamp.svg" />
//                 <div className="top">
//                     <div className="name">
//                         <img className="mob-logo" src="../../images/icons/citi-logo.png" />

//                         <h3><span>Citibank</span><br />Rewards Credit Card</h3>
//                         <div>
//                             <img src="../../images/listings/card.svg" />
//                         </div>
//                     </div>
//                     <div className="content">
//                         <ul>
//                             <li>Earn 10 reward points for every ₹125 spent at apparel & department stores </li>
//                             <li>Instant Redemption at select partner stores</li>
//                             <li>Spend and get up to 300 bonus rewards points in a month</li>
//                             <li>Get 5% Cashback on all utility bill payments through Citibank Online Bill Pay</li>
//                         </ul>
//                     </div>
//                     <div className="fee">
//                         <h5>Annual fee:</h5>
//                         <p><b>₹2500</b> (First year)</p>
//                         <p><b>₹2500</b> (Second year onwards)</p>
//                     </div>
//                 </div>
//                 <div className="bottom">
//                     <div className="lifetime">
//                         <h5>Lifetime reward points</h5>
//                     </div>
//                     <div className="options">
//                         <button id="view-details">View Details</button>
//                         <button id="apply-now">E-Connect</button>
//                     </div>
//                 </div>
//             </div>
//             </div>
//         </section>
//     )
// }

// export default OfferDetailCards