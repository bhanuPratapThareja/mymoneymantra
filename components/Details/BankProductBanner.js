import Strapi from '../../providers/strapi'
import Router from 'next/router';
import { useEffect } from 'react';

const BankProductBanner = props => {
    const strapi = new Strapi()
    const { heading, image, sub_text, listing_offer_button } = props.data
    let buttonType;
    let buttonText;
    if(listing_offer_button) {
        buttonType = listing_offer_button.buttonType
        buttonText = listing_offer_button.buttonText
    }

    useEffect(()  => {
        console.log(Router.query)
    })

    const cardButtonClick = type => {
        const basePath = '/credit-cards'
        const { bank, product, bank_name } = Router.query
        let pathName = ''
        if (type == "eConnect" || type == 'instantApproval') {
            pathName = `${basePath}/long-form/${bank}/${product}`
        } else {
            pathName = `${basePath}/thank-you`
        }
        console.log(buttonType, buttonText)
        console.log('bank_name: ', bank_name)
        const query = { bank_name, buttonType, buttonText }
        routerRedirect(pathName, query)
    }

    const routerRedirect = (pathname, query) => {
        Router.push({ pathname, query }, pathname, { shallow: true })
    }

    return (
        <div className="credit-card-flow c-detail-page">
            <div className="combined-wrapper">
                <section className="banner container cstm-mb">
                    <div className="banner-wrapper">
                        <div dangerouslySetInnerHTML={{ __html: heading }}></div>
                        <p>{sub_text}</p>
                        <button onClick={() => cardButtonClick(buttonType)} id="apply-now">{buttonText}</button>
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