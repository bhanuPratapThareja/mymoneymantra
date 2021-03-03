import { useEffect, useState } from 'react'

import Offers from '../../components/common/Offers'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import YourTotalEnquiries from '../../components/CreditScore/YourTotalEnquiries'
import TotalEnquiries from '../../components/CreditScore/TotalEnquiries'
import Loader from '../../components/common/Loader'
import { getCreditEnquiries } from '../../utils/creditProfileService'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'

const enquiries = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpEnquiriesData, setCpEnquiriesData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getCreditEnquiries()
      setCpEnquiriesData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  console.log({ cpEnquiriesData })

  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <div class="mobile-background"></div>
        <YourTotalEnquiries totalEnquiries={cpEnquiriesData?.totalEnquiries} />
        <TipSection />
        <FactorsAffecting />
        <TotalEnquiries
          enquiries={cpEnquiriesData?.paymentRecord}
          banks={props.data}
        />
        <Offers data={{section_heading:'Offers For You'}} />
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
