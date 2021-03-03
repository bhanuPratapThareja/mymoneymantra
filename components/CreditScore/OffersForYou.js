import { useEffect } from "react"

const OffersForYou = () => {
useEffect(() => {
  if (window !== undefined && window.initSlickCards ) {
    setTimeout(() => {
       window.initSlickCards()
    }, 1000)
 }
}, [])

  return (
    <section data-aos="fade-up" className="container popular-card-container aos-init aos-animate">
      <div className="popular-cards">
        <h2>Offers For You</h2>
        <div className="popular-cards-slider slick-initialized slick-slider" id="trending-offers-sec">
          <div className="slick-list draggable">
            <div className="slick-track" style={{ opacity: 1, width: '20000px', transform: 'translate3d(0px, 0px, 0px)', transition: 'transform 1000ms cubic-bezier(0.7, 0, 0.3, 1) 0s' }}>
              <div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabIndex="-1">
                <div>
                  <div className="popular-cards-slider-card" style={{ width: '100%', display: 'inline-block' }}>
                    <div className="popular-cards-slider-card-top">
                      <div className="head">
                        <h3>
                          <b className="card_name">RBL Bank</b>
                          <br />
                          Personal Loan
                        </h3>
                        <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
                      </div>
                      <div className="content">
                        <ul>
                          <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores</li>
                          <li>Instant Redemption at select partner stores</li>
                        </ul>
                      </div>
                      <div className="fee">
                        <h5>
                          <b>14.25% p.a.</b> Interest Rate
                        </h5>
                      </div>
                    </div>
                    <div className="popular-cards-slider-card-bottom">
                      <div>
                        <h5>Lifetime reward points</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slick-slide" data-slick-index="1" aria-hidden="true">
                <div>
                  <div className="popular-cards-slider-card" style={{ width: '100%', display: 'inline-block' }}>
                    <div className="popular-cards-slider-card-top">
                      <div className="head">
                        <h3>
                          <b className="card_name">RBL Bank</b>
                          <br />
                          Personal Loan
                        </h3>
                        <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
                      </div>
                      <div className="content">
                        <ul>
                          <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores</li>
                          <li>Instant Redemption at select partner stores</li>
                        </ul>
                      </div>
                      <div className="fee">
                        <h5>
                          <b>14.25% p.a.</b> Interest Rate
                        </h5>
                      </div>
                    </div>
                    <div className="popular-cards-slider-card-bottom">
                      <div>
                        <h5>Lifetime reward points</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slick-slide" data-slick-index="2" aria-hidden="true" tabIndex="-1">
                <div>
                  <div className="popular-cards-slider-card" style={{ width: '100%', display: 'inline-block' }}>
                    <div className="popular-cards-slider-card-top">
                      <div className="head">
                        <h3>
                          <b className="card_name">RBL Bank</b>
                          <br />
                          Personal Loan
                        </h3>
                        <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
                      </div>
                      <div className="content">
                        <ul>
                          <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores</li>
                          <li>Instant Redemption at select partner stores</li>
                        </ul>
                      </div>
                      <div className="fee">
                        <h5>
                          <b>14.25% p.a.</b> Interest Rate
                        </h5>
                      </div>
                    </div>
                    <div className="popular-cards-slider-card-bottom">
                      <div>
                        <h5>Lifetime reward points</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slick-slide" data-slick-index="3" aria-hidden="true" tabIndex="-1">
                <div>
                  <div className="popular-cards-slider-card" style={{ width: '100%', display: 'inline-block' }}>
                    <div className="popular-cards-slider-card-top">
                      <div className="head">
                        <h3>
                          <b className="card_name">RBL Bank</b>
                          <br />
                          Personal Loan
                        </h3>
                        <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
                      </div>
                      <div className="content">
                        <ul>
                          <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores</li>
                          <li>Instant Redemption at select partner stores</li>
                        </ul>
                      </div>
                      <div className="fee">
                        <h5>
                          <b>14.25% p.a.</b> Interest Rate
                        </h5>
                      </div>
                    </div>
                    <div className="popular-cards-slider-card-bottom">
                      <div>
                        <h5>Lifetime reward points</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OffersForYou
