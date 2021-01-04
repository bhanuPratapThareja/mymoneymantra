import { useEffect } from 'react'
import Strapi from '../../../../../providers/strapi'
import Layout from '../../../../../components/Layout'
import LongFormBanner from '../../../../../components/LongForm/LongFormBanner'
import LongForm from '../../../../../components/common/LongForm'

const LongFormProduct = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.long-form-banner':
                    return <LongFormBanner key={block.id} data={block} />
                    
                case 'form-components.long-form-component':
                    return <LongForm 
                        key={block.id} 
                        data={block}
                    />
            }
        })
    }

    return (
        <div className="long-form">
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx
    const { primaryPath, longFormBank, longFormProduct } = query
    
    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-long-form`)
    const data = pageData[0]
    
    return { props: { data } }
}

export default LongFormProduct