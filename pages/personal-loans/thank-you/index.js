import { useEffect } from 'react'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'
import ThankYouBanner from '../../../components/common/ThankYouBanner'
import CreditScore from '../../../components/common/CreditScore'
import BankSlider from '../../../components/common/BankSlider'
import Rewards from '../../../components/common/Rewards'
import FinancialTools from '../../../components/common/FinancialTools'
import Blogger from '../../../components/common/Blogger'
import LearnMore from '../../../components/common/LearnMore'

const ThankYou = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.than-you-banner-component':
                    return <ThankYouBanner key={block.id} data={block} />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
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
        <div className="listings">
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const path = 'thank-you'
    const pageData = await strapi.processReq('GET', `pages?slug=personal-loans-${path}`)
    const data = pageData[0]
    return { props: { data } }
}

export default ThankYou