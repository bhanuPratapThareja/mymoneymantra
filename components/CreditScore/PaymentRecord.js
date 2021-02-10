import { useState } from 'react'
import { findBank } from '../../utils/findBank'

const PaymentRecord = ({ onTime, delayed, banks }) => {
  const [activeTab, setActiveTab] = useState('accepted')

  return (
    <>
      <section className="product-offer paymentSection">
        <div className="container account-summary-head">
          <h2>Payment Record</h2>
        </div>
        <div className="product-wrapper">
          <div className="container head">
            <div className="switch-tab tab">
              <button
                className={
                  activeTab === 'accepted' ? 'tablinks active' : 'tablinks'
                }
                onClick={() => setActiveTab('accepted')}
              >
                <span></span>
                <h2>Delayed Payments</h2>
              </button>
              <button
                className={
                  activeTab === 'rejected' ? 'tablinks active' : 'tablinks'
                }
                onClick={() => setActiveTab('rejected')}
              >
                <span></span>
                <h2>On-Time Payments</h2>
              </button>
              <span className="line"></span>
            </div>
          </div>
          {activeTab === 'accepted' ? (
            <div id="accepted" className="cards-wrapper container tabcontent">
              {delayed?.map((item, i) => {
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
                      <div className="account-number payment-record-account-number">
                        <h2>{item.accountNo}</h2>
                      </div>
                      <div className="app_progress_card_content">
                        <div className="left">
                          <div className="value">
                            <h6 className="delayed-days">
                              Delayed by {item.delayedDays} Days
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="popular-cards-slider-card-bottom delayed-bottom">
                      <div>
                        <h5>Due on: {item.dueDate}</h5>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div
              id="rejected"
              style={{ display: 'grid' }}
              className="cards-wrapper container tabcontent"
            >
              {onTime?.map((item, i) => {
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
                      <div className="account-number payment-record-account-number">
                        <h2>{item.accountNo}</h2>
                      </div>
                      <div className="app_progress_card_content">
                        <div className="left">
                          <div className="value">
                            <h6 className="delayed-days">
                              Delayed by {item.delayedDays} Days
                            </h6>
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
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default PaymentRecord
