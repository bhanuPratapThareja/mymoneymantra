import { useEffect, useState } from 'react'
import moment from 'moment'
import { findBank } from '../../utils/findBank'
import formatAmount from 'indian-currency-formatter'

const TotalActiveAccounts = ({ active, closed, name, banks }) => {
  const [activeTab, setActiveTab] = useState('accepted')
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const [modalBankData, setmodalBankData] = useState({})

  useEffect(() => {
    const bank = findBank(banks, modalData.bankId)
    setmodalBankData(bank)
  }, [modalData])

  const modalOpenHandle = (data) => {
    setModalData(data)
    setOpen(true)
  }

  return (
    <>
      <section className="product-offer totalAccount-section">
        <div className="container account-summary-head">
          <h2>Total Active Accounts</h2>
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
                <h2>Active</h2>
              </button>
              <button
                className={
                  activeTab === 'rejected' ? 'tablinks active' : 'tablinks'
                }
                onClick={() => setActiveTab('rejected')}
              >
                <span></span>
                <h2>Closed</h2>
              </button>
              <span className="line"></span>
            </div>
          </div>
          {activeTab === 'accepted' ? (
            <div
              id="accepted"
              className="cards-wrapper container tabcontent"
              style={{ display: 'grid' }}
            >
              {active?.map((item, i) => {
                const bank = findBank(banks, item.bankId)
                return (
                  <div
                    key={i}
                    className="popular-cards-slider-card"
                    onClick={() => modalOpenHandle(item)}
                  >
                    <div className="popular-cards-slider-card-top">
                      <div className="head">
                        <h3>
                          <b className="card_name">{bank?.bank_name}</b>
                          <br />
                          {item.productType}
                        </h3>
                        <img
                          src={`http://203.122.46.189:1338${bank?.bank_logo?.url}`}
                        />
                      </div>
                      <div className="account-number">
                        <p>{item.accountNo}</p>
                      </div>
                      <div className="app_progress_card_content">
                        <div className="left">
                          <div className="value">
                            <span>Issued On:</span>
                            <h5>
                              {item.issuedOn
                                ? moment(item.issuedOn).format('DD MMM YYYY')
                                : 'Not Available'}
                            </h5>
                          </div>
                          <div className="value">
                            <span>Last Payment Date:</span>
                            <h5>
                              {item.lastPaymentDate
                                ? item.lastPaymentDate
                                : 'Not Available'}
                            </h5>
                          </div>
                          <div className="value">
                            <span>Current Balance:</span>
                            <h5>
                              {item.currentBalance
                                ? `₹ ${formatAmount(item.currentBalance)}`
                                : 'Not Available'}
                            </h5>
                          </div>
                          <div className="value">
                            <span>Credit Limit:</span>
                            <h5>
                              {item.creditLimit
                                ? `₹ ${formatAmount(item.creditLimit)}`
                                : 'Not Available'}
                            </h5>
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
                )
              })}
            </div>
          ) : (
            <div
              id="rejected"
              style={{ display: 'grid' }}
              className="cards-wrapper container tabcontent"
            >
              {closed?.map((item, i) => {
                const bank = findBank(banks, item.bankId)
                return (
                  <div key={i} className="popular-cards-slider-card">
                    <div className="popular-cards-slider-card-top">
                      <div className="head">
                        <h3>
                          <b className="card_name">{bank?.bank_name}</b>
                          <br />
                          {item.productType}
                        </h3>
                        <img
                          src={`http://203.122.46.189:1338${bank?.bank_logo?.url}`}
                        />
                      </div>
                      <div className="account-number">
                        <p>{item.accountNo}</p>
                      </div>
                      <div className="app_progress_card_content">
                        <div className="left">
                          <div className="value">
                            <span>Closed On:</span>
                            <h5>
                              {item.issuedOn
                                ? moment(item.issuedOn).format('DD MMM YYYY')
                                : 'Not Available'}
                            </h5>
                          </div>
                          <div className="value">
                            <span>Last Payment Date:</span>
                            <h5>
                              {item.lastPaymentDate
                                ? item.lastPaymentDate
                                : 'Not Available'}
                            </h5>
                          </div>
                          <div className="value">
                            <span>Credit Limit:</span>
                            <h5>
                              {item.creditLimit
                                ? `₹ ${formatAmount(item.creditLimit)}`
                                : 'Not Available'}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="popular-cards-slider-card-bottom">
                      <div>
                        <h5>Account Closed</h5>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
      {open && (
        <section
          className="listing-modal mm-modal cards-popup-wrap"
          id="cards-popup-wrap"
          style={{ display: 'block' }}
          onClick={() => setOpen(false)}
        >
          <div className="overlay"></div>
          <div className="mm-modal-wrapper">
            <div className="heads">
              <svg
                className="filter-cross"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setOpen(false)}
              >
                <path
                  d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <div className="cards-popup-content">
              <div className="card-details">
                <div className="head">
                  <h3>
                    <span>{modalBankData?.bank_name}</span>
                    <br />
                    {modalData?.productType}
                  </h3>
                  <img
                    src={`http://203.122.46.189:1338${modalBankData?.bank_logo?.url}`}
                  />
                </div>
                <h5 className="card-num">{modalData?.accountNo}</h5>
                <div className="values-wrap">
                  <div className="values">
                    <span>Date Opened</span>
                    <h5>
                      {modalData?.issuedOn
                        ? moment(modalData?.issuedOn).format('DD MMM YYYY')
                        : 'Not Available'}
                    </h5>
                  </div>
                  <div className="values">
                    <span>Credit Limit:</span>
                    <h5>
                      {modalData?.creditLimit
                        ? `₹ ${formatAmount(modalData?.creditLimit)}`
                        : 'Not Available'}
                    </h5>
                  </div>
                  <div className="values">
                    <span>Account Status:</span>
                    <h5 className="status">
                      {modalData?.accountStatus
                        ? modalData?.accountStatus
                        : 'Not Available'}
                    </h5>
                  </div>
                  <div className="values">
                    <span>Amount Overdue:</span>
                    <h5>
                      {modalData?.amountOverDue
                        ? `₹ ${formatAmount(modalData?.amountOverDue)}`
                        : 'Not Available'}
                    </h5>
                  </div>
                  <div className="values">
                    <span>Current Balance:</span>
                    <h5>
                      {modalData?.currentBalance
                        ? `₹ ${formatAmount(modalData?.currentBalance)}`
                        : 'Not Available'}
                    </h5>
                  </div>
                  <div className="values">
                    <span>Last Updated Date:</span>
                    <h5>
                      {modalData?.lastPaymentDate
                        ? moment(modalData?.lastPaymentDate).format(
                            'DD MMM YYYY'
                          )
                        : 'Not Available'}
                    </h5>
                  </div>
                </div>
              </div>
              {/* <div className="graph">
                <iframe
                  className="chartjs-hidden-iframe"
                  tabIndex={-1}
                  style={{
                    display: 'block',
                    overflow: 'hidden',
                    border: '0px',
                    margin: '0px',
                    inset: '0px',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    pointerEvents: 'none',
                    zIndex: '-1',
                  }}
                ></iframe>
                <h2>Payment History</h2>
                <span>Spent in total:</span>
                <h5>₹4,20,000</h5>
                <canvas
                  id="modalmyChart"
                  height="440"
                  width="880"
                  style={{ display: 'block', width: '440px', height: '220px' }}
                ></canvas>
              </div> */}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default TotalActiveAccounts
