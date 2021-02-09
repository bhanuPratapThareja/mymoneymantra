import { useEffect, useState } from 'react'
import Strapi from '../providers/strapi'
import Layout from '../components/Layout'

import ThankYouBanner from '../components/Banners/ThankYouBanner'
import CreditScore from '../components/common/CreditScore'
import Offers from '../components/common/Offers'
import BankSlider from '../components/common/BankSlider'
import Rewards from '../components/common/Rewards'
import FinancialTools from '../components/common/FinancialTools'
import Blogger from '../components/common/Blogger'
import LearnMore from '../components/common/LearnMore'

import { getClassesForPage } from '../utils/classesForPage'
import { getLeadId, getLeadBank, getProductType } from '../utils/localAccess'
import { extractTrendingOffers } from '../services/componentsService'
import { viewOffers, extractOffers } from '../services/offersService'

const ThankYouPage = props => {

    const [leadId, setLeadId] = useState('')
    const [bank, setBank] = useState('')
    const [productType, setProductType] = useState('')
    const [trendingOffers, setTrendingOffers] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        setLeadId(getLeadId())
        setBank(getLeadBank())
        setProductType(getProductType())
        getOffers()
    }, [])

    const getOffers = async () => {
        // const { trendings } = await viewOffers()
        // console.log('trendings: ', trendings)
        // const trendingOffers = await extractOffers(trendings, productTypeId)
        // console.log('trendingOffers: ', trendingOffers)
        // setTrendingOffers(trendingOffers)
    }

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-thank-you':
                    return <ThankYouBanner
                        key={block.id}
                        data={block}
                        leadId={leadId}
                        bank={bank}
                        productType={productType}
                    />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'offers.trending-offers-component':
                    return <Offers 
                        key={block.id} 
                        data={block} 
                        offers={props.trendingOffers || []}
                        primaryPath={props.primaryPath} 
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

    const trendingOffers = await extractTrendingOffers(data)

    return { 
        props: { 
            data, primaryPath, secondaryPath, trendingOffers
        } 
    }
}

export default ThankYouPage