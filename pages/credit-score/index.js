import AccountSummary from '../../components/CreditScore/AccountSummary'
import CreditOverview from '../../components/CreditScore/CreditOverview'
import CreditScoreBanner from '../../components/CreditScore/CreditScoreBanner'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'
import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'

const creditScoreProfile = (props) => {
  return (
    <div className={props.pageClasses}>
      <Layout>
        <CreditScoreBanner />
        <TipSection />
        <FactorsAffecting />
        <CreditOverview />
        <AccountSummary />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'credit-score-profile'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default creditScoreProfile
