import axios from 'axios'
import { useEffect, useState } from 'react'
import { findBank } from '../../utils/findBank'

const Application = ({ banks }) => {
  const [applicationData, setApplicationData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = localStorage.getItem('customerId')
        const responseObject = await axios.get(
          `http://203.122.46.189:8061/customer/api/profile/v1/cust-app`,{params:{customerId}}
        )
        console.log(responseObject?.data?.applications)
        setApplicationData(responseObject?.data?.applications)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="applications-cards-wrapper">
      {applicationData?.map((item, i) => {
        const bank = findBank(banks, item.bankId)
        return (
          <div key={i} className="popular-cards-slider-card">
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">{bank?.bank_name}</b>
                  <br />
                  Platinum Delight Credit Card
                </h3>
                <img
                  src={`http://203.122.46.189:1338${bank?.bank_logo?.url}`}
                />
              </div>
              <h2>Lifetime win points</h2>
              <h5>Application No#{item.applicationNo}</h5>
            </div>
            <div className="popular-cards-slider-card-bottom">
              <div>
                <h5>Application Status: {item.applicationStatus}</h5>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Application
