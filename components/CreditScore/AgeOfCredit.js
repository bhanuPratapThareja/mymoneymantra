const AgeOfCredit = ({ creditAge }) => {
  return (
    <section data-aos="fade-up" className="banner container paymentRank aos-init aos-animate">
      <div className="paymentRank-wrapper">
        <div className="paymentRank-wrapper-head">
          <h2>Your Age of Credit</h2>
          <img className="underline-img" src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_rank/underline.png" alt="" />
        </div>
        <div className="paymentRank-wrapper-content">
          <div className="paymentRank-wrapper-content-left left-mobile-view">
            <div className="value-age">
              <h2>{creditAge}</h2>
            </div>
          </div>
          <div className="paymentRank-wrapper-content-right">
            <p>What does this age reflect?</p>
            <div className="progress-bar">
              <img src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_rank/meter.png" alt="" />
            </div>
            <div className="grading-section">
              <div className="grading-section-left">
                <div className="grade-block age-credit-block">
                  <div className="blocks red-block"></div>
                  <span>Average 3 Years</span>
                </div>
                <div className="grade-block age-credit-block">
                  <div className=" blocks yellow-block"></div>
                  <span>Very Good 5-7 Years</span>
                </div>
              </div>
              <div className="grading-section-right">
                <div className="grade-block age-credit-block">
                  <div className="blocks orange-block"></div>
                  <span>Good 3-5 Years</span>
                </div>
                <div className="grade-block age-credit-block">
                  <div className="blocks green-block"></div>
                  <span>Excellent 7+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgeOfCredit
