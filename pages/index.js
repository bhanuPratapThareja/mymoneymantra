import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import HomePageBanner from '../components/HomePage/HomePageBanner'
import Testimonials from '../components/Testimonials'
import BuySection from '../components/BuySection'
import ProductType from '../components/ProductType'
import AboutUs from '../components/AboutUs'
import UspCards from '../components/UspCards'
import CreditScore from '../components/CreditScore'
import BankSlider from '../components/BankSlider'
import AppDownload from '../components/AppDownload'
import Rewards from '../components/Rewards'
import FinancialTools from '../components/FinancialTools'
import Blogger from '../components/Blogger'

const Home = props => {

    const getComponents = (dynamic) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner-component':
                    return <HomePageBanner key={block.id} data={block} />
                case 'blocks.statistics-component':
                    return <Testimonials key={block.id} data={block} />
                case 'blocks.find-and-compare-component':
                    return <BuySection key={block.id} data={block} />
                case 'blocks.home-product-type-component':
                    return <ProductType key={block.id} data={block} />
                case 'blocks.why-choose-money-mantra-component':
                    return <AboutUs key={block.id} data={block} />
                case 'blocks.ups-cards-component':
                    return <UspCards key={block.id} data={block} />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.bank-slider-component':
                    return <BankSlider key={block.id} data={block} />
                case 'blocks.app-download-component':
                    return <AppDownload key={block.id} data={block} />
                case 'blocks.rewards-component':
                    return <Rewards key={block.id} data={block} />
                case 'blocks.quick-financial-tools-component':
                    return <FinancialTools key={block.id} data={block} />
                case 'blocks.blogger':
                    return <Blogger key={block.id} data={block} />
            }
        })
    }
    return (
        <div className="credit-card-flow homepage-flow">
            {props ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const path = 'home-page'
    const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    const data = pageData[0]
    return { props: { data } }
}

export default Home