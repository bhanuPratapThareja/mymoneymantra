import Strapi from '../providers/strapi'
import Banner from '../components/Banner'
import PopularOffers from '../components/PopularOffers'
import CreditScore from '../components/CreditScore'
import TrendingOffers from '../components/TrendingOffers'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import LearnMore from '../components/LearnMore'
import Rewards from '../components/Rewards'
import Blog from '../components/Blog'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import ShortExtendedForm from '../components/ShortExtendedForm'

const Home = ({ data }) => {

    // console.log('data: ', data)

    const getComponents = blocks => {
        console.log('inside ...path.js blocks',blocks);
        return blocks.length > 0
            ? blocks.map(block => {
                switch (block.__component) {
                    case 'blocks.product-banner':
                        return <Banner key={block.id} data={block.Banner} />
                    case 'blocks.financial-tools':

                        return <FinancialTools key={block.id} tools={block.tools} />
                    case 'blocks.rewards':
                        console.log('block.rewards',block);
                            return <Rewards key={block.id} rewards={block.rewards} />
                    case 'blocks.banks':
                        return <Banks key={block.id} banks={block.banks} />
                    case 'blocks.credit-score':
                        return <CreditScore key={block.id} scores={block} />
                }
            })
            : null;
    }
    // return (
    //     <>
    //         <Banner />
    //         <PopularOffers />
    //         <ShortExtendedForm />
    //         <CreditScore />
    //         <TrendingOffers />
    //         <Banks />
    //         <Rewards />
    //         <FinancialTools />
    //         <Blog />
    //         <LearnMore />
    //     </>
    // )


    return (
        <div className="combined-wrapper">
            <Layout>{getComponents(data.blocks)}</Layout>
            <Footer />
        </div>
    )
}

export async function getServerSideProps(props) {
    const strapi = new Strapi()
    const [path] = props.params.path
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]
    console.log('da: ', data)
    return { props: { data } }
}

export default Home