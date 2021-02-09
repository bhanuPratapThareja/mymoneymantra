import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import AgeOfCredit from '../../components/CreditScore/AgeOfCredit'
import AgeCreditAllAccounts from '../../components/CreditScore/AgeCreditAllAccounts'
import { getClassesForPage } from '../../utils/classesForPage'

const utilization = (props) => {
  console.log({ props })
  const active = props?.data?.creditAge?.filter(
    (item) => item.accountStatus === 'ACTIVE'
  )
  const closed = props?.data?.creditAge?.filter(
    (item) => item.accountStatus !== 'ACTIVE'
  )
  return (
    <div className={props.pageClasses}>
      <Layout>
        <AgeOfCredit creditAge={props?.data?.totalAge} />
        <TipSection />
        <AgeCreditAllAccounts active={active} closed={closed} />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-age'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch(
    'http://203.122.46.189:8060/utility/api/credit-profile/v1/credit-age',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MTI4NTQ2MTAsImlhdCI6MTYxMjc2ODIxMH0.loBje3OGLKwcl4g6qLv9NggfFcEdgmSdxUjf112ru75R4NYODBCKAG17CeVa5ob985K5eya9-Ca_848DNhv3AQ',
        correlationId: '25478965874',
        appId: 'MMMWEBAPP',
      },
      body: JSON.stringify({
        customerId: '2000006836',
      }),
    }
  )
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default utilization
