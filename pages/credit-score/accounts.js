import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import TotalAccounts from '../../components/CreditScore/TotalAccounts'
import TotalActiveAccounts from '../../components/CreditScore/TotalActiveAccounts'
import { getClassesForPage } from '../../utils/classesForPage'

const utilization = (props) => {
  console.log({ props })
  const active = props?.data?.accountSummary?.filter((item) => item.accountStatus === 'ACTIVE')
  const closed = props?.data?.accountSummary?.filter((item) => item.accountStatus !== 'ACTIVE')
  return (
    <div className={props.pageClasses}>
      <Layout>
        <TotalAccounts totalAccount={props?.data?.totalAccount} />
        <TipSection />
        <TotalActiveAccounts active={active} closed={closed} name={props?.data?.applicantName} />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-accounts'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:8060/utility/api/credit-profile/v1/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MTI3ODU1NDMsImlhdCI6MTYxMjY5OTE0M30.vcmaApFEdaW67MbJOdGu97NjV2YjUdD72nO59Ojjbr9AtCLFIAVL0CJyByNXKjOGBQZtgpsMS5wBARNJPZaGJQ',
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
export default utilization
