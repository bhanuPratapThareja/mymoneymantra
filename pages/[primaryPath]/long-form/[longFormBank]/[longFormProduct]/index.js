import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Strapi from '../../../../../providers/strapi'
import Layout from '../../../../../components/Layout'
import LongFormBanner from '../../../../../components/Banners/LongFormBanner'
import LongForm from '../../../../../components/common/LongForm'

const LongFormProduct = props => {
    const router = useRouter()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = (dynamic, productData, preferredBanks) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.long-form-banners-component':
                    return <LongFormBanner key={block.id} data={block} productData={productData} />
                case 'form-components.long-form-component-new':
                    return <LongForm key={block.id} data={block} productData={productData} preferredBanks={preferredBanks} />
            }
        })
    }

    if (!props.data || !props.productData) {
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

    return (
        <div className="long-form">
            <div className="mobile-background"></div>
            {props.data ? <Layout>
                <section className="long-form-wrapper">
                    {getComponents(props.data.dynamic, props.productData, props.preferredBanks)}
                </section>
            </Layout> : null}

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx
    const { primaryPath, longFormBank, longFormProduct } = query
    let data
    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${longFormBank}-long-form`)
    
    if (!pageData.length) {
        return { props: { data: null } }
    }

    data = pageData[0]
    const productData = await strapi.processReq('GET', `product-v-2-s?slug=${longFormProduct}`)
    const preferredBanksData = await strapi.processReq("GET", `list-preferences`)
    const preferredBanks = preferredBanksData[0]

    return { props: { data, productData, preferredBanks } }
}

export default LongFormProduct