import { useEffect } from 'react'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'
import LearnMore from '../../../components/common/LearnMore'
import Offers from '../../../components/common/Offers'
import CreditScore from '../../../components/common/CreditScore';
import FinancialTools from '../../../components/common/FinancialTools';
import Rewards from '../../../components/common/Rewards';
import ThankYouBanner from '../../../components/common/ThankYouBanner';


const ThankYou = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {               
                // case 'blocks.learn-more':
                //     return <LearnMore key={block.id} data={block} />
                // case 'blocks.credit-score':
                //     return <CreditScore key={block.id} data={block} />
                // case 'blocks.offer':
                //     return <Offers key={block.id} data={block} />
                // case 'blocks.bank-new':
                //     return <Banks key={block.id} banks={block} />
                // case 'blocks.financial-tools':
                //     return <FinancialTools key={block.id} tools={block} />
                // case 'blocks.rewards':
                //     return <Rewards key={block.id} data={block} />           
                // case 'blocks.blogs':
                //     return <Blog key={block.id} data={block} />
                // case 'blocks.thank-you-banner':
                //     return <ThankYouBanner key={block.id} data={block} />
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
    const pageData = await strapi.processReq('GET', `pages?slug=credit-cards-${path}`)
    const data = pageData[0]
    return { props: { data, path } }
}

export default ThankYou