import AccountSummary from '../../components/CreditScore/AccountSummary'
import CreditOverview from '../../components/CreditScore/CreditOverview'
import CreditScoreBanner from '../../components/CreditScore/CreditScoreBanner'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'
import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import axios from 'axios'

const creditScoreProfile = (props) => {
  console.log(props.data)
  const active = props?.data?.accountSummary?.filter((item) => item.accountStatus === 'ACTIVE')
  const closed = props?.data?.accountSummary?.filter((item) => item.accountStatus !== 'ACTIVE')
  return (
    <div className={props.pageClasses}>
      <Layout>
        <CreditScoreBanner />
        <TipSection />
        <FactorsAffecting />
        <CreditOverview />
        <AccountSummary active={active} closed={closed} />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'credit-score-profile'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:8060/utility/api/credit-profile/v1/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MTI1MTg0NzcsImlhdCI6MTYxMjQzMjA3N30.vJ86_B24wu4sUc7VrH8bQyW6IzgI35D4ammMg0CBrzTnEYktVBUq13k-ZoC5slkP_z26GUfOby2jb-o4whfzyQ',
      correlationId: '25478965874',
      appId: 'MMMWEBAPP',
    },
    body: JSON.stringify({
      customerId: '2000006836',
    }),
  })
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default creditScoreProfile
