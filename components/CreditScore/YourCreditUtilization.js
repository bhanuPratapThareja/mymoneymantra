const YourCreditUtilization = () => {
  return (
    <section data-aos="fade-up" class="banner container paymentRank aos-init aos-animate">
      <div class="paymentRank-wrapper">
        <div class="paymentRank-wrapper-head">
          <h2>Your Credit Utilization</h2>
          <img class="underline-img" src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_rank/underline.png" alt="" />
        </div>
        <div class="paymentRank-wrapper-content">
          <div class="paymentRank-wrapper-content-left left-mobile-view">
            <div class="value-utilisation">
              <h1>8</h1>
            </div>
          </div>
          <div class="paymentRank-wrapper-content-right">
            <p>What does your percentage reflect?</p>
            <div class="progress-bar">
              <img src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_utilization/utilization-meter.png" alt="" />
            </div>
            <div class="grading-section">
              <div class="grading-section-left">
                <div class="grade-block utilization-block">
                  <div class="blocks red-block"></div>
                  <span>Very Poor &lt;80%</span>
                </div>
                <div class="grade-block utilization-block">
                  <div class=" blocks yellow-block"></div>
                  <span>Average 30%-49%</span>
                </div>
              </div>
              <div class="grading-section-right">
                <div class="grade-block utilization-block">
                  <div class="blocks orange-block"></div>
                  <span>Poor 50%-80%</span>
                </div>
                <div class="grade-block utilization-block">
                  <div class="blocks green-block"></div>
                  <span>Excellent 0-29%</span>
                </div>
              </div>
            </div>
            <hr />
            <div class="formula-section">
              <div class="formula-section-left">
                <span>Credit Utilization-</span>
              </div>
              <div class="formula-section-right">
                <span>Total Card Balance</span>
                <hr />
                <span>Total Credit Limit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default YourCreditUtilization
