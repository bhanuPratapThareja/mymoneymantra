import Link from 'next/link'

const FactorsAffecting = () => {
  return (
    <section
      data-aos="fade-up"
      className="banks-holder factorsSection aos-init aos-animate"
    >
      <div className="blue-patch"></div>
      <div className="container banks">
        <h2 className="factors">
          Factors affecting <br className="blankSpace" />
          <b>Credit Score</b>
        </h2>
        <div className="banks-slider slick-initialized slick-slider">
          <button
            className="slick-prev slick-arrow slick-disabled"
            aria-label="Previous"
            type="button"
            aria-disabled="true"
            style={{ display: 'inline-block' }}
          >
            Previous
          </button>
          <div
            className="slick-list draggable scroll"
            style={{ overflowX: 'scroll', overflowY: 'hidden' }}
          >
            <div
              className="slick-track"
              style={{
                opacity: 1,
                width: '1116px',
                transform: 'translate3d(0px, 0px, 0px)',
              }}
            >
              <div
                className="slick-slide slick-current slick-active"
                data-slick-index="0"
                aria-hidden="false"
                style={{ width: '186px' }}
              >
                <div>
                  <div
                    className="slide_cell"
                    style={{ width: '100%', display: 'inline-block' }}
                  >
                    <Link href="/credit-score">
                      <a>
                        <img
                          src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/payment-history.svg"
                          alt="payment-history"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="slick-slide slick-active"
                data-slick-index="1"
                aria-hidden="false"
                style={{ width: '186px' }}
              >
                <div>
                  <div
                    className="slide_cell"
                    style={{ width: '100%', display: 'inline-block' }}
                  >
                    <Link href="/credit-score/utilization">
                      <a>
                        <img
                          src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/creditcard-utilisation.svg"
                          alt="creditcard-utilisation"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="slick-slide slick-active"
                data-slick-index="2"
                aria-hidden="false"
                style={{ width: '186px' }}
              >
                <div>
                  <div
                    className="slide_cell"
                    style={{ width: '100%', display: 'inline-block' }}
                  >
                    <Link href="/credit-score/age">
                      <a>
                        <img
                          src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/age-of-credit.svg"
                          alt="age-of-credit"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="slick-slide slick-active"
                data-slick-index="3"
                aria-hidden="false"
                style={{ width: '186px' }}
              >
                <div>
                  <div
                    className="slide_cell"
                    style={{ width: '100%', display: 'inline-block' }}
                  >
                    <Link href="/credit-score/accounts">
                      <a>
                        <img
                          src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/total-accounts.svg"
                          alt="total-accounts"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="slick-slide"
                data-slick-index="4"
                aria-hidden="true"
                tabIndex="-1"
                style={{ width: '186px' }}
              >
                <div>
                  <div
                    className="slide_cell"
                    style={{ width: '100%', display: 'inline-block' }}
                  >
                    <Link href="/credit-score/enquiries">
                      <a>
                        <img
                          src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/total-accounts.svg"
                          alt="total-accounts"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="slick-slide"
                data-slick-index="5"
                aria-hidden="true"
                tabIndex="-1"
                style={{ width: '186px' }}
              >
                <div>
                  <div
                    className="slide_cell"
                    style={{ width: '100%', display: 'inline-block' }}
                  >
                    <Link href="/credit-score/rank">
                      <a>
                        <img
                          src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/total-accounts.svg"
                          alt="total-accounts"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="slick-next slick-arrow"
            aria-label="Next"
            type="button"
            aria-disabled="false"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default FactorsAffecting
