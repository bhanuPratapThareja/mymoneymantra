// import Strapi from '../../providers/strapi'
// import Layout from '../../components/Layout'

// import CreditScore from '../../components/CreditScore';
// import Offers from '../../components/Offers'
// import Banks from '../../components/Banks';
// import Rewards from '../../components/Rewards';
// import FinancialTools from '../../components/FinancialTools';
// import Blog from '../../components/Blog';
// import LearnMore from '../../components/LearnMore'

// import ListingBanner from '../../components/Listing/ListingBanner'
// import ThankYouBanner from '../../components/ThankYou/ThankYouBanner'









// const ThankYou = ({ data }) => {

//     console.log(' inside thank you data: ', data)

//     const getComponents = blocks => {
//         console.log('inside thank-you ...path blocks',blocks);
//         return blocks.map(block => {
//             switch (block.__component) {
//                 case 'blocks.listing-banner':
//                     return <ListingBanner key={block.id} data={block} />

//                 case 'blocks.thankyou-banner':
//                     return <ThankYouBanner key={block.id} data={block} />
//                 case 'blocks.learn-more':
//                     return <LearnMore key={block.id} data={block} />
//                 case 'blocks.credit':
//                     return <CreditScore key={block.id} data={block} />
//                 case 'blocks.offer':
//                     return <Offers key={block.id} data={block} />
//                 case 'blocks.banks':
//                     return <Banks key={block.id} banks={block} />
//                 case 'blocks.bank-new':
//                     return <Banks key={block.id} banks={block} />
//                 case 'blocks.financial-tools':
//                     return <FinancialTools key={block.id} tools={block} />
//                 case 'blocks.rewards':
//                     return <Rewards key={block.id} rewards={block} />
//                 case 'blocks.bank-new':
//                     return <Banks key={block.id} banks={block} />
//                 case 'blocks.blogs':
//                     return <Blog key={block.id} data={block} />

//             }
//         })
//     }

//     return (
//         <div className="listings">
//             {data ? <Layout>{getComponents(data.blocks)}</Layout> : null}
//         </div>
//     )
// }

// export async function getServerSideProps(props) {
//     const strapi = new Strapi()
//     const [path] = props.params.path
//     console.log('inside thank you ..path.js  [path]', [path])
//     const pageData = await strapi.processReq('GET', `pages?slug=credit-cards-${path}`)
//     console.log('inside thank you ..path.js pageData', pageData)
//     const data = pageData[0]
//     return { props: { data } }
// }

// export default ThankYou