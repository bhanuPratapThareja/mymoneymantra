import { useState } from 'react'

const CreditUtilizationAllAccounts = ({ active, closed, name }) => {
  const [activeTab, setActiveTab] = useState('accepted')

  return (
    <section className="product-offer creditUtilization-section">
      <div className="container account-summary-head">
        <h2>Credit Utilization of all accounts</h2>
      </div>
      <div className="product-wrapper">
        <div className="container head">
          <div className="switch-tab tab">
            <button
              className={activeTab === 'accepted' ? 'tablinks active' : 'tablinks'}
              onClick={() => setActiveTab('accepted')}
            >
              <span></span>
              <h2>Active</h2>
            </button>
            <button
              className={activeTab === 'rejected' ? 'tablinks active' : 'tablinks'}
              onClick={() => setActiveTab('rejected')}
            >
              <span></span>
              <h2>Closed</h2>
            </button>
            <span className="line"></span>
          </div>
        </div>
        {activeTab === 'accepted' ? (
          <div id="accepted" className="cards-wrapper container tabcontent">
            {active?.map((item, i) => (
              <div key={i} className="popular-cards-slider-card">
                <div key={i} className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Platinum Delight Credit Card
                    </h3>
                    <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
                  </div>
                  <div className="account-number">
                    <p>{item.accountNo}</p>
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left content-section">
                      <div className="content-section-left">
                        <div>
                          <span>Credit Limit:</span>
                          <h5>₹{item.creditLimitAmt}</h5>
                        </div>
                        <div className="content-section-left-block">
                          <span>Credit Balance:</span>
                          <h5>₹{item.currentBalance}</h5>
                        </div>
                      </div>

                      <div className="content-section-right">
                        <span>Credit Utilisation:</span>
                        <div className="content-section-right-percentage">
                          <div id="cu_percent">
                            <svg viewBox="0 0 100 100" style={{ display: 'block', width: '100%' }}>
                              <path
                                d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                                stroke="#eee"
                                strokeWidth="10"
                                fillOpacity="0"
                              ></path>
                              <path
                                d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                                stroke="rgb(137,193,66)"
                                strokeWidth="10"
                                fillOpacity="0"
                                style={{
                                  strokeDasharray: '282.783, 282.783',
                                  strokeDashoffset: '56.5566',
                                  strokeLinecap: 'round',
                                }}
                              ></path>
                            </svg>
                            <div
                              className="progressbar-text"
                              style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                padding: '0px',
                                margin: '0px',
                                transform: 'translate(-50%, -50%)',
                                color: 'rgb(34, 31, 31)',
                                fontFamily: 'Avenir-Heavy',
                                fontSize: '20px',
                                fontWeight: 'bold',
                              }}
                            >
                              {item.creditUtilization}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-cards-slider-card-bottom">
                  <div>
                    <h5>{item.paymentStatus} Payment</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            id="rejected"
            className="cards-wrapper container tabcontent"
            style={{ display: 'grid' }}
          >
            {closed?.map((item, i) => (
              <div key={i} className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Platinum Delight Credit Card
                    </h3>
                    <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Applicant’s Name:</span>
                        <h5>{name}</h5>
                      </div>
                      <div className="value">
                        <span>Product Type:</span>
                        <h5>{item.accountType}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-cards-slider-card-bottom rejected-red">
                  <div>
                    <h5>Rejected: Due to poor Credit Score</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CreditUtilizationAllAccounts
