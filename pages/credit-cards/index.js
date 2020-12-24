import { useEffect } from 'react'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'
import Banner from '../../components/CreditCards/ProductBanner'
import UspCards from '../../components/common/UspCards'
import ShortExtendedForm from '../../components/ShortExtendedForm'
import Offers from '../../components/Offers'
import CreditScore from '../../components/common/CreditScore'
import TrendingOffers from '../../components/TrendingOffers'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'
import { updatePopularOffers, updateTrendingOffers } from '../../services/offersService'
import { getBasePath } from '../../Utils/getPaths'

const CreditCards = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = dynamic => {
        console.log(dynamic)
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner-component':
                    return <Banner key={block.id} data={block} />
                case 'blocks.ups-cards-component':
                    return <UspCards key={block.id} data={block} />
                case 'form-components.onboarding-short-form':
                    return <ShortExtendedForm key={block.id} data={block} />
                case 'blocks.popular-offers':
                    return <Offers key={block.id} data={block} />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.trending-offers':
                    return <TrendingOffers key={block.id} data={block} />
                case 'blocks.bank-slider-component':
                    return <BankSlider key={block.id} data={block} />
                case 'blocks.rewards-component':
                    return <Rewards key={block.id} data={block} />
                case 'blocks.quick-financial-tools-component':
                    return <FinancialTools key={block.id} data={block} />
                case 'blocks.blogger':
                    return <Blogger key={block.id} data={block} />
                case 'blocks.learn-more-component':
                    return <LearnMore key={block.id} data={block} />

            }
        })
    }

    return (
        <div className="credit-card-flow">
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const basePath = getBasePath(ctx.resolvedUrl)
    const pageData = await strapi.processReq('GET', `pages?slug=${basePath}`)
    const data = pageData[0]

    await updatePopularOffers(data)
    await updateTrendingOffers(data)

    return { props: { data } }
}

export default CreditCards