import { useState } from 'react'

const TotalEnquiries = () => {
  const [activeTab, setActiveTab] = useState('accepted')
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const modalOpenHandle = (data) => {
    setModalData(data)
    setOpen(true)
  }

  return (
    <>
      <section className="product-offer totalEnquiries-section">
        <div className="container account-summary-head">
          <h2>Total Enquiries</h2>
        </div>
        <div className="product-wrapper">
          <div className="container head">
            <div className="switch-tab tab">
              <button
                className={activeTab === 'accepted' ? 'tablinks active' : 'tablinks'}
                onClick={() => setActiveTab('accepted')}
              >
                <span></span>
                <h2>Soft Enquiries</h2>
              </button>
              <button
                className={activeTab === 'rejected' ? 'tablinks active' : 'tablinks'}
                onClick={() => setActiveTab('rejected')}
              >
                <span></span>
                <h2>Hard Enquiries</h2>
              </button>
              <span className="line"></span>
            </div>
          </div>
          {activeTab === 'accepted' ? (
            <div id="accepted" className="cards-wrapper container tabcontent detailed-cards">
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="account-number">
                    <p>xxxx xxxx xxxx 6338</p>
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Loan Amount:</span>
                        <h5>₹8,00,000</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-cards-slider-card-bottom">
                  <div>
                    <h5>Approved</h5>
                  </div>
                </div>
              </div>
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="account-number">
                    <p>xxxx xxxx xxxx 6338</p>
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Loan Amount:</span>
                        <h5>₹8,00,000</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-cards-slider-card-bottom">
                  <div>
                    <h5>Approved</h5>
                  </div>
                </div>
              </div>
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="account-number">
                    <p>xxxx xxxx xxxx 6338</p>
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Loan Amount:</span>
                        <h5>₹8,00,000</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-cards-slider-card-bottom">
                  <div>
                    <h5>Approved</h5>
                  </div>
                </div>
              </div>
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="account-number">
                    <p>xxxx xxxx xxxx 6338</p>
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Loan Amount:</span>
                        <h5>₹8,00,000</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-cards-slider-card-bottom">
                  <div>
                    <h5>Approved</h5>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="rejected"
              className="cards-wrapper container tabcontent"
              style={{ display: 'grid' }}
            >
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Applicant’s Name:</span>
                        <h5>Amit Kumar</h5>
                      </div>
                      <div className="value">
                        <span>Product Type:</span>
                        <h5>Credit Card</h5>
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
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Applicant’s Name:</span>
                        <h5>Amit Kumar</h5>
                      </div>
                      <div className="value">
                        <span>Product Type:</span>
                        <h5>Credit Card</h5>
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
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Applicant’s Name:</span>
                        <h5>Amit Kumar</h5>
                      </div>
                      <div className="value">
                        <span>Product Type:</span>
                        <h5>Credit Card</h5>
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
              <div className="popular-cards-slider-card">
                <div className="popular-cards-slider-card-top">
                  <div className="head">
                    <h3>
                      <b className="card_name">Citi Bank</b>
                      <br />
                      Enquiry for Personal Loan
                    </h3>
                    <img
                      src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png"
                      alt="citi-logo"
                    />
                  </div>
                  <div className="app_progress_card_content">
                    <div className="left">
                      <div className="value">
                        <span>Applicant’s Name:</span>
                        <h5>Amit Kumar</h5>
                      </div>
                      <div className="value">
                        <span>Product Type:</span>
                        <h5>Credit Card</h5>
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
            </div>
          )}
        </div>
      </section>
      {open && (
        <section
          class="listing-modal mm-modal cards-popup-wrap"
          id="cards-popup-wrap"
          style={{ display: 'block' }}
          onClick={() => setOpen(false)}
        >
          <div class="overlay"></div>
          <div class="mm-modal-wrapper">
            <div class="heads">
              <svg
                class="filter-cross"
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
            <div class="cards-popup-content">
              <div class="card-details">
                <div class="head">
                  <h3>
                    <span>Citi Bank</span>
                    <br />
                    Credit Enquiry Details
                  </h3>
                  <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
                </div>
                <h5 class="card-num">xxxx xxxx xxxx 6338</h5>
                <div class="values-wrap">
                  <div class="values">
                    <span>Bank Name:</span>
                    <h5>Citi Bank</h5>
                  </div>
                  <div class="values">
                    <span>Product Type:</span>
                    <h5>Personal Loan</h5>
                  </div>
                  <div class="values">
                    <span>Date of Enquiry:</span>
                    <h5>21 Mar 2018</h5>
                  </div>
                  <div class="values">
                    <span>Status of Enquiry:</span>
                    <h5 class="status">Approved</h5>
                  </div>
                  <div class="values">
                    <span>Enquiry For:</span>
                    <h5>Loan Amount</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default TotalEnquiries
