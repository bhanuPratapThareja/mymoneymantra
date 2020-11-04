import Strapi from '../providers/strapi'
import Banner from '../components/Banner'
import PopularOffers from '../components/PopularOffers'
import CreditScore from '../components/CreditScore'

const Home = ({ data }) => {
    return (
        <>
            <Banner />
            <PopularOffers />
            <CreditScore />
        </>
    )
}


export async function getServerSideProps(props) {
    // console.log('props: ', props)
    const strapi = new Strapi()
    const { path } = props.params
    console.log('PATH:: ', path)
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    // console.log('pageData:: ', pageData)
    const data = pageData[0]
    if (!data) {
        return
    }
    // console.log('data:: ', data)
    return { props: { data } }
}

export default Home