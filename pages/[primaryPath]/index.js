import { useEffect } from 'react'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'

import CreditCardsBanner from '../../components/Pages/CreditCards/CreditCardsBanner'
import PersonalLoansBanner from '../../components/Pages/PersonalLoans/PersonalLoansBanner'
import HomeLoansBanner from '../../components/Pages/HomeLoans/HomeLoansBanner'

import UspCards from '../../components/common/UspCards'
import Offers from '../../components/common/Offers'
import CreditScore from '../../components/common/CreditScore'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import ShortExtendedForm from '../../components/common/ShortExtendedForm'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'
import { updatePopularOffers, updateTrendingOffers } from '../../services/offersService'
import { getClassesForPage } from '../../utils/classesForPage'
import { getDevice } from '../../utils/getDevice'

const PrimaryPage = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
        localStorage.clear()
    })

    const goToShortFormPage = () => {
        if (getDevice() === 'desktop') {
            window.scrollTo({ top: 1000 })
            return
        }
        window.scrollTo({ top: 0 })
    }

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-banner-component':
                    return <CreditCardsBanner key={block.id} data={block} goToShortFormPage={goToShortFormPage} />
                case 'banners.personal-loans-banner-component':
                    return <PersonalLoansBanner key={block.id} data={block} />
                case 'banners.home-loans-banner-component':
                    return <HomeLoansBanner key={block.id} data={block} />
                case 'blocks.ups-cards-component':
                    return <UspCards key={block.id} data={block} />
                case 'form-components.onboarding-short-form':
                    return <ShortExtendedForm key={block.id} data={block} />

                case 'offers.popular-offers-credit-cards-component':
                case 'offers.popular-offers-personal-loans-component':
                case 'offers.popular-offers-home-loans-component':
                case 'offers.trending-offer-cards':
                case 'offers.trending-offers-personal-loans':
                case 'blocks.popular-home-loan-cards':
                case 'offers.trending-offers-home-loans-component':
                    return <Offers key={block.id} data={block} goToShortFormPage={goToShortFormPage} />

                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.trending-offers':
                case 'blocks.trending-personal-loans':
                    return <Offers key={block.id} data={block} />
                case 'blocks.bank-slider-component':
                    return <BankSlider key={block.id} data={block} />
                case 'blocks.rewards-component':
                    return <Rewards key={block.id} data={block} goToShortFormPage={goToShortFormPage} />
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
    const primaryPath = query.primaryPath
    const pageClasses = getClassesForPage(primaryPath)

    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}`)
    const data = pageData && pageData.length ? pageData[0] : null

    if (data) {
        await updatePopularOffers(data)
        await updateTrendingOffers(data)
    }

    return { props: { data, pageClasses } }
}

export default PrimaryPage