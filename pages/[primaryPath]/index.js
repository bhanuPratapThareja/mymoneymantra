import { useEffect } from 'react'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'

import CreditCardsBanner from '../../components/Banners/CreditCardsBanner'
import PersonalLoansBanner from '../../components/Banners/PersonalLoansBanner'
import HomeLoansBanner from '../../components/Banners/HomeLoansBanner'

import UspCards from '../../components/common/UspCards'
import Offers from '../../components/common/Offers'
import CreditScore from '../../components/common/CreditScore'
import BankSlider from '../../components/common/BankSlider'
import Rewards from '../../components/common/Rewards'
import FinancialTools from '../../components/common/FinancialTools'
import ShortExtendedForm from '../../components/common/ShortExtendedForm'
import Blogger from '../../components/common/Blogger'
import LearnMore from '../../components/common/LearnMore'
import { getClassesForPage } from '../../utils/classesForPage'
import { clearLeadId, setPrimaryPath, setProductType, clearFormData } from '../../utils/localAccess'
import { extractPopularOffers, extractTrendingOffers } from '../../services/componentsService'
import { customerOfferData } from '../../services/offersService'

const PrimaryPage = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
    setPrimaryPath(props.primaryPath)
    setProductType(props.productTypeData)
    clearLeadId()
    clearFormData()
 
  }, [])

  const getOffers = async () => {
    try {
      const offers = await customerOfferData()
      console.log('offers: ', offers)
    }
    catch { }
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
        case 'offers.trending-offers-component':
          return <Offers
            key={block.id}
            data={block}
            offers={props.popularOffers || props.trendingOffers || []}
            primaryPath={props.primaryPath}
            goToShortForm={goToShortForm}
          />
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

  const popularOffers = await extractPopularOffers(data)
  const trendingOffers = await extractTrendingOffers(data)

  return {
    props: {
      data, primaryPath, preferredSelectionLists,
      productTypeData, popularOffers, trendingOffers, tncData
    }
  }
}

export default PrimaryPage
