import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import AgeOfCredit from '../../components/CreditScore/AgeOfCredit'
import AgeCreditAllAccounts from '../../components/CreditScore/AgeCreditAllAccounts'
import { getClassesForPage } from '../../utils/classesForPage'

const utilization = (props) => {
  return (
    <div className={props.pageClasses}>
      <Layout>
        <AgeOfCredit />
        <TipSection />
        <AgeCreditAllAccounts />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-age'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default utilization
