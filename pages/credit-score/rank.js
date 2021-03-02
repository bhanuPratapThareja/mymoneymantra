import { useEffect, useState } from 'react'
import axios from 'axios'

import PaymentRank from '../../components/CreditScore/PaymentRank'
import PaymentRecord from '../../components/CreditScore/PaymentRecord'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import Loader from '../../components/common/Loader'
import { getCreditRank } from '../../utils/creditProfileService'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'
import Offers from '../../components/common/Offers'

const rank = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpRankData, setCpRankData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getCreditRank()
      setCpRankData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const onTime = cpRankData?.creditRank?.filter(
    (item) => item.paymentStatus === 'On-time'
  )
  const delayed = cpRankData?.creditRank?.filter(
    (item) => item.paymentStatus !== 'On-time'
  )
  console.log({ cpRankData })
  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <div class="mobile-background"></div>
        <PaymentRank rank={cpRankData?.rank} />
        <TipSection />
        <FactorsAffecting />
        <PaymentRecord onTime={onTime} delayed={delayed} banks={props?.data} />
        <Offers />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-rank'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:1338/banks')
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default rank
