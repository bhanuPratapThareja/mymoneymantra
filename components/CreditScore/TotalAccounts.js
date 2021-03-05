import classNames from 'classnames'

const TotalAccounts = ({ totalAccount }) => {
  return (
    <section
      data-aos="fade-up"
      className="banner container paymentRank aos-init aos-animate"
    >
      <div className="paymentRank-wrapper">
        <div className="paymentRank-wrapper-head">
          <h2>Your Total Accounts</h2>
          <img
            className="underline-img"
            src="/assets/images/credit-card-flow/green-underline.png"
            alt=""
          />
        </div>
        <div className="paymentRank-wrapper-content">
          <div className="paymentRank-wrapper-content-left mobile-view">
            {/* <img className="rank-desktop" src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_accounts/accounts.png" alt="" />
            <img className="rank-mobile" src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_accounts/accounts-mobile.png" alt="" /> */}
            {/* <h2>{totalAccount}</h2> */}
            <div
              className={classNames('value-accounts', {
                'green-square': totalAccount >= 5,
                'yellow-square': totalAccount >= 3 && totalAccount < 5,
                'orange-square': totalAccount < 3,
              })}
            >
              <h2>{totalAccount} Accounts</h2>
            </div>
          </div>
          <div className="paymentRank-wrapper-content-right">
            <p>What does this reflect?</p>
            <div className="progress-bar">
              <img
                src="/assets/images/CP_profile/CP_accounts/accounts-meter.png"
                alt=""
              />
            </div>
            <div className="grading-section">
              <div className="grading-section-left">
                <div className="grade-block account-block">
                  <div className="blocks orange-block"></div>
                  <span>Fair 1-2 Accounts</span>
                </div>
                <div className="grade-block account-block">
                  <div className=" blocks orange-block"></div>
                  <span>Excellent 5+ Accounts</span>
                </div>
              </div>
              <div className="grading-section-right">
                <div className="grade-block account-block">
                  <div className="blocks yellow-block"></div>
                  <span>Good 3-5 Accounts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TotalAccounts
