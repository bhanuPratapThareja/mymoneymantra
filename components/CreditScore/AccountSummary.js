const AccountSummary = () => {
  return (
    <section className="product-offer accountSection">
      <div className="container account-summary-head">
        <h2>Account Summary</h2>
      </div>
      <div className="product-wrapper">
        <div className="container head">
          <div className="switch-tab tab">
            <button className="tablinks active" onclick="appStatus(event, 'accepted')">
              <span></span>
              <h2>Active</h2>
            </button>
            <button className="tablinks" onclick="appStatus(event, 'rejected')">
              <span></span>
              <h2>Closed</h2>
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
              <div className="account-number">
                <p>xxxx xxxx xxxx 6338</p>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <span>Issued On:</span>
                    <h5>02 Feb 2020</h5>
                  </div>
                  <div className="value">
                    <span>Last Payment Date:</span>
                    <h5>₹12 Mar 2020</h5>
                  </div>
                  <div className="value">
                    <span>Current Balance:</span>
                    <h5>₹7,20,000</h5>
                  </div>
                  <div className="value">
                    <span>Credit Limit:</span>
                    <h5>₹8,00,000</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom">
              <div>
                <h5>On-time Payment</h5>
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
              <div className="account-number">
                <p>xxxx xxxx xxxx 6338</p>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <span>Issued On:</span>
                    <h5>02 Feb 2020</h5>
                  </div>
                  <div className="value">
                    <span>Last Payment Date:</span>
                    <h5>₹12 Mar 2020</h5>
                  </div>
                  <div className="value">
                    <span>Current Balance:</span>
                    <h5>₹7,20,000</h5>
                  </div>
                  <div className="value">
                    <span>Credit Limit:</span>
                    <h5>₹8,00,000</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom delayed-bottom">
              <div>
                <h5>Delayed</h5>
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
              <div className="account-number">
                <p>xxxx xxxx xxxx 6338</p>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <span>Issued On:</span>
                    <h5>02 Feb 2020</h5>
                  </div>
                  <div className="value">
                    <span>Last Payment Date:</span>
                    <h5>₹12 Mar 2020</h5>
                  </div>
                  <div className="value">
                    <span>Current Balance:</span>
                    <h5>₹7,20,000</h5>
                  </div>
                  <div className="value">
                    <span>Credit Limit:</span>
                    <h5>₹8,00,000</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom">
              <div>
                <h5>On-time Payment</h5>
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
              <div className="account-number">
                <p>xxxx xxxx xxxx 6338</p>
              </div>
              <div className="app_progress_card_content">
                <div className="left">
                  <div className="value">
                    <span>Issued On:</span>
                    <h5>02 Feb 2020</h5>
                  </div>
                  <div className="value">
                    <span>Last Payment Date:</span>
                    <h5>₹12 Mar 2020</h5>
                  </div>
                  <div className="value">
                    <span>Current Balance:</span>
                    <h5>₹7,20,000</h5>
                  </div>
                  <div className="value">
                    <span>Credit Limit:</span>
                    <h5>₹8,00,000</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom">
              <div>
                <h5>On-time Payment</h5>
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
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
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
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
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
                  Platinum Delight Credit Card
                </h3>
                <img src="https://the1thing.github.io/MyMoneyMantra/build/images/icons/citi-logo.png" />
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
      </div>
    </section>
  )
}

export default AccountSummary
