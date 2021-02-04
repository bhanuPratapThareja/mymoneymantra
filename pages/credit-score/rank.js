import OffersForYou from '../../components/CreditScore/OffersForYou'
import PaymentRank from '../../components/CreditScore/PaymentRank'
import PaymentRecord from '../../components/CreditScore/PaymentRecord'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'

const rank = (props) => {
  return (
    <div className={props.pageClasses}>
      <Layout>
        <PaymentRank />
        <TipSection />
        <PaymentRecord />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-rank'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default rank
