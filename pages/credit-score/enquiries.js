import { useEffect, useState } from 'react'
import axios from 'axios'

import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import YourTotalEnquiries from '../../components/CreditScore/YourTotalEnquiries'
import TotalEnquiries from '../../components/CreditScore/TotalEnquiries'
import Loader from '../../components/common/Loader'

const enquiries = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpEnquiriesData, setCpEnquiriesData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseObject = await axios.post(
          'http://203.122.46.189:8060/utility/api/credit-profile/v1/credit-enquiries',
          {
            customerId: '2000006836',
          }
        )
        const { data } = responseObject
        setCpEnquiriesData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  console.log({ cpEnquiriesData })

  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <YourTotalEnquiries totalEnquiries={cpEnquiriesData?.totalEnquiries} />
        <TipSection />
        <TotalEnquiries />
        <OffersForYou />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'cp-enquiries'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:1338/banks')
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default enquiries
