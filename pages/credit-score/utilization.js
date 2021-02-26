import { useEffect, useState } from 'react'
import axios from 'axios'

import YourCreditUtilization from '../../components/CreditScore/YourCreditUtilization'
import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import CreditUtilizationAllAccounts from '../../components/CreditScore/CreditUtilizationAllAccounts'
import Loader from '../../components/common/Loader'
import { getCreditUtilization } from '../../utils/creditProfileService'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'

const utilization = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpUtilizationData, setCpUtilizationData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getCreditUtilization()
      setCpUtilizationData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const active = cpUtilizationData?.creditUtilization?.filter(
    (item) => item.accountStatus === 'ACTIVE'
  )
  const closed = cpUtilizationData?.creditUtilization?.filter(
    (item) => item.accountStatus !== 'ACTIVE'
  )
  console.log({ cpUtilizationData })
  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <YourCreditUtilization
          creditUtilization={cpUtilizationData?.totalCreditUtilization}
        />
        <TipSection />
        <FactorsAffecting />
        <CreditUtilizationAllAccounts
          active={active}
          closed={closed}
          name={cpUtilizationData?.applicantName}
          banks={props?.data}
        />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-utilization'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:1338/banks')
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default utilization
