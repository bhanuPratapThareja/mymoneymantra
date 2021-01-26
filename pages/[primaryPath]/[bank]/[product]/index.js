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
import { getClassesForPage } from '../../../../utils/classesForPage'
import LongFormBanner from '../../../../components/Banners/LongFormBanner'
import LongForm from '../../../../components/common/LongForm'

const Details = props => {
    const router = useRouter()

    const [page, setPage] = useState(props.page)
    const [pageClasses, setPageClasses] = useState('')
    const [previousPath, setPreviousPath] = useState('')

    const [primaryPath] = useState(props.primaryPath)
    const [detailsData] = useState(props.detailsData)
    const [longFormData] = useState(props.longFormData)
    const [productData] = useState(props.productData)
    const [preferredBanks] = useState(props.preferredBanks)

    useEffect(() => {
        window.scrollTo(0, 0)
        let pageClasses = ''
        if (page === 'details') {
            pageClasses = getClassesForPage(primaryPath, page)
        } else if (page === 'long-form') {
            pageClasses = getClassesForPage(page)
        }

        setPreviousPath(page)
        window.onpopstate = () => {
            if (previousPath !== 'long-form') {
                setPage(previousPath)
            }
        }
        if(page === 'details' || page === 'long-form') {
            setPageClasses(pageClasses)
        }
    }, [page])


    const changePageType = page => {
        setPage(page)
    }

    if (page === 'long-form' && !longFormData) {
        if (typeof window !== 'undefined') {
            const { primaryPath } = router.query
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

    if (!page && !detailsData) {
        return null
    }

    const getComponents = (dynamic, productData) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-detail-banner-component':
                case 'banners.personal-loans-details-banner-component':
                case 'banners.home-loans-details-banner-component':
                    return <DetailsBanner
                        key={block.id}
                        data={block}
                        productData={productData}
                        changePageType={changePageType}
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
                case 'banners.long-form-banners-component':
                    return <LongFormBanner key={block.id} data={block} productData={productData} />
                case 'form-components.long-form-component-new':
                    return <LongForm key={block.id} data={block} productData={productData} preferredBanks={preferredBanks} />
            }
        })
    }


    if (page === 'long-form') {
        return (
            <div className={pageClasses}>
                <div className="mobile-background"></div>
                {longFormData.dynamic ? <Layout>
                    <section className="long-form-wrapper">
                        {getComponents(longFormData.dynamic, productData, preferredBanks)}
                    </section>
                </Layout> : null}

            </div>
        )
    } else {
        return (
            <div className={pageClasses}>
                {detailsData.dynamic ? <Layout>{getComponents(detailsData.dynamic, productData)}</Layout> : null}
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
    const preferredBanksData = await strapi.processReq("GET", `list-preferences`)

    const preferredBanks = preferredBanksData[0]

    return { props: { detailsData, longFormData, productData, preferredBanks, page, primaryPath } }
}

export default Details