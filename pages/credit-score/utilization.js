import { useEffect, useState } from 'react'
import YourCreditUtilization from '../../components/CreditScore/YourCreditUtilization'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import CreditUtilizationAllAccounts from '../../components/CreditScore/CreditUtilizationAllAccounts'

import { getCreditUtilization } from '../../utils/creditProfileService'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'
import Offers from '../../components/common/Offers'

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
        
        <div class="mobile-background"></div>
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
        <Offers data={{section_heading:'Offers For You'}} />
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
