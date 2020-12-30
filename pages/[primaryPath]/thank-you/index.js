import { useEffect } from 'react'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'

import ThankYouBanner from '../../../components/common/ThankYouBanner'

import { updateTrendingOffers } from '../../../services/offersService'
import { getPrimaryPath, getSecondaryPath } from '../../../utils/getPaths'
import { getClassesForPage } from '../../../utils/classesForPage'

const ThankYou = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = (dynamic, primaryPath) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-thank-you':
                    return <ThankYouBanner key={block.id} data={block} primaryPath={primaryPath} />
            }
        })
    }

    return (
        <div className={props.pageClasses}>
            {props.data ? <Layout>{getComponents(props.data.dynamic, props.primaryPath)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const primaryPath = getPrimaryPath(ctx.resolvedUrl)
    const secondaryPath = getSecondaryPath(ctx.resolvedUrl)
    const pageClasses = getClassesForPage(primaryPath, secondaryPath)

    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${secondaryPath}`)
    const data = pageData[0]
    await updateTrendingOffers(data)

    return { props: { data, pageClasses, primaryPath } }
}

export default ThankYou