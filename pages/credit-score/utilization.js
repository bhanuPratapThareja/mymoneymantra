import YourCreditUtilization from '../../components/CreditScore/YourCreditUtilization'
import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import CreditUtilizationAllAccounts from '../../components/CreditScore/CreditUtilizationAllAccounts'

const utilization = (props) => {
  return (
    <div className={props.pageClasses}>
      <Layout>
        <YourCreditUtilization />
        <TipSection />
        <CreditUtilizationAllAccounts />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-utilization'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default utilization
