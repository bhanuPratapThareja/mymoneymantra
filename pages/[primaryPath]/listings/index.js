import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { uniq } from 'lodash'
import Strapi from '../../../providers/strapi'
import Layout from '../../../components/Layout'

import ListingsBanner from '../../../components/Banners/ListingsBanner'
import ListingCards from '../../../components/Listings/ListingCards'
import CreditScore from '../../../components/common/CreditScore'
import Offers from '../../../components/common/Offers'
import BankSlider from '../../../components/common/BankSlider'
import Rewards from '../../../components/common/Rewards'
import FinancialTools from '../../../components/common/FinancialTools'
import Blogger from '../../../components/common/Blogger'
import LearnMore from '../../../components/common/LearnMore'

import { unpackComponents, extractListingOffersComponent } from '../../../services/componentsService'
import { getProductDecision } from '../../../services/offersService'
import { filterOfferCardsInFilterComponent } from '../../../utils/loanListingFilterHandler'
import { getClassesForPage } from '../../../utils/classesForPage'

const Listings = props => {
    const router = useRouter()
    const primaryPath = router.query.primaryPath
    const [allOfferCards, setAllOfferCards] = useState([])
    const [offerCards, setOfferCards] = useState([])
    const [banksList, setBanksList] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        let listingOffersComponent = extractListingOffersComponent(props.data)
        getListingOffers(listingOffersComponent)
    }, [])

    const getListingOffers = listingOffersComponent => {
        let listingOffers = []
        let tempOffers = [...listingOffersComponent.product_v_2s]
        if (!tempOffers || !tempOffers.length) {
            return []
        }
        listingOffersComponent.product_v_2s.forEach(async product => {
            const components = await unpackComponents(product)
            listingOffers.push(components)
            tempOffers.shift()
            if (!tempOffers.length) {
                getCardsWithButtonText(listingOffers)
            }
        })
    }

    const getCardsWithButtonText = async cards => {
        const newCards = await getProductDecision(cards, primaryPath)
        setOfferCards(newCards)
        setAllOfferCards(newCards)

        let banksList = []
        if (newCards.length) {
            newCards.forEach(card => {
                banksList.push(card.bank.slug)
            })
            setBanksList(banksList)
        }
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

    const getComponents = (dynamic, filters) => {
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
                        banksList={uniq(banksList)}
                    />

                case 'blocks.listing-cards':
                    return <ListingCards key={block.id} data={block} offerCards={offerCards} v />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />

                case 'offers.trending-offers-component':
                    return <Offers key={block.id} data={block} />

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
    const pageClasses = getClassesForPage(primaryPath, secondaryPath)
    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${secondaryPath}`)

    const listingFilter = await strapi.processReq('GET', `filters?slug=${primaryPath}-filters`)
    const filters = listingFilter && listingFilter.length ? listingFilter[0] : null
    const data = pageData[0]

    return { props: { data, pageClasses, filters } }
}

export default Listings