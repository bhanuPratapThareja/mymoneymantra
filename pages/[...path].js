import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import CreditScore from '../components/CreditScore'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import Rewards from '../components/Rewards'
import Offers from '../components/Offers'
import LearnMore from '../components/LearnMore'

const Home = ({ data }) => {
    const getComponents = blocks => {
        console.log('blocks inside ...path',blocks);
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
                    case 'blocks.bank-new': 
                        return <Banks key={block.id} banks={block} />
                    case 'blocks.credit-score':
                        return <CreditScore key={block.id} data={block} />
                    case 'blocks.offer' :
                        return<Offers key={block.id} data={block} />
                    case 'blocks.learnMore' :
                            return<LearnMore key={block.id} data={block} />         
                }
            })
            : null;
    }

    return (
        <div className="credit-card-flow">
            {data ? <Layout>{getComponents(data.blocks)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(props) {
    const strapi = new Strapi()
    const [path] = props.params.path
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]
    console.log("--------path--------",data)
    return { props: { data } }
}

export default Home