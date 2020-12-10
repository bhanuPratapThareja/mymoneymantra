import Strapi from '../../providers/strapi'
import Router from 'next/router';
import { useEffect } from 'react';

const BankProductBanner = props => {
    const strapi = new Strapi()
    const { button, heading, image, sub_text } = props.data
    const { buttonType, buttonText } = props

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
                        <img className="banner-card" src={`${strapi.baseUrl}${image.url}`} alt={image.name} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BankProductBanner;