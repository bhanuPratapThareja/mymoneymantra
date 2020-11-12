import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import CreditScore from '../components/CreditScore'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import Rewards from '../components/Rewards'
import Offers from '../components/Offers'
import LearnMore from '../components/LearnMore'
import Blog from '../components/Blog'

const Home = props => {
    const getComponents = blocks => {
        return blocks.map(block => {
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
                    case 'blocks.credit-score':
                        return <CreditScore key={block.id} data={block} />
                    case 'blocks.offer' :
                        return<Offers key={block.id} data={block} />
                    case 'blocks.blogs' : 
                        return <Blog key={block.id} data={block} />
                    case 'blocks.learn-more' :
                        return<LearnMore key={block.id} data={block} />  
                    case 'blocks.credit' :
                        return<CreditScore key={block.id} data={block} />
                }
            })
    }

    return (
        <div className="credit-card-flow">
            {props ? <Layout>{getComponents(props.data.blocks)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(props) {
    const strapi = new Strapi()
    const [path] = props.params.path
    console.log('path::', path)
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]
    return { props: { data } }
}

export default Home