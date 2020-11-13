import Strapi from '../../providers/strapi'
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


import { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
const CreditCards = ({ data, basePath }) => {

    console.log('data: ', data)

    // useEffect(() => {
    //     window.scroll(0)
    // })

    const getComponents = blocks => {
        console.log('inside credit-catd ..path blocks', blocks);
        return blocks.map(block => {
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
                    return <OfferBankProductDetails key={block.id} data={block}/>
                
                



            }
        })
    }

    return (
        <div className="listings">
            {data ? <Layout>{getComponents(data.blocks)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(props) {
    const strapi = new Strapi()
    const [path] = props.params.path
    const pageData = await strapi.processReq('GET', `pages?slug=credit-cards-${path}`)
    console.log('inside pageData', pageData);
    const data = pageData[0]
    return { props: { data, basePath: path } }
}

export default CreditCards