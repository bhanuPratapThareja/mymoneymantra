import { useEffect } from 'react'
import Strapi from '../../../../../providers/strapi'
import Layout from '../../../../../components/Layout'
import LongFormBanner from '../../../../../components/LongForm/LongFormBanner'
import { getPrimaryPath, getSecondaryPath } from '../../../../../utils/getPaths';


const LongFormProduct = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(props)
    })

    const getComponents = dynamic => {
        // console.log('dynamic: ', dynamic)
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.long-form-banner':
                    return <LongFormBanner key={block.id} data={block} />
            }
        })
    }

    return (
        <div className="listings">
            {props.data ? <Layout>{getComponents(props.data[0].dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const primaryPath = getPrimaryPath(ctx.resolvedUrl)
    const secondaryPath = getSecondaryPath(ctx.resolvedUrl)
    const { longFormBank, longFormProduct } = ctx.params

    const data = await strapi.processReq('GET', `pages?slug=${primaryPath}-long-form`)
    const bank = await strapi.processReq('GET', `bank?slug=${longFormBank}`)
    console.log('bank: ', bank)

    return { props: { data } }
}

export default LongFormProduct