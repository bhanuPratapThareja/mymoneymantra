import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import HomePageBanner from '../components/Banners/HomePageBanner'
import Testimonials from '../components/common/Testimonials'
import BuySection from '../components/common/BuySection'
import ProductType from '../components/common/ProductTypes'
import AboutUs from '../components/common/AboutUs'
import UspCards from '../components/common/UspCards'
import CreditScore from '../components/common/CreditScore'
import BankSlider from '../components/common/BankSlider'
import AppDownload from '../components/common/AppDownload'
import Rewards from '../components/common/Rewards'
import FinancialTools from '../components/common/FinancialTools'
import Blogger from '../components/common/Blogger'

import { getClassesForPage } from '../utils/classesForPage'

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
        <div className={props.pageClasses}>
            {props ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const primaryPath = 'home-page'
    const pageClasses = getClassesForPage(primaryPath)

    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}`)
    const data = pageData[0]

    return { props: { data, pageClasses } }
}

export default Home