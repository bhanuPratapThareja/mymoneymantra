const CreditOverview = () => {
  return (
    <section data-aos="fade-up" className="container creditOverview aos-init aos-animate">
      <div className="creditOverview-head">
        <h2>Credit Overview</h2>
      </div>
      <div className="creditOverview-wrapper">
        <div className="creditOverview-wrapper-left">
          <div className="creditOverview-wrapper-left-head">
            <h3>Total Current Credit</h3>
            <h2>₹1,24,800</h2>
            <hr />
          </div>
          <div className="creditOverview-wrapper-left-icon">
            <div className="three-holder">
              <div className="blue">
                <h2>60,000</h2>
              </div>
              <div className="green">
                <h3>35,000</h3>
              </div>
              <div className="red">
                <h6>5,000</h6>
              </div>
            </div>
          </div>
          <div className="creditOverview-wrapper-left-content">
            <div className="creditOverview-components">
              <img src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/blue.png" alt="" />
              <p className="sector">Credit Cards-</p>
              <p className="percentages">60%</p>
            </div>
            <div className="creditOverview-components">
              <img src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/green.png" alt="" />
              <p className="sector">Automobile Loan-</p>
              <p className="percentages">35%</p>
            </div>
            <div className="creditOverview-components">
              <img src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/red.png" alt="" />
              <p className="sector">Loan Against Properity-</p>
              <p className="percentages">10%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreditOverview
