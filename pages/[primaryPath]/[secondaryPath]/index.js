const BankPath = () => {
    return <></>
}

export default BankPath

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import Strapi from '../../../providers/strapi'
// import Layout from '../../../components/Layout'

// import CreditScore from '../../../components/common/CreditScore'
// import Offers from '../../../components/common/Offers'
// import BankSlider from '../../../components/common/BankSlider'
// import Rewards from '../../../components/common/Rewards'
// import FinancialTools from '../../../components/common/FinancialTools'
// import Blogger from '../../../components/common/Blogger'
// import LearnMore from '../../../components/common/LearnMore'

// import { getPrimaryPath, getSecondaryPath } from '../../../utils/getPaths'
// import { getClassesForPage } from '../../../utils/classesForPage'
// import { updateTrendingOffers, updateListingOffers, getProductDecision } from '../../../services/offersService'

// const SecondaryPage = props => {

//     useEffect(() => {
//         window.scrollTo(0, 0)
//     }, [])

//     const getComponents = (dynamic, primaryPath) => {
//         return dynamic.map(block => {
//             switch (block.__component) {
//                 case 'blocks.credit-score-component':
//                     return <CreditScore key={block.id} data={block} />
//                 case 'offers.trending-offer-cards':
//                 case 'offers.trending-offers-personal-loans':
//                 case 'blocks.trending-home-loan-component':
//                     return <Offers key={block.id} data={block} primaryPath={primaryPath} />
//                 case 'blocks.bank-slider-component':
//                     return <BankSlider key={block.id} data={block} />
//                 case 'blocks.rewards-component':
//                     return <Rewards key={block.id} data={block} />
//                 case 'blocks.quick-financial-tools-component':
//                     return <FinancialTools key={block.id} data={block} />
//                 case 'blocks.blogger':
//                     return <Blogger key={block.id} data={block} />
//                 case 'blocks.learn-more-component':
//                     return <LearnMore key={block.id} data={block} />
//             }
//         })
//     }

//     return (
//         <div className={props.pageClasses}>
//             {/* {props.data ? <Layout>{getComponents(props.data.dynamic, props.filters, props.primaryPath)}</Layout> : null} */}
//         </div>
//     )
// }

// export async function getServerSideProps(ctx) {
//     const strapi = new Strapi()
//     const primaryPath = getPrimaryPath(ctx.resolvedUrl)
//     const secondaryPath = getSecondaryPath(ctx.resolvedUrl)
//     const pageClasses = getClassesForPage(primaryPath, secondaryPath)

//     const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${secondaryPath}`)
//     const listingFilter = await strapi.processReq('GET', `filters?slug=${primaryPath}-filters`)
//     const filters = listingFilter && listingFilter.length ? listingFilter[0] : null
//     const data = pageData[0]
//     let listingOfferCards = []

//     if (data) {
//         await updateTrendingOffers(data)
//         listingOfferCards = await updateListingOffers(data)
//     }

//     return { props: { data, filters, listingOfferCards, pageClasses, primaryPath } }
// }

// export default SecondaryPage