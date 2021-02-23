import axios from 'axios'
import { useEffect, useState } from 'react'

const Offers = () => {
  const [state, setstate] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = localStorage.getItem('customerId')
        const responseObject = await axios.post(
          'http://203.122.46.189:8060/customer/api/customer/v1/view-offers',
          {
            customerId: customerId ? customerId : '206',
            productId: '',
          }
        )
        console.log(responseObject)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="offers-cards-wrapper">
      <div className="popular-cards-slider-card">
        <div className="popular-cards-slider-card-top">
          <div className="head">
            <h3>
              <b className="card_name">RBL Bank</b>
              <br />
              Platinum Delight Credit Card
            </h3>
            <img src="build/images/icons/citi-logo.png" />
          </div>
          <div className="content">
            <ul>
              <li>
                Earn 10 reward points for every ₹125 spent at apparel &amp;
                department stores
              </li>
              <li>Instant Redemption at select partner stores</li>
            </ul>
          </div>
        </div>
        <div className="popular-cards-slider-card-bottom">
          <div>
            <h5>Lifetime reward points</h5>
          </div>
        </div>
      </div>
      <div className="popular-cards-slider-card">
        <div className="popular-cards-slider-card-top">
          <div className="head">
            <h3>
              <b className="card_name">RBL Bank</b>
              <br />
              Platinum Delight Credit Card
            </h3>
            <img src="build/images/icons/citi-logo.png" />
          </div>
          <div className="content">
            <ul>
              <li>
                Earn 10 reward points for every ₹125 spent at apparel &amp;
                department stores
              </li>
              <li>Instant Redemption at select partner stores</li>
            </ul>
          </div>
        </div>
        <div className="popular-cards-slider-card-bottom">
          <div>
            <h5>Lifetime reward points</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offers
