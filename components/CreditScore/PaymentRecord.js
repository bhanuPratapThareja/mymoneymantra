const PaymentRecord = () => {
  return (
    <section className="product-offer paymentSection">
      <div className="container account-summary-head">
        <h2>Payment Record</h2>
      </div>
      <div className="product-wrapper">
        <div className="container head">
          <div className="switch-tab tab">
            <button className="tablinks active" onclick="appStatus(event, 'accepted')">
              <span></span>
              <h2>Delayed Payments</h2>
            </button>
            <button className="tablinks" onclick="appStatus(event, 'rejected')">
              <span></span>
              <h2>On-Time Payments</h2>
            </button>
            <span className="line"></span>
          </div>
        </div>
        <div id="accepted" className="cards-wrapper container tabcontent">
          <div className="popular-cards-slider-card">
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">Citi Bank</b>
                  <br />
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom delayed-bottom">
              <div>
                <h5>Due on: 12 May 2020</h5>
              </div>
            </div>
          </div>
          <div className="popular-cards-slider-card">
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">Citi Bank</b>
                  <br />
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom delayed-bottom">
              <div>
                <h5>Due on: 12 May 2020</h5>
              </div>
            </div>
          </div>
          <div className="popular-cards-slider-card">
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">Citi Bank</b>
                  <br />
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom delayed-bottom">
              <div>
                <h5>Due on: 12 May 2020</h5>
              </div>
            </div>
          </div>
          <div className="popular-cards-slider-card">
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">Citi Bank</b>
                  <br />
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom delayed-bottom">
              <div>
                <h5>Due on: 12 May 2020</h5>
              </div>
            </div>
          </div>
          <div className="popular-cards-slider-card">
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">Citi Bank</b>
                  <br />
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom delayed-bottom">
              <div>
                <h5>Due on: 12 May 2020</h5>
              </div>
            </div>
          </div>
        </div>

        <div id="rejected" className="cards-wrapper container tabcontent">
          <div className="popular-cards-slider-card">
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">Citi Bank</b>
                  <br />
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
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
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
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
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
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
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
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
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
              </div>
              <div className="account-number payment-record-account-number">
                <h2>xxxx xxxx xxxx 6338</h2>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <h6 className="delayed-days">Delayed by 11 Days</h6>
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
      </div>
    </section>
  )
}

export default PaymentRecord
