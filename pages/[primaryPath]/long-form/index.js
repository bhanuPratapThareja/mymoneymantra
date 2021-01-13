import { useEffect } from 'react'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'

const LongForm = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.long-form-banner':
                    return null
                 
            }
        })
    }

    if(!props.data) {
        return null
    }

    return (
        <div className="listings">
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const path = 'long-form'
    const pageData = await strapi.processReq('GET', `pages?slug=credit-cards-${path}`)
    const data = pageData[0]
    return { props: { data: null } }
}

export default LongForm