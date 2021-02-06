import OffersForYou from '../../components/CreditScore/OffersForYou'
import PaymentRank from '../../components/CreditScore/PaymentRank'
import PaymentRecord from '../../components/CreditScore/PaymentRecord'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'

const rank = (props) => {
  console.log({ props })
  const onTime = props?.data?.creditRank?.filter((item) => item.paymentStatus === 'On-time')
  const delayed = props?.data?.creditRank?.filter((item) => item.paymentStatus !== 'On-time')
  return (
    <div className={props.pageClasses}>
      <Layout>
        <PaymentRank rank={props?.data?.rank} />
        <TipSection />
        <PaymentRecord onTime={onTime} delayed={delayed} />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-rank'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:8060/utility/api/credit-profile/v1/credit-rank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MTI2MDQ5NTAsImlhdCI6MTYxMjUxODU1MH0.luwSZjFvk-IO3lo6MwdXzPgYrVG3TQvOG3x8uRHjoKvE0Z3oXE-FftfyxQ5E24AxoqSr7rpMOJoY3Pr9hsns5g',
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
export default rank
