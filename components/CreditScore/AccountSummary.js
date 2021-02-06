import { useState } from 'react'
import moment from 'moment'

const AccountSummary = ({ active, closed, name }) => {
  const [activeTab, setActiveTab] = useState('accepted')
  return (
    <>
      <section className="product-offer accountSection">
        <div className="container account-summary-head">
          <h2>Account Summary</h2>
        </div>
        <div className="product-wrapper">
          <div className="container head">
            <div className="switch-tab tab">
              <button className={activeTab === 'accepted' ? 'tablinks active' : 'tablinks'} onClick={() => setActiveTab('accepted')}>
                <span></span>
                <h2>Active</h2>
              </button>
              <button className={activeTab === 'rejected' ? 'tablinks active' : 'tablinks'} onClick={() => setActiveTab('rejected')}>
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
                  <div className="popular-cards-slider-card-top">
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
                      <div className="left">
                        <div className="value">
                          <span>Issued On:</span>
                          <h5>{moment(item.issuedOn).format('DD MMM YYYY')}</h5>
                        </div>
                        <div className="value">
                          <span>Last Payment Date:</span>
                          <h5>{item.lastPaymentDate}</h5>
                        </div>
                        <div className="value">
                          <span>Current Balance:</span>
                          <h5>₹{item.currentBalance}</h5>
                        </div>
                        <div className="value">
                          <span>Credit Limit:</span>
                          <h5>₹{item.creditLimit}</h5>
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
            <div id="rejected" style={{ display: 'grid' }} className="cards-wrapper container tabcontent">
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
                          <h5>{item.productType}</h5>
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
    </>
  )
}

export default AccountSummary
