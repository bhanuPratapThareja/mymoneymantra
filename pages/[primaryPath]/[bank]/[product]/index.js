import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
import LongFormBanner from '../../../../components/Banners/LongFormBanner'
import LongForm from '../../../../components/common/LongForm'
import { getClassesForPage } from '../../../../utils/classesForPage'
import { setPrimaryPath, setProductType, clearLeadBank } from '../../../../utils/localAccess'

const Details = props => {
    const router = useRouter()
    const [page, setPage] = useState(props.page)
    const [previousPath, setPreviousPath] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        setPrimaryPath(props.primaryPath)
        setProductType(props.productTypeData)
        setPreviousPath(page)
        clearLeadBank()
        window.onpopstate = () => {
            if (previousPath !== 'long-form') {
                setPage(previousPath)
            }
        }
    }, [page])

    const changePageType = page => {
        setTimeout(() => {
            setPage(page)
        }, 2500)
    }

    if (page === 'long-form' && !props.longFormData) {
        if (typeof window !== 'undefined') {
            const { primaryPath } = props
            const pathname = `/${primaryPath}`
            router.push({ pathname })
            return <div className="interim-class">
                <div className="page-not-found_center_msg">
                    <h2>Page Not Found</h2>
                    <p>redirecting to {primaryPath.split('-').join(' ').slice(0, -1)} page ...</p>
                </div>
            </div>
        }
    }

    if (!page && !props.detailsData) {
        return null
    }

    const getComponents = dynamic => {
        console.log(props.productData)
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
                        primaryPath={props.primaryPath}
                        productData={props.productData}
                    />

                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'offers.trending-offers-component':
                    return <Offers key={block.id} data={block} primaryPath={props.primaryPath} />
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
                                primaryPath={props.primaryPath} 
                                productData={props.productData} 
                            />
                case 'form-components.long-form-component-new':
                    return <LongForm 
                                key={block.id}
                                data={block}
                                primaryPath={props.primaryPath}
                                productData={props.productData} 
                                preferredSelectionLists={props.preferredSelectionLists}
                            />
            }
        })
    }


    if (page === 'long-form') {
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

    let { primaryPath, bank: bankSlug, product: productSlug, page } = query
    if (!page) {
        page = 'details'
    }

    const detailsPageData = await strapi.processReq('GET', `${primaryPath}-details-pages?slug=${productSlug}`)
    const longFormPageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${bankSlug}-long-form`)
    const detailsData = detailsPageData ? detailsPageData[0] : null
    const longFormData = longFormPageData ? longFormPageData[0] : null

    const productData = await strapi.processReq('GET', `product-v-2-s?slug=${productSlug}`)
    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${primaryPath}`)
    const preferredSelectionLists = await strapi.processReq("GET", `list-preferences`)

    return {
        props: {
            detailsData, longFormData, productData, productTypeData, 
            preferredSelectionLists, page, primaryPath
        }
    }
}

export default Details