import { useEffect } from 'react'
import Strapi from '../providers/strapi'
import Layout from '../components/Layout'

import ThankYouBanner from '../components/Banners/ThankYouBanner'
import CreditScore from '../components/common/CreditScore'
import TrendingOffers from '../components/common/TrendingOffers'
import BankSlider from '../components/common/BankSlider'
import Rewards from '../components/common/Rewards'
import FinancialTools from '../components/common/FinancialTools'
import Blogger from '../components/common/Blogger'
import LearnMore from '../components/common/LearnMore'

import { getClassesForPage } from '../utils/classesForPage'
import { getLeadId, getLeadBank } from '../utils/localAccess'

const ThankYouPage = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-thank-you':
                    return <ThankYouBanner
                        key={block.id}
                        data={block}
                        leadId={getLeadId(props.primaryPath)}
                        bank={getLeadBank()}
                        productType={props.productType}
                        primaryPath={props.primaryPath}
                    />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'offers.trending-offers-component':
                    return <TrendingOffers 
                        key={block.id} 
                        data={block}
                        primaryPath={props.primaryPath}
                        productType={props.productType}
                    />
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
        <div className={getClassesForPage(props.primaryPath, props.secondaryPath)}>
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx

    let { primaryPath } = query
    const secondaryPath = 'thank-you'

    if(!primaryPath) {
        primaryPath = 'credit-cards'
    }

    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${secondaryPath}`)
    const data = pageData && pageData.length ? pageData[0] : null
    console.log('primaryPath: ', primaryPath)
    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${primaryPath}`)
    const productType = productTypeData[0]
    console.log('productTypeDataLL ', productTypeData)
    console.log('productType ', productType)

    return { 
        props: { 
            data, primaryPath, secondaryPath, productType
        } 
    }
}

export default ThankYouPage