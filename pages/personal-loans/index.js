import { useEffect } from 'react'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'
import PersonalLoanBanner from '../../components/PersonalLoan/PersonalLoanBanner'
import UspCards from '../../components/common/UspCards'
import Offers from '../../components/common/Offers'
import CreditScore from '../../components/common/CreditScore'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'
import { updatePopularOffers, updateTrendingOffers } from '../../services/offersService'

const PersonalLoan = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner-component':
                    return <PersonalLoanBanner key={block.id} data={block} />
                case 'blocks.ups-cards-component':
                    return <UspCards key={block.id} data={block} />
                case 'blocks.popular-offers-component':
                case 'blocks.pl-offers-component':
                    return <Offers key={block.id} data={block} />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                    case 'blocks.trending-offers':
                    case 'blocks.trending-personal-loans':
                    return <Offers key={block.id} data={block} />
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
        <div className="credit-card-flow personal-loan-flow">
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()

    const path = 'personal-loans'
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]

    await updatePopularOffers(data)
    await updateTrendingOffers(data)

    return { props: { data } }
}

export default PersonalLoan