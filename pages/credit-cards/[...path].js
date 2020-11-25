import Strapi from '../../providers/strapi'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import ListingBanner from '../../components/Listing/ListingBanner'
import LongFormBanner from '../../components/LongForm/LongFormBanner'
import LearnMore from '../../components/LearnMore'
import Offers from '../../components/Offers'
import Banks from '../../components/Banks';
import CreditScore from '../../components/CreditScore';
import FinancialTools from '../../components/FinancialTools';
import Blog from '../../components/Blog';

import Rewards from '../../components/Rewards';
import ThankYouBanner from '../../components/ThankYou/ThankYouBanner';
import OfferDetailCards from '../../components/Listing/OfferDetailCards'

import OfferBankProductDetails from '../../components/BankProduct/OfferBankProductDetails';
import BankProductBanner from '../../components/BankProduct/BankProductBanner';
import ShortExtendedForm from '../../components/ShortExtendedForm';

const CreditCards = ({ data }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = dynamic => {
        return dynamic.map(block => {
            console.log(block)
            switch (block.__component) {
                case 'blocks.listing-banner':
                    return <ListingBanner key={block.id} data={block} />
                case 'blocks.offer-details-card':
                    return <OfferDetailCards key={block.id} data={block} />
                case 'blocks.long-form-banner':
                    return <LongFormBanner key={block.id} data={block} />
                case 'blocks.learn-more':
                    return <LearnMore key={block.id} data={block} />
                case 'blocks.credit':
                    return <CreditScore key={block.id} data={block} />
                case 'blocks.offer':
                    return <Offers key={block.id} data={block} />
                case 'blocks.banks':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.blogs':
                    return <Blog key={block.id} data={block} />
                case 'blocks.thank-you':
                    return <ThankYouBanner key={block.id} data={block} />
                case 'blocks.offer-card':
                    return <OfferDetailCards key={block.id} data={block} basePath={basePath} />
                case 'blocks.product-banner':
                    return <BankProductBanner key={block.id} data={block} />
                case 'blocks.bank-product-offer-details':
                    return <OfferBankProductDetails key={block.id} data={block} />
                case 'blocks.short-form':
                    return <ShortExtendedForm key={block.id} data={block} />
            }
        })
    }

    return (
        <div className="listings" data-aos-easing="ease" data-aos-duration="600" data-aos-delay="0">
            {data ? <Layout>{getComponents(data.dynamic)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const [path] = ctx.params.path
    const pageData = await strapi.processReq('GET', `pages?slug=credit-cards-${path}`)
    console.log('pageData: ', pageData)
    const data = pageData[0]
    return { props: { data, path } }
}

export default CreditCards