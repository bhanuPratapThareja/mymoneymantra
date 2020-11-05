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
    return (
        <>
            <div className="combined-wrapper">
                <Layout><Banner /></Layout>
                <Layout><PopularOffers /></Layout>
                <Layout><ShortExtendedForm /></Layout>
                <Layout><CreditScore /></Layout>
                <Layout><TrendingOffers /></Layout>
                <Layout><Banks /></Layout>
                <Layout><Rewards /></Layout>
                <Layout><FinancialTools /></Layout>
                <Layout><Blog /></Layout>
                <Layout><LearnMore /></Layout>
                <Footer />
            </div>
        </>
    )
}


export async function getServerSideProps(props) {
    // console.log('props: ', props)
    // const strapi = new Strapi()
    // const { path } = props.params
    // console.log('PATH:: ', path)
    // const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    // // console.log('pageData:: ', pageData)
    // const data = pageData[0]
    // if (!data) {
    //     return
    // }
    // console.log('data:: ', data)
    return { props: {} }
}

export default Home