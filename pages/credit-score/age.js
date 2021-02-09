import { useEffect, useState } from 'react'
import axios from 'axios'

import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import AgeOfCredit from '../../components/CreditScore/AgeOfCredit'
import AgeCreditAllAccounts from '../../components/CreditScore/AgeCreditAllAccounts'
import { getClassesForPage } from '../../utils/classesForPage'
import Loader from '../../components/common/Loader'

const age = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpAgeData, setCpAgeData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseObject = await axios.post(
          'http://203.122.46.189:8060/utility/api/credit-profile/v1/credit-age',
          {
            customerId: '2000006836',
          }
        )
        const { data } = responseObject
        setCpAgeData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const active = cpAgeData?.creditAge?.filter(
    (item) => item.accountStatus === 'ACTIVE'
  )
  const closed = cpAgeData?.creditAge?.filter(
    (item) => item.accountStatus !== 'ACTIVE'
  )
  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <AgeOfCredit creditAge={cpAgeData?.totalAge} />
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
  return { props: { pageClasses } }
}
export default age
