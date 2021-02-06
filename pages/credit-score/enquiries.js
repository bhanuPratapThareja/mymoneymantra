import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import TotalAccounts from '../../components/CreditScore/TotalAccounts'
import TotalActiveAccounts from '../../components/CreditScore/TotalActiveAccounts'
import { getClassesForPage } from '../../utils/classesForPage'
import YourTotalEnquiries from '../../components/CreditScore/YourTotalEnquiries'
import TotalEnquiries from '../../components/CreditScore/TotalEnquiries'

const utilization = (props) => {
  return (
    <div className={props.pageClasses}>
      <Layout>
        <YourTotalEnquiries />
        <TipSection />
        <TotalEnquiries />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-enquiries'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default utilization
