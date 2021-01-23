import { useEffect } from 'react'
import Strapi from '../../../../providers/strapi'
import Layout from '../../../../components/Layout'

import DetailsBanner from '../../../../components/Banners/DetailsBanner'
import ProductDetails from '../../../../components/common/ProductDetails'
import CreditScore from '../../../../components/common/CreditScore'
import Offers from '../../../../components/common/Offers'
import BankSlider from '../../../../components/common/BankSlider'
import Rewards from '../../../../components/common/Rewards'
import FinancialTools from '../../../../components/common/FinancialTools'
import Blogger from '../../../../components/common/Blogger'
import LearnMore from '../../../../components/common/LearnMore'
import { getClassesForPage } from '../../../../utils/classesForPage'

const Details = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getProductDetailsComponents = (dynamic, productData) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-detail-banner-component':
                case 'banners.personal-loans-details-banner-component':
                case 'banners.home-loans-details-banner-component':
                    return <DetailsBanner
                        key={block.id}
                        data={block}
                        productData={productData}
                    />

                case 'blocks.credit-cards-details-component':
                case 'blocks.details-component':
                case 'blocks.home-loans-details':
                    return <ProductDetails
                        key={block.id}
                        data={block}
                        productData={productData}
                    />

                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'offers.trending-offers-component':
                    return <Offers key={block.id} data={block} />
                case 'blocks.bank-slider-component':
                    return <BankSlider key={block.id} data={block} />
                case 'blocks.rewards-component':
                    return <Rewards key={block.id} data={block} />
                case 'blocks.quick-financial-tools-component':
                    return <FinancialTools key={block.id} data={block} />
                case 'blocks.blogger':
                    return <Blogger key={block.id} data={block} />
                case 'blocks.learn-more-component':
                    return <LearnMore key={block.id} data={block} />
            }
        })
    }

    return (
        <div className={props.pageClasses}>
            {props.data.dynamic ? <Layout>{getProductDetailsComponents(props.data.dynamic, props.productData)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx
    const { primaryPath, product: productSlug } = query
    const pageClasses = getClassesForPage(primaryPath, 'details')

    const pageData = await strapi.processReq('GET', `${primaryPath}-details-pages?slug=${productSlug}`)
    const data = pageData[0]

    const productData = await strapi.processReq('GET', `product-v-2-s?slug=${productSlug}`)

    return { props: { data, pageClasses, productData } }
}

export default Details