const CreditScoreBanner = () => {
  return (
    <section
      data-aos="fade-up"
      className="container banner new-credit-wrap aos-init aos-animate"
    >
      <div className="creditScore-wrapper">
        <div className="creditScore-wrapper-left">
          <div>
            <h2>Your Credit Score</h2>
            <img
              className="underline-img"
              src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/underline.png"
              alt=""
            />
          </div>
          <div className="score-scale-img">
            <img
              src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/score-scale.png"
              alt=""
            />
          </div>
        </div>
        <div className="creditScore-wrapper-right">
          <div>
            <h2>Your Credit Score History</h2>
            <img
              className="underline-img"
              src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/underline.png"
              alt=""
            />
          </div>
          <div className="score-graph-img">
            <h2>Graph</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreditScoreBanner
