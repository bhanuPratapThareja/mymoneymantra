import { useEffect } from 'react'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'
import ListingBanner from '../../../components/Listing/ListingBanner'
import LearnMore from '../../../components/LearnMore'
import Offers from '../../../components/Offers'
import Banks from '../../../components/Banks';
import CreditScore from '../../../components/CreditScore';
import FinancialTools from '../../../components/FinancialTools';
import Blog from '../../../components/Blog';
import Rewards from '../../../components/Rewards';
import OfferDetailCards from '../../../components/Listing/OfferDetailCards'

const LoanListing = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = (dynamic, filters) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.listing-banner':
                    return <ListingBanner key={block.id} data={block} filters={filters} />
                case 'blocks.offer-details-card':
                    return <OfferDetailCards key={block.id} data={block} />
                case 'blocks.learn-more':
                    return <LearnMore key={block.id} data={block} />
                case 'blocks.credit-score':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.offer':
                    return <Offers key={block.id} data={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} data={block} />
                case 'blocks.blogs':
                    return <Blog key={block.id} data={block} />
                case 'blocks.offer-card':
                    return <OfferDetailCards key={block.id} data={block} />
            }
        })
    }

    return (
        <div className="listings">
            {props.data ? <Layout>{getComponents(props.data.dynamic, props.filters)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    console.log('loan listing ctx: ', ctx)
    const strapi = new Strapi()
    const path = 'loan-listing'
    const pageData = await strapi.processReq('GET', `pages?slug=credit-cards-${path}`)
    const listingFilter = await strapi.processReq('GET', 'filters')
    const filters = listingFilter.length ? listingFilter[0] : null
    const data = pageData[0]
    return { props: { data, filters } }
}

export default LoanListing