import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import TotalAccounts from '../../components/CreditScore/TotalAccounts'
import TotalActiveAccounts from '../../components/CreditScore/TotalActiveAccounts'
import { getClassesForPage } from '../../utils/classesForPage'

const utilization = (props) => {
  return (
    <div className={props.pageClasses}>
      <Layout>
        <TotalAccounts />
        <TipSection />
        <TotalActiveAccounts />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-accounts'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default utilization
