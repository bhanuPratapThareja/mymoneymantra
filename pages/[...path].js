import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import CreditScore from '../components/CreditScore'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import Rewards from '../components/Rewards'
import PopularOffers from '../components/PopularOffers'

const Home = props => {

    const getComponents = blocks => {
        return blocks.map(block => {
            switch (block.__component) {
                case 'blocks.banner':
                    return <PopularOffers />
                    // return <Banner key={block.id} data={block} basePath={props.basePath} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block} />
                case 'blocks.banks':
                    return <Banks key={block.id} data={block} />
                case 'blocks.credit-score':
                    return <CreditScore key={block.id} data={block} />
            }
        })
    }

    return (
        <>
            {props ? <div className="credit-card-flow">
                <Layout>{getComponents(props.data.blocks)}</Layout>
            </div> : null}
        </>
    )
}

export async function getServerSideProps(props) {
    const strapi = new Strapi()
    const [path] = props.params.path
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]
    console.log('checking data: ', data)
    return { props: { data, basePath: path } }
}

export default Home