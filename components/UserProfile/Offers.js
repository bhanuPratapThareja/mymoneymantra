import axios from 'axios'
import { useEffect, useState } from 'react'
import { extractOffers } from '../../services/offersService'
import Image from '../ImageComponent/ImageComponent'

const Offers = () => {
  const [state, setstate] = useState([])
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = localStorage.getItem('customerId')
        const responseObject = await axios.post(
          'http://203.122.46.189:8060/customer/api/customer/v1/view-offers',
          {
            // customerId: customerId ? customerId : '206',
            customerId: '',
            productId: '',
          }
        )
        const { trendings, populars } = responseObject.data
        let allOffers = [...trendings, ...populars]
        let offers = await extractOffers(allOffers)
        setOffers(offers)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  if (!offers.length) {
    return null
  }
  return (
    <div className="offers-cards-wrapper">
      {
        offers.map((offer, i) => {
          const { bank, product } = offer
          const { product_name, product_feature, product_annual_fee,
            product_usp_highlight, product_interest_rate,
            product_tenure, product_loan_amount, product_emi } = product
          return (
            <div className="popular-cards-slider-card popular-cards-slider-card-user" key={product.id}>
              <div className="popular-cards-slider-card-top">
                <div className="head">
                  <h3><b className="card_name">{bank.bank_name}</b><br />{product_name}</h3>
                  <Image image={bank.bank_logo} />
                </div>
                <div className="content">
                  <ul>
                    {product_feature.product_feature.map(feature => <li key={feature.id}><span dangerouslySetInnerHTML={{ __html: feature.description }}></span></li>)}
                  </ul>
                </div>
                
              </div>
              <div className="popular-cards-slider-card-bottom">
                  <div dangerouslySetInnerHTML={{ __html: `<h5>${product_usp_highlight.highlight}</h5>` }}></div>
                </div>
            </div>
          )
        })
      }
      {/* <div className="popular-cards-slider-card">
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
      </div> */}
      {/* <div className="popular-cards-slider-card">
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
      </div> */}
    </div>
  )
}

export default Offers
