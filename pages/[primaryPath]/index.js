import { useEffect } from 'react'
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
import { clearLeadId, clearLeadBank, clearFormData } from '../../utils/localAccess'
import { addSchemaScript,removeSchemaScript } from '../../utils/handleSchema';

const PrimaryPage = props => {

  useEffect(() => {
    window.scrollTo(0, 0)
    clearLeadBank()
    clearLeadId(props.primaryPath)
    clearFormData(props.primaryPath)
    const scriptId = addSchemaScript(props.data.page_schema, props.data.id)
    return () => {
        if (scriptId) {
            removeSchemaScript(scriptId)
        }
    }
   
  }, [])

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
            primaryPath={props.primaryPath}
            productType={props.productType}
            preferredSelectionLists={props.preferredSelectionLists}
          />
        case 'offers.popular-offers-component':
          return <PopularOffers
            key={block.id}
            data={block}
            primaryPath={props.primaryPath}
            productType={props.productType}
            goToShortForm={goToShortForm}
          />
        case 'blocks.credit-score-component':
          return <CreditScore key={block.id} data={block} />
        case 'offers.trending-offers-component':
          return <TrendingOffers
            key={block.id}
            data={block}
            primaryPath={props.primaryPath}
            productType={props.productType}
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
  const productType = productTypeData[0]
  const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}`)
  const data = pageData && pageData.length ? pageData[0] : null
  const preferredSelectionLists = await strapi.processReq('GET', `list-preferences`)
  const tncData = await strapi.processReq('GET', `tnc`)

  return {
    props: {
      data, primaryPath, preferredSelectionLists,
      productType, tncData
    }
  }
}

export default PrimaryPage
