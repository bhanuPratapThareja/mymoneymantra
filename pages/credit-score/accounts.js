import { useEffect, useState } from 'react'
import axios from 'axios'

import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import TotalAccounts from '../../components/CreditScore/TotalAccounts'
import TotalActiveAccounts from '../../components/CreditScore/TotalActiveAccounts'
import { getClassesForPage } from '../../utils/classesForPage'
import Loader from '../../components/common/Loader'

const accounts = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpAccountsData, setCpAccountsData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseObject = await axios.post(
          'http://203.122.46.189:8060/utility/api/credit-profile/v1/credit-account',
          {
            customerId: '2000006836',
          }
        )
        const { data } = responseObject
        setCpAccountsData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  // console.log({ cpAccountsData })
  const active = cpAccountsData?.paymentRecord?.filter(
    (item) => item.accountStatus === 'ACTIVE'
  )
  const closed = cpAccountsData?.paymentRecord?.filter(
    (item) => item.accountStatus !== 'ACTIVE'
  )
  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <TotalAccounts totalAccount={cpAccountsData?.totalAccount} />
        <TipSection />
        <TotalActiveAccounts
          active={active}
          closed={closed}
          name={cpAccountsData?.applicantName}
        />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export function getServerSideProps(ctx) {
  const primaryPath = 'cp-accounts'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default accounts
