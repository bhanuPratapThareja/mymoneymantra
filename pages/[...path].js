import Strapi from '../providers/strapi'
import Banner from '../components/Banner'
import PopularOffers from '../components/PopularOffers'
import CreditScore from '../components/CreditScore'
import TrendingOffers from '../components/TrendingOffers'
import Banks from '../components/Banks';
import Rewards from '../components/Rewards';
import Blog from '../components/Blog';
const Home = ({ data }) => {
    return (
        <>
            <Banner />
            <PopularOffers />
            <CreditScore />
            <TrendingOffers />
            <Banks />
            <Rewards />
            <Blog />
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
    return { props: {  } }
}

export default Home