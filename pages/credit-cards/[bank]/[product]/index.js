import { useEffect, useState } from 'react'
import Strapi from '../../../../providers/strapi'
import Layout from '../../../../components/Layout'
import OfferBankProductDetails from '../../../../components/Details/OfferBankProductDetails';
import BankProductBanner from '../../../../components/Details/BankProductBanner';
import Router from 'next/router';

const Details = props => {
    const [buttonType, setButtonType] = useState('')
    const [buttonText, setButtonText] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        const {buttonType, buttonText } = Router.query
        if(buttonType && buttonText) {
            setButtonType(buttonType)
            setButtonText(buttonText)
        }
    })

    const getProductDetailsComponents = details => {
        return details.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner':
                    return <BankProductBanner key={block.id} data={block} buttonType={buttonType} buttonText={buttonText}  />
                case 'blocks.bank-product-details-cards':
                    return <OfferBankProductDetails key={block.id} data={block} />
            }
        })
    }
    return (
        <div className="listings">
            {props.details ? <Layout>{getProductDetailsComponents(props.details[0].details_dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const path = 'details'
    const { bank, product } = ctx.params
    const details = await strapi.processReq('GET', `bank-product-mappings?bank.slug=${bank}&product.slug=${product}`)

    return { props: { details, path } }
}

export default Details