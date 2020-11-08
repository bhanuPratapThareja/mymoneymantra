import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import CreditScore from '../components/CreditScore'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import Rewards from '../components/Rewards'

const Home = ({ data }) => {

    const getComponents = blocks => {
        return blocks.length > 0
            ? blocks.map(block => {
                switch (block.__component) {
                    case 'blocks.product-banner':
                        return <Banner key={block.id} banner={block} />
                    case 'blocks.financial-tools':
                        return <FinancialTools key={block.id} tools={block} />
                    case 'blocks.rewards':
                            return <Rewards key={block.id} rewards={block} />
                    case 'blocks.banks':
                        return <Banks key={block.id} banks={block} />
                    case 'blocks.credit-score':
                        return <CreditScore key={block.id} scores={block} />
                }
            })
            : null;
    }

    return (
        <div className="combined-wrapper">
            <Layout>{getComponents(data.blocks)}</Layout>
        </div>
    )
}

export async function getServerSideProps(props) {
    const strapi = new Strapi()
    const [path] = props.params.path
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]
    return { props: { data } }
}

export default Home