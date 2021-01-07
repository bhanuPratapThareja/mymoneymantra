import { useEffect, useState } from 'react'
import Strapi from '../../../../../providers/strapi'
import Layout from '../../../../../components/Layout'
import LongFormBanner from '../../../../../components/LongForm/LongFormBanner'
import { getLongFormSearchParams, getDetailsSearchParams } from '../../../../../utils/searchParams'
import LongForm from '../../../../../components/common/LongForm'

const LongFormProduct = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })



    const getComponents = (dynamic, bank) => {
        console.log('dynamic: ', dynamic)
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.long-form-banner':
                    return <LongFormBanner
                        key={block.id}
                        data={block}
                        bank={bank}
                    />

                case 'form-components.long-form-component-new':
                    return <LongForm
                        key={block.id}
                        data={block}
                        bank={bank}
                    />
            }
        })
    }

    return (
        <div className="long-form">
            {props.data ? <Layout>
                <section className="long-form-wrapper">
                    {getComponents(props.data.dynamic, props.bank)}
                </section>
            </Layout> : null}

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx
    const { primaryPath, longFormBank, longFormProduct } = query

    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-long-form`)
    const bankData = await strapi.processReq('GET', `banks?slug=${longFormBank}`)

    const productSearch = getLongFormSearchParams(primaryPath, longFormProduct)

    console.log('productSearch: ', productSearch)
    const productData = await strapi.processReq('GET', `credit_card_products?product_type=${longFormProduct}`)

    // const productSearch = getDetailsSearchParams(primaryPath, longFormBank, longFormProduct)
    // const productData = await strapi.processReq('GET', productSearch)

    console.log('productData:: ', productData)
    const data = pageData[0]
    const bank = bankData[0]

    return { props: { data, bank } }
}

export default LongFormProduct