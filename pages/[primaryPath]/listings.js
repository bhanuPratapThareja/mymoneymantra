import { useEffect, useState } from 'react'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'

import ListingsBanner from '../../components/Banners/ListingsBanner'
import ListingCards from '../../components/Listings/ListingCards'
import CreditScore from '../../components/common/CreditScore'
import TrendingOffers from '../../components/common/trendingOffers'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'

import { extractListingOffers } from '../../services/componentsService'
import { getProductDecision } from '../../services/offersService'
import { filterOfferCardsInFilterComponent } from '../../utils/loanListingFilterHandler'
import { getClassesForPage } from '../../utils/classesForPage'
import { setPrimaryPath, setProductType, getProductType } from '../../utils/localAccess'
import { viewOffers, extractOffers } from '../../services/offersService'

const Listings = props => {
    const [trendingOffers, setTrendingOffers] = useState([])
    const [allOfferCards, setAllOfferCards] = useState([])
    const [offerCards, setOfferCards] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        setPrimaryPath(props.primaryPath)
        setProductType(props.productTypeData)
        getOffers()
    }, [])

    const getOffers = async () => {
        const productType = getProductType()
        const { trendings } = await viewOffers(productType.productTypeId)
        const trendingOffers = await extractOffers(trendings)
        setTrendingOffers(trendingOffers)
        getListingOffers()
    }

    const getListingOffers = async () => {
        if(props.data) {
            const listingOffers = await extractListingOffers(props.data)
            getCardsWithButtonText(listingOffers)
        }
    }

    const getCardsWithButtonText = async cards => {
        const newCards = await getProductDecision(cards, props.primaryPath)
        setOfferCards(newCards)
        setAllOfferCards(newCards)
    }

    const filterOfferCards = category => {
        const unFilteredCards = [...allOfferCards]
        if (category === 'all') {
            setOfferCards(unFilteredCards)
            return
        }
        let filteredOfferCards = unFilteredCards.filter(card => card.product.product_category.tag === category)
        setOfferCards(filteredOfferCards)
    }

    const filterCardsFilterComponent = filters => {
        const unFilteredCards = [...allOfferCards]
        let filteredOfferCards = filterOfferCardsInFilterComponent(unFilteredCards, filters)
        setOfferCards(filteredOfferCards)
    }

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.listings-banner-component':
                    return <ListingsBanner
                        key={block.id}
                        data={block}
                        filters={props.filters}
                        numberOfCards={offerCards.length}
                        filterOfferCards={filterOfferCards}
                        filterCardsFilterComponent={filterCardsFilterComponent}
                        allOfferCards={allOfferCards}
                        productTypeData={props.productTypeData}
                    />

                case 'blocks.listing-cards':
                    return <ListingCards
                        key={block.id}
                        data={block}
                        offerCards={offerCards}
                        primaryPath={props.primaryPath}
                    />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />

                case 'offers.trending-offers-component':
                    return <TrendingOffers
                        key={block.id}
                        data={block}
                        offers={trendingOffers}
                        primaryPath={props.primaryPath}
                    />

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
        <div className={getClassesForPage(props.primaryPath, 'listings')}>
            {props.data ? <Layout>
                {getComponents(props.data.dynamic, props.filters)}
            </Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx
    const primaryPath = query.primaryPath
    const secondaryPath = 'listings'
    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${secondaryPath}`)
    const data = pageData && pageData.length ? pageData[0] : null

    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${primaryPath}`)
    const listingFilter = await strapi.processReq('GET', `filters?slug=${primaryPath}-filters`)
    const filters = listingFilter && listingFilter.length ? listingFilter[0] : null

    return {
        props: {
            data, filters, primaryPath, productTypeData
        }
    }
}

export default Listings