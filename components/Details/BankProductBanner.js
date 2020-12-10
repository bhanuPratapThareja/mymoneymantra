import Strapi from '../../providers/strapi'
import Router from 'next/router';
import { useEffect, useState } from 'react';

const BankProductBanner = props => {
    const strapi = new Strapi()
    const { heading, image, sub_text, listing_offer_button } = props.data
    let buttonType;
    let buttonText;
    if(listing_offer_button) {
        buttonType = listing_offer_button.buttonType
        buttonText = listing_offer_button.buttonText
    }

    const cardButtonClick = type => {
        const { bank, product } = Router.query
        if (type == "eConnect") {
            Router.push(`/credit-cards/long-form/${bank}/${product}`)
        }
        if (type == "applyNow") {
            Router.push(`/credit-cards/thank-you`)
        }
        if (type == "instantApproval") {
            Router.push(`/credit-cards/long-form/${bank}/${product}`)
        }
    }

    // const { buttonType, buttonText } = productBannerButton

    return (
        <div className="credit-card-flow c-detail-page">
            <div className="combined-wrapper">
                <section className="banner container cstm-mb">
                    <div className="banner-wrapper">
                        <div dangerouslySetInnerHTML={{ __html: heading }}></div>
                        <p>{sub_text}</p>

                        {buttonType == "applyNow" ? <button onClick={() => cardButtonClick(buttonType)} id="apply-now">{buttonText}</button> : null}
                        {buttonType == "eConnect" ? <button onClick={() => cardButtonClick(buttonType)} id="apply-now">{buttonText}</button> : null}
                        {buttonType == "instantApproval" ? <button onClick={() => cardButtonClick(buttonType)} id="apply-now">{buttonText}</button> : null}

                    </div>
                    <div>
                        {image ? <img className="banner-card" src={`${strapi.baseUrl}${image.url}`} alt={image.name} /> : null}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BankProductBanner