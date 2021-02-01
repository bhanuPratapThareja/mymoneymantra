import { useEffect, useState } from 'react'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'

import ThankYouBanner from '../../components/Banners/ThankYouBanner'
import CreditScore from '../../components/common/CreditScore'
import Offers from '../../components/common/Offers'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'

import { updateTrendingOffers } from '../../services/offersService'
import { getClassesForPage } from '../../utils/classesForPage'
import { getPrimaryPath, getLeadId, getLeadBank } from '../../utils/localAccess'

const ThankYouPage = props => {
    const [primaryPath, setPrimaryPath] = useState('')
    const [leadId, setLeadId] = useState('')
    const [bankName, setBankName] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        setPrimaryPath(getPrimaryPath())
        setLeadId(getLeadId())
        const bank = getLeadBank()
        setBankName(bank.bankName)
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-thank-you':
                    return <ThankYouBanner 
                        key={block.id} 
                        data={block} 
                        primaryPath={primaryPath}
                        leadId={leadId}
                        bankName={bankName}
                    />
                
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'offers.trending-offer-cards':
                case 'offers.trending-offers-personal-loans':
                case 'blocks.trending-home-loan-component':

                    if(!props.primaryPath || props.primaryPath === 'rkpl') {
                        return null
                    }

                    return <Offers key={block.id} data={block} primaryPath={props.primaryPath} />
                
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
        <div className={props.pageClasses}>
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx
   
    let { primaryPath } = query
    const secondaryPath = 'thank-you'
    const pageClasses = getClassesForPage(!primaryPath || primaryPath === 'rkpl' ? 'credit-cards' : primaryPath)

    const pageData = await strapi.processReq('GET', `pages?slug=${!primaryPath || primaryPath === 'rkpl' ? 'credit-cards' : primaryPath}-${secondaryPath}`)
    const data = pageData[0]

    if(primaryPath && primaryPath !== 'rkpl') {
        await updateTrendingOffers(data)
    }

    primaryPath = primaryPath ? primaryPath : null

    return { props: { data, pageClasses, primaryPath } }
}

export default ThankYouPage