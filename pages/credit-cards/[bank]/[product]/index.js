import Strapi from '../../../../providers/strapi'
import { useEffect } from 'react'
import Layout from '../../../../components/Layout'
import LearnMore from '../../../../components/LearnMore'
import Offers from '../../../../components/Offers'
import Banks from '../../../../components/Banks';
import CreditScore from '../../../../components/CreditScore';
import FinancialTools from '../../../../components/FinancialTools';
import Blog from '../../../../components/Blog';
import Rewards from '../../../../components/Rewards';
import OfferBankProductDetails from '../../../../components/Details/OfferBankProductDetails';
import BankProductBanner from '../../../../components/Details/BankProductBanner';

const CreditCards = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = (dynamic, details) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.bank-product-details-cards':
                    return <OfferBankProductDetails key={block.id} data={block} details={details} />
                case 'blocks.credit-score':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.offer':
                    return <Offers key={block.id} data={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block} />
                case 'blocks.blogs':
                    return <Blog key={block.id} data={block} />
                case 'blocks.product-banner':
                    return <BankProductBanner key={block.id} data={block} />
                case 'blocks.learn-more':
                    return <LearnMore key={block.id} data={block} />
            }
        })
    }

    return (
        <div className="listings">
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const path = 'details'
    const { bank, product } = ctx.params

    const details = await strapi.processReq('GET', `bank-product-mappings?bank.slug=${bank}&product.slug=${product}`)

    console.log('details:: ', details)

    const pageData = await strapi.processReq('GET', `pages?slug=credit-cards-${path}`)
    const data = pageData[0]
    return { props: { data, path, details } }
}

export default CreditCards