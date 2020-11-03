import Strapi from '../providers/strapi'

const Home = () => {
    
    return (
        <></>
    )
}

export async function getServerSideProps(props) {
    console.log('Home Loan Page')
    const strapi = new Strapi()
    const { path } = props.params
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]
    return { props: { data } }
}

export default Home