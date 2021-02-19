import { useEffect, useState } from 'react'
import axios from 'axios'

import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import AgeOfCredit from '../../components/CreditScore/AgeOfCredit'
import AgeCreditAllAccounts from '../../components/CreditScore/AgeCreditAllAccounts'
import { getClassesForPage } from '../../utils/classesForPage'
import Loader from '../../components/common/Loader'
import { getCreditAge } from '../../utils/creditProfileService'

const age = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpAgeData, setCpAgeData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getCreditAge()
      setCpAgeData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const active = cpAgeData?.creditAge?.filter(
    (item) => item.accountStatus === 'ACTIVE'
  )
  const closed = cpAgeData?.creditAge?.filter(
    (item) => item.accountStatus !== 'ACTIVE'
  )
  console.log({ cpAgeData })
  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <AgeOfCredit creditAge={cpAgeData?.totalAge} />
        <TipSection />
        <AgeCreditAllAccounts
          active={active}
          closed={closed}
          name={cpAgeData?.applicantName}
          banks={props.data}
        />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-age'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:1338/banks')
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default age
