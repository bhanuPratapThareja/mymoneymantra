import { useEffect, useState } from 'react'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'

import ListingBanner from '../../../components/Listing/ListingBanner';
import OfferDetailCards from '../../../components/Listing/OfferDetailCards';
import CreditScore from '../../../components/common/CreditScore'
import BankSlider from '../../../components/common/BankSlider'
import Rewards from '../../../components/common/Rewards'
import FinancialTools from '../../../components/common/FinancialTools'
import Blogger from '../../../components/common/Blogger'
import LearnMore from '../../../components/common/LearnMore'

import { updateOfferCards } from '../../../Utils/loanListingCards'
import { getProductDecision } from '../../../services/offersService'
import { filterOfferCardsInFilterComponent } from '../../../Utils/loanListingFilterHandler'
import { getBasePath, getFirstPath } from '../../../Utils/getPaths'

const PersonalLoanListing = props => {
    const [allOfferCards, setAllOfferCards] = useState([])
    const [offerCards, setOfferCards] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        let cards = props.listingOfferCards
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

    const getComponents = (dynamic, filters) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.listing-banner-component':
                    return <ListingBanner
                        key={block.id}
                        data={block}
                        filters={filters}
                        numberOfCards={offerCards.length}
                        filterOfferCards={filterOfferCards}
                        filterCardsFilterComponent={filterCardsFilterComponent}
                    />
                case 'blocks.listing-offers-component':
                case 'blocks.listing-cards-features-component':
                    return <OfferDetailCards key={block.id} data={block} offerCards={offerCards} />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />
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
        <div className="listings">
            {props.data ? <Layout>{getComponents(props.data.dynamic, props.filters)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const basePath = getBasePath(ctx.resolvedUrl)
    const firstPath = getFirstPath(ctx.resolvedUrl)
    const pageData = await strapi.processReq('GET', `pages?slug=${basePath}-${firstPath}`)
    const listingFilter = await strapi.processReq('GET', `filters?slug=${basePath}-filters`)
    const filters = listingFilter.length ? listingFilter[0] : null
    const data = pageData[0]
    const listingOfferCards = await updateOfferCards(data)
    return { props: { data, filters, listingOfferCards } }
}

export default PersonalLoanListing