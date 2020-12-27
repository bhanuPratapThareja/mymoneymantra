import { useEffect } from 'react'
import Router from 'next/router'
import Strapi from '../../../../providers/strapi'
import Layout from '../../../../components/Layout'
import OfferBankProductDetails from '../../../../components/Details/OfferBankProductDetails'
import BankProductBanner from '../../../../components/Details/BankProductBanner'
import { getOfferWithBank } from '../../../../services/offersService'
import { getPrimaryPath } from '../../../../Utils/getPaths';

const Details = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getProductDetailsComponents = (details, offer) => {
        return details.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner':
                    return <BankProductBanner key={block.id} data={block} offer={offer} />
                case 'blocks.bank-product-details-cards':
                    return <OfferBankProductDetails key={block.id} data={block} />
            }
        })
    }

    if (!props.details.length) {
        Router.push('/404', { query: { path: props.path } })
    }

    return (
        <div className="credit-card-flow c-detail-page personal-detail-flow">
            {props.details.length ? <Layout>{getProductDetailsComponents(props.details[0].details_dynamic, props.offer, props.bank)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { product } = ctx.params
    const details = await strapi.processReq('GET', `bank-product-mappings?card.slug=${product}`)
    const offer = await getOfferWithBank(details[0].card)
    return { props: { details, path, offer } }
}

export default Details