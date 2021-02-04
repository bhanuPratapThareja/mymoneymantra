import YourCreditUtilization from '../../components/CreditScore/YourCreditUtilization'
import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import CreditUtilizationAllAccounts from '../../components/CreditScore/CreditUtilizationAllAccounts'

const utilization = (props) => {
  console.log({ props })
  const active = props?.data?.creditUtilization?.filter((item) => item.accountStatus === 'ACTIVE')
  const closed = props?.data?.creditUtilization?.filter((item) => item.accountStatus !== 'ACTIVE')
  return (
    <div className={props.pageClasses}>
      <Layout>
        <YourCreditUtilization creditUtilization={props?.data?.totalCreditUtilization} />
        <TipSection />
        <CreditUtilizationAllAccounts active={active} closed={closed} />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-utilization'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:8060/utility/api/credit-profile/v1/utilization', {
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
export default utilization
