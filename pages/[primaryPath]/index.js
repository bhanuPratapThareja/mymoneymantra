import { useEffect, useState } from 'react'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'

import CreditCardsBanner from '../../components/Banners/CreditCardsBanner'
import PersonalLoansBanner from '../../components/Banners/PersonalLoansBanner'
import HomeLoansBanner from '../../components/Banners/HomeLoansBanner'
import UspCards from '../../components/common/UspCards'
import CreditScore from '../../components/common/CreditScore'
import PopularOffers from '../../components/common/PopularOffers'
import TrendingOffers from '../../components/common/TrendingOffers'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import ShortExtendedForm from '../../components/common/ShortExtendedForm'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'
import PageNotFound from '../../components/PageNotFound'
import { getClassesForPage } from '../../utils/classesForPage'
import { clearLeadId, setPrimaryPath, setProductType, clearFormData, getProductType } from '../../utils/localAccess'
import { viewOffers, extractOffers } from '../../services/offersService'

const PrimaryPage = props => {

  const [popularOffers, setPopularOffers] = useState([])
  const [trendingOffers, setTrendingOffers] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setPrimaryPath(props.primaryPath)
    setProductType(props.productTypeData)
    clearLeadId()
    clearFormData()
    getOffers()
  }, [])

  const getOffers = async () => {
    const productType = getProductType()

    const apiOffers = await viewOffers(productType.productTypeId)
    let populars = []
    let trendings = []

    if (apiOffers) {
      populars = apiOffers.populars
      trendings = apiOffers.trendings
      const popularOffers = await extractOffers(populars)
      const trendingOffers = await extractOffers(trendings)
      setPopularOffers(popularOffers)
      setTrendingOffers(trendingOffers)
    }

  }

  const goToShortForm = () => {
    const shortFormEl = document.getElementsByClassName('lets-find-container')
    if (shortFormEl.length) {
      const shortFormElOffset = shortFormEl[0].offsetTop - 100
      window.scrollTo({ top: shortFormElOffset })
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  const getComponents = dynamic => {
    return dynamic.map((block) => {
      switch (block.__component) {
        case 'banners.credit-cards-banner-component':
          return <CreditCardsBanner key={block.id} data={block} goToShortForm={goToShortForm} />
        case 'banners.personal-loans-banner-component':
          return <PersonalLoansBanner key={block.id} data={block} goToShortForm={goToShortForm} />
        case 'banners.home-loans-banner-component':
          return <HomeLoansBanner key={block.id} data={block} goToShortForm={goToShortForm} />
        case 'blocks.ups-cards-component':
          return <UspCards key={block.id} data={block} />
        case 'form-components.onboarding-short-form':
          return <ShortExtendedForm
            key={block.id}
            data={block}
            tncData={props.tncData}
            preferredSelectionLists={props.preferredSelectionLists}
          />
        case 'offers.popular-offers-component':
          return <PopularOffers
            key={block.id}
            data={block}
            offers={popularOffers}
            primaryPath={props.primaryPath}
            goToShortForm={goToShortForm}
          />
        case 'blocks.credit-score-component':
          return <CreditScore key={block.id} data={block} />
        case 'offers.trending-offers-component':
          return <TrendingOffers
            key={block.id}
            data={block}
            offers={trendingOffers}
            primaryPath={props.primaryPath}
            goToShortForm={goToShortForm}
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

  if (!props.data) {
    return <PageNotFound />
  }

  return (
    <div className={getClassesForPage(props.primaryPath)}>
      {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const strapi = new Strapi()
  const { query } = ctx
  const primaryPath = query.primaryPath
  const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${primaryPath}`)
  const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}`)
  const data = pageData && pageData.length ? pageData[0] : null
  const preferredSelectionLists = await strapi.processReq('GET', `list-preferences`)
  const tncData = await strapi.processReq('GET', `tnc`)

  return {
    props: {
      data, primaryPath, preferredSelectionLists,
      productTypeData, tncData
    }
  }
}

export default PrimaryPage
