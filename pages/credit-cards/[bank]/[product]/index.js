import { useEffect, useState } from 'react'
import Router from 'next/router'
import Strapi from '../../../../providers/strapi'
import Layout from '../../../../components/Layout'
import OfferBankProductDetails from '../../../../components/Details/OfferBankProductDetails'
import BankProductBanner from '../../../../components/Details/BankProductBanner'
import CreditScore from '../../../../components/CreditScore'
import TrendingOffers from '../../../../components/TrendingOffers'
import Banks from '../../../../components/Banks'
import FinancialTools from '../../../../components/FinancialTools'
import Rewards from '../../../../components/Rewards'
import Blog from '../../../../components/Blog'
import LearnMore from '../../../../components/LearnMore'

const Details = props => {
    const [productBannerButton, setProductBannerButton] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)

    })

    const getProductDetailsComponents = (details, path) => {
        console.log('props: ', props)
        return details.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner':
                    return <BankProductBanner key={block.id} data={block} />
                case 'blocks.bank-product-details-cards':
                    return <OfferBankProductDetails key={block.id} data={block} />
                case 'blocks.credit-score':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.trending-offers':
                    return <TrendingOffers key={block.id} data={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block} path={path} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.blogs':
                    return <Blog key={block.id} data={block} />
                case 'blocks.learn-more':
                    return <LearnMore key={block.id} data={block} />
            }
        })
    }
    return (
        <div className="listings">
            {props.details ? <Layout>{getProductDetailsComponents(props.details[0].details_dynamic, props.path)}</Layout> : null}
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