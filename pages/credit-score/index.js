import AccountSummary from '../../components/CreditScore/AccountSummary'
import CreditOverview from '../../components/CreditScore/CreditOverview'
import CreditScoreBanner from '../../components/CreditScore/CreditScoreBanner'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'
// import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'
import { useEffect, useState } from 'react'
import Loader from '../../components/common/Loader'
import { getCreditScore } from '../../utils/creditProfileService'
import PopularOffers from '../../components/common/PopularOffers';
const creditScoreProfile = (props) => {
  const [loading, setLoading] = useState(true)
  const [cpScoreData, setCpScoreData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getCreditScore()
      setCpScoreData(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const active = cpScoreData?.accountSummary?.filter(
    (item) => item.accountStatus === 'ACTIVE'
  )
  const closed = cpScoreData?.accountSummary?.filter(
    (item) => item.accountStatus !== 'ACTIVE'
  )

  console.log(cpScoreData)

  return (
    <div className={props.pageClasses}>
      <Layout>
        <Loader active={loading} text="loading" />
        <CreditScoreBanner
          accountHistory={cpScoreData?.accountHistory}
          score={cpScoreData?.score}
        />
        <TipSection />
        <FactorsAffecting />
        <CreditOverview  totalScore={cpScoreData.totalCurrentCredit} overview={cpScoreData.creditOverview}/>
        <AccountSummary
          active={active}
          closed={closed}
          name={cpScoreData?.applicantName}
          banks={props?.data}
        />
        <PopularOffers data='Offers For You' />
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'credit-score-profile'
  const pageClasses = getClassesForPage(primaryPath)
  const responseObject = await fetch('http://203.122.46.189:1338/banks')
  const data = await responseObject.json()
  return { props: { pageClasses, data } }
}
export default creditScoreProfile
