import { useEffect, useState } from 'react'
import axios from 'axios'

import OffersForYou from '../../components/CreditScore/OffersForYou'
import PaymentRank from '../../components/CreditScore/PaymentRank'
import PaymentRecord from '../../components/CreditScore/PaymentRecord'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import Loader from '../../components/common/Loader'

const rank = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpRankData, setCpRankData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseObject = await axios.post(
          'http://203.122.46.189:8060/utility/api/credit-profile/v1/credit-rank',
          {
            customerId: '2000006836',
          }
        )
        const { data } = responseObject
        setCpRankData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const onTime = cpRankData?.creditRank?.filter((item) => item.paymentStatus === 'On-time')
  const delayed = cpRankData?.creditRank?.filter((item) => item.paymentStatus !== 'On-time')
  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <PaymentRank rank={cpRankData?.rank} />
        <TipSection />
        <PaymentRecord onTime={onTime} delayed={delayed} />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export function getServerSideProps(ctx) {
  const primaryPath = 'cp-rank'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default rank
