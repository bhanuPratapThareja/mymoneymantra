import classNames from 'classnames'

const PaymentRank = ({ rank }) => {
  return (
    <section
      data-aos="fade-up"
      className="banner container paymentRank aos-init"
    >
      <div className="paymentRank-wrapper">
        <div className="paymentRank-wrapper-head">
          <h2>Your Payment Rank</h2>
          <img
            className="underline-img"
            src="/assets/images/credit-card-flow/green-underline.png"
            alt=""
          />
        </div>
        <div className="paymentRank-wrapper-content">
          <div className="paymentRank-wrapper-content-left left-mobile-view">
            <div
              className={classNames('value-rank', {
                'red-circle': parseFloat(rank) < 5,
                'orange-circle': parseFloat(rank) < 9 && parseFloat(rank) >= 5,
                'yellow-circle':
                  parseFloat(rank) < 9.9 && parseFloat(rank) >= 9,
                'green-circle': parseFloat(rank) === 10,
              })}
            >
              <h1>{rank}</h1>
            </div>
          </div>
          <div className="paymentRank-wrapper-content-right">
            <p>What does your rank reflect?</p>
            <div className="progress-bar">
              <img src="/assets/images/CP_profile/CP_rank/meter.png" alt="" />
            </div>
            <div className="grading-section">
              <div className="grading-section-left">
                <div className="grade-block">
                  <div className="blocks red-block"></div>
                  <span>Very Poor &lt;5</span>
                </div>
                <div className="grade-block grade-block-bottom">
                  <div className=" blocks yellow-block"></div>
                  <span>Average 9-9.9</span>
                </div>
              </div>
              <div className="grading-section-right">
                <div className="grade-block">
                  <div className="blocks orange-block"></div>
                  <span>Poor 5-9</span>
                </div>
                <div className="grade-block grade-block-bottom">
                  <div className="blocks green-block"></div>
                  <span>Excellent 10</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="formula-section">
              <div className="formula-section-left">
                <span>Your Payment Rank-</span>
              </div>
              <div className="formula-section-right">
                <span>Total On Time Payments</span>
                <hr />
                <span>Total Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentRank
