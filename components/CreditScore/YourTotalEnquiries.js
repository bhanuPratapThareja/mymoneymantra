import classNames from 'classnames'

const YourTotalEnquiries = ({ totalEnquiries }) => {
  return (
    <section
      data-aos="fade-up"
      className="banner container paymentRank aos-init aos-animate"
    >
      <div className="paymentRank-wrapper">
        <div className="paymentRank-wrapper-head">
          <h2>Your Total Enquiries</h2>
          <img
            className="underline-img"
            src="/assets/images/credit-card-flow/green-underline.png"
            alt="underline"
          />
        </div>
        <div className="paymentRank-wrapper-content">
          <div className="paymentRank-wrapper-content-left left-mobile-view">
            {/* <img
              className="rank-desktop"
              src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_enquires/enquiries.png"
              alt="enquiries"
            />
            <img
              className="rank-mobile"
              src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/CP_enquires/enquiries-mobile.png"
              alt="enquiries-mobile"
            /> */}
            <div
              className={classNames('value-enquiries', {
                'green-circle': totalEnquiries < 3,
                'yellow-circle': totalEnquiries >= 4 && totalEnquiries <= 6,
                'orange-circle': totalEnquiries >= 7 && totalEnquiries <= 10,
                'red-circle': totalEnquiries > 10,
              })}
            >
              <h2>{totalEnquiries}</h2>
            </div>
          </div>
          <div className="paymentRank-wrapper-content-right">
            <p>What does your rank reflect?</p>
            <div className="progress-bar">
              <img
                src="/assets/images/CP_profile/CP_rank/meter.png"
                alt="enquiry-meter"
              />
            </div>
            <div className="grading-section">
              <div className="grading-section-left">
                <div className="grade-block">
                  <div className="blocks red-block"></div>
                  <span>Very Poor 10+</span>
                </div>
                <div className="grade-block">
                  <div className=" blocks yellow-block"></div>
                  <span>Average 4-6</span>
                </div>
              </div>
              <div className="grading-section-right">
                <div className="grade-block">
                  <div className="blocks orange-block"></div>
                  <span>Poor 7-10</span>
                </div>
                <div className="grade-block">
                  <div className="blocks green-block"></div>
                  <span>Excellent &lt;3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default YourTotalEnquiries
