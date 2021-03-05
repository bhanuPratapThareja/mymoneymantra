import { useEffect, useState } from 'react'
import axios from 'axios'

import Offers from '../../components/common/Offers'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import TotalAccounts from '../../components/CreditScore/TotalAccounts'
import TotalActiveAccounts from '../../components/CreditScore/TotalActiveAccounts'
import { getClassesForPage } from '../../utils/classesForPage'

import { getCreditAccounts } from '../../utils/creditProfileService'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'

const accounts = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpAccountsData, setCpAccountsData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getCreditAccounts()
      setCpAccountsData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  console.log({ cpAccountsData })
  const active = cpAccountsData?.paymentRecord?.filter(
    (item) => item.accountStatus === 'ACTIVE'
  )
  const closed = cpAccountsData?.paymentRecord?.filter(
    (item) => item.accountStatus !== 'ACTIVE'
  )
  return (
    <div className={props.pageClasses}>
      <Layout>
        
        <div className="mobile-background"></div>
        <TotalAccounts totalAccount={cpAccountsData?.totalAccount} />
        <TipSection />
        <FactorsAffecting />
        <TotalActiveAccounts
          active={active}
          closed={closed}
          name={cpAccountsData?.applicantName}
          banks={props?.data}
        />
        <Offers componentType="trneding" data={{section_heading:'Offers For You'}} />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-accounts'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:1338/banks')
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default accounts
