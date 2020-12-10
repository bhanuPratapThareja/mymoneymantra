import { useEffect } from 'react'
import Strapi from '../../../../../providers/strapi'
import Layout from '../../../../../components/Layout'
import LongFormBanner from '../../../../../components/LongForm/LongFormBanner'

const LongFormProduct = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
        
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.long-form-banner':
                    return <LongFormBanner key={block.id} data={block} />
            }
        })
    }

    return (
        <div className="listings">
            {props.data ? <Layout>{getComponents(props.data[0].details_dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const path = 'long-form'
    const { longFormBank, longFormProduct } = ctx.params
    const data = await strapi.processReq('GET', `bank-product-mappings?bank.slug=${longFormBank}&product.slug=${longFormProduct}`)

    return { props: { data, path } }
}

export default LongFormProduct