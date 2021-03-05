import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'

import ListingsBanner from '../../components/Banners/ListingsBanner'
import ListingCards from '../../components/Listings/ListingCards'
import CreditScore from '../../components/common/CreditScore'
import Offers from '../../components/common/Offers'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'

import { viewOffers, extractOffers } from '../../services/offersService'
import { filterOfferCardsInFilterComponent } from '../../utils/listingsFilterHandler'
import { getClassesForPage } from '../../utils/classesForPage'
import { addSeoMetaData, removeSeoMetaData } from '../../utils/seoMetaData';
import { getLeadId } from '../../utils/sessionAccess'

const Listings = props => {
    const router = useRouter()
    const [allOfferCards, setAllOfferCards] = useState([])
    const [offerCards, setOfferCards] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        const leadId = getLeadId()
        if(!leadId) {
            goToLandingPage()
            return
        }
        loadListingOffers()
        const { scriptId, canonicalId } = addSeoMetaData(props.data, props.data.id)
        return () => {
            removeSeoMetaData(scriptId, canonicalId)
        }
    }, [])

    const goToLandingPage = () => {
        const primaryPath = router.query.primaryPath
        router.push(`/${primaryPath}`)
    }

    const loadListingOffers = async () => {
        const apiOffers = await viewOffers(props.productType)
        if (apiOffers) {
            let offers = apiOffers['populars']
            if(!offers || !offers.length) {
                return
            }
            const updatedOffers = await extractOffers(offers)
            setOfferCards(updatedOffers)
            setAllOfferCards(updatedOffers)
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

    const getComponents = dynamic => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.listings-banner-component':
                    return <ListingsBanner
                        key={block.id}
                        data={block}
                        numberOfCards={offerCards.length}
                        filterOfferCards={filterOfferCards}
                        filterCardsFilterComponent={filterCardsFilterComponent}
                        allOfferCards={allOfferCards}
                        productType={props.productType}
                    />

                case 'blocks.listing-cards':
                    return <ListingCards
                        key={block.id}
                        data={block}
                        offerCards={offerCards}
                        primaryPath={props.primaryPath}
                        productType={props.productType}
                    />
                case 'blocks.credit-score-component':
                    return <CreditScore key={block.id} data={block} />

                case 'offers.trending-offers-component':
                    return <Offers 
                        key={block.id} 
                        data={block}
                        componentType={block.__component}
                        productType={props.productType}
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
    const productType = productTypeData[0]

    return {
        props: {
            data, primaryPath, productType
        }
    }
}

export default Listings