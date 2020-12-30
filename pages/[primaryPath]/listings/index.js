import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'

import ListingsBanner from '../../../components/Listings/ListingsBanner';
import OfferDetailCards from '../../../components/Listings/OfferDetailCards';
import CreditScore from '../../../components/common/CreditScore'
import Offers from '../../../components/common/Offers'
import BankSlider from '../../../components/common/BankSlider'
import Rewards from '../../../components/common/Rewards'
import FinancialTools from '../../../components/common/FinancialTools'
import Blogger from '../../../components/common/Blogger'
import LearnMore from '../../../components/common/LearnMore'

import { updateTrendingOffers, updateListingOffers, getProductDecision } from '../../../services/offersService'
import { filterOfferCardsInFilterComponent } from '../../../utils/loanListingFilterHandler'
import { getPrimaryPath, getSecondaryPath } from '../../../utils/getPaths'
import { getClassesForPage } from '../../../utils/classesForPage';

const PersonalLoanListing = props => {
    const router = useRouter()
    const [allOfferCards, setAllOfferCards] = useState([])
    const [offerCards, setOfferCards] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        // if (!props.data) {
        //     router.push('/page-not-found')
        //     return
        // }
        let cards = props.listingOfferCards
        console.log('cards: ', cards)
        getCardsWithButtonText(cards)
    }, [])

    const getCardsWithButtonText = async cards => {
        const newCards = await getProductDecision(cards)
        setOfferCards(newCards)
        setAllOfferCards(newCards)
    }

    const filterOfferCards = category => {
        const unFilteredCards = [...allOfferCards]
        if (category === 'all') {
            setOfferCards(unFilteredCards)
            return
        }
        let filteredOfferCards = unFilteredCards.filter(card => card.category === category)
        setOfferCards(filteredOfferCards)
    }

    const filterCardsFilterComponent = filters => {
        const unFilteredCards = [...allOfferCards]
        let filteredOfferCards = filterOfferCardsInFilterComponent(unFilteredCards, filters)
        setOfferCards(filteredOfferCards)
    }

    const getComponents = (dynamic, filters, primaryPath) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.listings-banner-component':
                    return <ListingsBanner
                        key={block.id}
                        data={block}
                        filters={filters}
                        numberOfCards={offerCards.length}
                        filterOfferCards={filterOfferCards}
                        filterCardsFilterComponent={filterCardsFilterComponent}
                    />
                case 'offers.listing-offers-credit-cards-compnent':
                case 'offers.listing-offers-personal-loan-compnent':
                case 'blocks.loan-listing-offer-details-component':
                    return <OfferDetailCards key={block.id} data={block} offerCards={offerCards} primaryPath={primaryPath} />
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

    return (
        <div className={props.pageClasses}>
            {props.data ? <Layout>
                {getComponents(props.data.dynamic, props.filters, props.primaryPath)}
            </Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const primaryPath = getPrimaryPath(ctx.resolvedUrl)
    const secondaryPath = getSecondaryPath(ctx.resolvedUrl)
    const pageClasses = getClassesForPage(primaryPath, secondaryPath)

    console.log(primaryPath, secondaryPath)

    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${secondaryPath}`)
    const listingFilter = await strapi.processReq('GET', `filters?slug=${primaryPath}-filters`)
    const filters = listingFilter && listingFilter.length ? listingFilter[0] : null
    const data = pageData[0]

    console.log(data)
    let listingOfferCards = []

    if(data){
        await updateTrendingOffers(data)
        listingOfferCards = await updateListingOffers(data)
    }

    return { props: { data, filters, listingOfferCards, pageClasses, primaryPath } }
}

export default PersonalLoanListing