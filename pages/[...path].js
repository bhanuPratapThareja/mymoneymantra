import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import CreditScore from '../components/CreditScore'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import Rewards from '../components/Rewards'
import Offers from '../components/Offers'
import TrendingOffers from '../components/TrendingOffers'
import LearnMore from '../components/LearnMore'
import Blog from '../components/Blog'
import ShortExtendedForm from '../components/ShortExtendedForm';
import { getApiData } from '../api/api'

const Home = props => {
    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner':
                    return <Banner key={block.id} data={block} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block} />
                case 'blocks.banks':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.offer':
                    return <Offers key={block.id} data={block} />
                case 'blocks.trending-offers':
                    return <TrendingOffers key={block.id} data={block} trendingOffers={props.trendingOffers} />
                case 'blocks.blogs':
                    return <Blog key={block.id} data={block} />
                case 'blocks.learn-more':
                    return <LearnMore key={block.id} data={block} />
                case 'blocks.credit-score':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.short-form':
                    return <ShortExtendedForm key={block.id} data={block} />
            }
        })
    }

    return (
        <div className="credit-card-flow">
            {props ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    let props = {}
    let trendingOffers = null
    let trendingProductId = '5'
    const { url, body } = getApiData('offers')

    try {
        const res = await strapi.apiReq('POST', url, body)
        offersData = res.response.payload
    } catch {
    }

    try {
        trendingOffers = await strapi.processReq('GET', `products?_where[product_id]=${trendingProductId}`)
        trendingOffers = []
    } catch (err) {
    }

    try {
        const [path] = ctx.params.path
        const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
        const data = pageData[0]
        props = { data, path }
    } catch (err) {
    }

    return { props: { ...props, trendingOffers } }
}

export default Home