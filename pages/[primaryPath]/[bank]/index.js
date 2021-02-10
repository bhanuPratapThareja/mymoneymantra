import { useEffect, useState } from 'react'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'
import PageNotFound from '../../../components/PageNotFound'

import DetailsBanner from '../../../components/Banners/DetailsBanner'
import ProductDetails from '../../../components/common/ProductDetails'
import CreditScore from '../../../components/common/CreditScore'
import Offers from '../../../components/common/Offers'
import BankSlider from '../../../components/common/BankSlider'
import Rewards from '../../../components/common/Rewards'
import FinancialTools from '../../../components/common/FinancialTools'
import Blogger from '../../../components/common/Blogger'
import LearnMore from '../../../components/common/LearnMore'
import LongFormBanner from '../../../components/Banners/LongFormBanner'
import LongForm from '../../../components/common/LongForm'
import { getClassesForPage } from '../../../utils/classesForPage'
import { setPrimaryPath, setProductType } from '../../../utils/localAccess'
import { getUnpackedProduct, extractTrendingOffers } from '../../../services/componentsService'
import { viewOffers, extractOffers } from '../../../services/offersService'

const Details = props => {
    const [page, setPage] = useState(props.page)
    const [previousPath, setPreviousPath] = useState('')
    const [trendingOffers, setTrendingOffers] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        setPreviousPath(page)
        setPrimaryPath(props.primaryPath)
        setProductType(props.productTypeData)

        window.onpopstate = () => {
            if (previousPath === 'details') {
                changePageType('details')
            }
        }
        getOffers()
    }, [page])


    const changePageType = page => {
        setPage(page)
        if(page === 'long-form') {
            setPreviousPath('details')
        }
    }

    const getOffers = async () => {
        // const { trendings } = await viewOffers()
        // console.log('trendings: ', trendings)
        // const trendingOffers = await extractOffers(trendings, productTypeId)
        // console.log('trendingOffers: ', trendingOffers)
        // setTrendingOffers(trendingOffers)
    }

    if (!props.productData) {
        return <PageNotFound />
    }

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-detail-banner-component':
                case 'banners.personal-loans-details-banner-component':
                case 'banners.home-loans-details-banner-component':
                    return <DetailsBanner
                        key={block.id}
                        data={block}
                        productData={props.productData}
                        primaryPath={props.primaryPath}
                        changePageType={changePageType}
                    />
                case 'blocks.credit-cards-details-component':
                case 'blocks.details-component':
                case 'blocks.home-loans-details':
                    return <ProductDetails
                        key={block.id}
                        data={block}
                        productData={props.productData}
                        primaryPath={props.primaryPath}
                    />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'offers.trending-offers-component':
                    return <Offers 
                        key={block.id} 
                        data={block}
                        offers={props.trendingOffers || []}
                        primaryPath={props.primaryPath} 
                    />
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
                case 'banners.long-form-banners-component':
                    return <LongFormBanner
                        key={block.id}
                        data={block}
                        productData={props.productData}
                        primaryPath={props.primaryPath}
                    />
                case 'form-components.long-form-component-new':
                    return <LongForm
                        key={block.id}
                        data={block}
                        productData={props.productData}
                        primaryPath={props.primaryPath}
                        preferredSelectionLists={props.preferredSelectionLists}
                    />
            }
        })
    }


    if (page === 'long-form') {
        if(!props.longFormData || !props.productData) {
            return <PageNotFound />
        }
        return (
            <div className={getClassesForPage('long-form')}>
                <div className="mobile-background"></div>
                {props.longFormData ? <Layout>
                    <section className="long-form-wrapper">
                        {getComponents(props.longFormData.dynamic)}
                    </section>
                </Layout> : null}

            </div>
        )
    } else {
        if(!props.detailsData || !props.productData) {
            return <PageNotFound />
        }
        return (
            <div className={getClassesForPage(props.primaryPath, 'details')}>
                {props.detailsData ? <Layout>{getComponents(props.detailsData.dynamic)}</Layout> : null}
            </div>
        )
    }

}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx

    let { primaryPath, bank: bankSlug, page } = query
    if (!page) {
        page = 'details'
    }

    const detailsPageData = await strapi.processReq('GET', `${primaryPath}-details-pages?slug=${bankSlug}`)
    const longFormPageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${bankSlug}-long-form`)
    const detailsData = detailsPageData && detailsPageData.length ? detailsPageData[0]  : null
    const longFormData = longFormPageData && longFormPageData.length ? longFormPageData[0] : null

    const productDataPacked = await strapi.processReq('GET', `product-v-2-s?product_type_v_2.slug=${primaryPath}&bank.slug=${bankSlug}`)
    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${primaryPath}`)
    const preferredSelectionLists = await strapi.processReq("GET", `list-preferences`)

    const productData = await getUnpackedProduct(productDataPacked)
    const trendingOffers = await extractTrendingOffers(detailsData)

    return {
        props: {
            detailsData, longFormData, productData, productTypeData, 
            preferredSelectionLists, page, primaryPath, trendingOffers
        }
    }
}

export default Details