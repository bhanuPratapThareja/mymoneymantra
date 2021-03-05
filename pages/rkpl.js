import { useEffect } from 'react'
import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import LongForm from '../components/common/LongForm'
import { clearLeadBank, clearLeadId } from '../utils/localAccess'

const RKPLBank = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
        clearLeadId()
        clearLeadBank()
    }, [])

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'form-components.long-form-component-new':
                    return <LongForm
                        key={block.id}
                        data={block}
                        primaryPath={props.primaryPath}
                        productType={props.productType}
                        preferredSelectionLists={props.preferredSelectionLists}
                    />
            }
        })
    }

    return (
        <div className="long-form">
            <div className="mobile-background"></div>
            {props.data ? <Layout>
                <section className="long-form-wrapper">
                    {getComponents(props.data.dynamic)}
                </section>
            </Layout> : null}

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const primaryPath = 'rkpl'
    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-long-form`)
    const data = pageData[0]
    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${'credit-cards'}`)
    const productType = productTypeData[0]
    const preferredSelectionLists = await strapi.processReq("GET", `list-preferences`)

    return { props: { data, preferredSelectionLists, primaryPath, productType } }

}

export default RKPLBank