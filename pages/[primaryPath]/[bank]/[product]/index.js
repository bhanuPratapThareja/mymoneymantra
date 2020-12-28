import { useEffect } from 'react'
import Router from 'next/router'
import Strapi from '../../../../providers/strapi'
import Layout from '../../../../components/Layout'

import DetailsBanner from '../../../../components/common/DetailsBanner'
import ProductDetails from '../../../../components/common/ProductDetails'
import CreditScore from '../../../../components/common/CreditScore'
import Offers from '../../../../components/common/Offers'
import BankSlider from '../../../../components/common/BankSlider'
import Rewards from '../../../../components/common/Rewards'
import FinancialTools from '../../../../components/common/FinancialTools'
import Blogger from '../../../../components/common/Blogger'
import LearnMore from '../../../../components/common/LearnMore'

import { updateTrendingOffers } from '../../../../services/offersService'
import { getClassesForPage } from '../../../../utils/classesForPage'
import { getDetailsSearchParams } from '../../../../utils/getPaths'

const Details = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getProductDetailsComponents = (dynamic, primaryPath, bankData, creditCardProductData, personalLoanProductData) => {
        console.log('dynamic: ', dynamic)
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.credit-cards-detail-banner-component':
                case 'banners.personal-loans-details-banner-component':
                    return <DetailsBanner
                        key={block.id}
                        data={block}
                        bank={bankData}
                        product={creditCardProductData || personalLoanProductData}
                    />
                case 'blocks.credit-cards-details-component':
                case 'blocks.details-component':
                    return <ProductDetails
                        key={block.id}
                        data={block}
                        bank={bankData}
                        product={creditCardProductData || personalLoanProductData}
                        primaryPath={primaryPath}
                    />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
                case 'offers.trending-offer-cards':
                case 'offers.trending-offers-personal-loans':
                    return <Offers key={block.id} data={block} primaryPath={primaryPath} />
                case 'blocks.bank-slider-component':
                    return <BankSlider key={block.id} data={block} />
                case 'blocks.rewards-component':
                    return <Rewards key={block.id} data={block} />
                case 'blocks.quick-financial-tools-component':
                    return <FinancialTools key={block.id} data={block} />
                case 'blocks.blogger':
                    return <Blogger key={block.id} data={block} />
                case 'blocks.learn-more-component':
                    return <LearnMore key={block.id} data={block} />
            }
        })
    }

    if (!props.details || !props.details.dynamic) {
        Router.push('/page-not-found')
    }

    const { details, primaryPath, bankData, creditCardProductData, personalLoanProductData } = props

    return (
        <div className={props.pageClasses}>
            {details.dynamic ? <Layout>{getProductDetailsComponents(details.dynamic, primaryPath, bankData, creditCardProductData, personalLoanProductData)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { primaryPath, bank, product } = ctx.params
    const pageClasses = getClassesForPage(primaryPath, 'details')
    const search = getDetailsSearchParams(primaryPath, bank, product)

    const detailsData = await strapi.processReq('GET', search)
    const details = detailsData[0]
    const bankData = details.bank
    const creditCardProductData = details.credit_card_product ? details.credit_card_product : null
    const personalLoanProductData = details.personal_loan_product ? details.personal_loan_product : null

    await updateTrendingOffers(details)

    return { props: { details, primaryPath, pageClasses, bankData, creditCardProductData, personalLoanProductData } }
}

export default Details