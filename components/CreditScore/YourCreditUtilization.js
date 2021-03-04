import classNames from 'classnames'

const YourCreditUtilization = ({ creditUtilization }) => {
  return (
    <section
      data-aos="fade-up"
      className="banner container paymentRank aos-init aos-animate"
    >
      <div className="paymentRank-wrapper">
        <div className="paymentRank-wrapper-head">
          <h2>Your Credit Utilization</h2>
          <img
            className="underline-img"
            src="/assets/images/credit-card-flow/green-underline.png"
            alt=""
          />
        </div>
        <div className="paymentRank-wrapper-content">
          <div className="paymentRank-wrapper-content-left left-mobile-view">
            <div
              className={classNames('value-utilisation', {
                'green-circle':
                  parseInt(creditUtilization) >= 0 &&
                  parseInt(creditUtilization) <= 29,
                'yellow-circle':
                  parseInt(creditUtilization) >= 30 &&
                  parseInt(creditUtilization) <= 49,
                'orange-circle':
                  parseInt(creditUtilization) >= 50 &&
                  parseInt(creditUtilization) <= 80,
                'red-circle': parseInt(creditUtilization) > 80,
              })}
            >
              <h1>{creditUtilization}</h1>
            </div>
          </div>
          <div className="paymentRank-wrapper-content-right">
            <p>What does your percentage reflect?</p>
            <div className="progress-bar">
              <img
                src="/assets/images/CP_profile/CP_utilization/utilization-meter.png"
                alt=""
              />
            </div>
            <div className="grading-section">
              <div className="grading-section-left">
                <div className="grade-block utilization-block">
                  <div className="blocks red-block"></div>
                  <span>Very Poor &lt;80%</span>
                </div>
                <div className="grade-block utilization-block">
                  <div className=" blocks yellow-block"></div>
                  <span>Average 30%-49%</span>
                </div>
              </div>
              <div className="grading-section-right">
                <div className="grade-block utilization-block">
                  <div className="blocks orange-block"></div>
                  <span>Poor 50%-80%</span>
                </div>
                <div className="grade-block utilization-block">
                  <div className="blocks green-block"></div>
                  <span>Excellent 0-29%</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="formula-section">
              <div className="formula-section-left">
                <span>Credit Utilization-</span>
              </div>
              <div className="formula-section-right">
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
