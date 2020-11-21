import $ from 'jquery'
import { useEffect } from 'react'

const ListingFilter = () => {

    useEffect(() => {
        $(".apply-filter").click(function () {
            $(".filter-cross").closest(".mm-modal").slideToggle(300);
            $('body', "html").css("overflow", "scroll")
        })
    })

    return (
        <section className="listing-modal mm-modal" id="listing-filter-show">
            <div className="overlay"></div>
            <div className="mm-modal-wrapper">
                <div className="head">
                    <h3>Filters</h3>
                    <svg className="filter-cross" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                        fill="white" />
                </svg>
                </div>
                <div className="content">
                    <form>
                        <div className="content-one">
                            <h5>By Bank</h5>
                            <div className="fields-wrapper">
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-1" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-1"><span>
                                            Axis Bank
                                        </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-2" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-2"><span>
                                            HDFC Bank
                                        </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-3" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-3"><span>
                                            American Express
                                        </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-4" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-4"><span>
                                            Kotak Bank
                                        </span></label>
                                    </div>
                                </div>

                                {/* <!--view all--> */}
                                <div className="view-all">
                                    <button>View all
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                                                fill="white" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!--category--> */}
                        <div className="content-one">
                            <h5>By Category</h5>
                            <div className="fields-wrapper">
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-5" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-5"><span>
                                            Shopping
                                        </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-6" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-6"><span>
                                            Travel
                                        </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-7" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-7"><span>
                                            Fuel
                                        </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="f-checkbox-8" name="" value="" readOnly />
                                        <label htmlFor="f-checkbox-8"><span>
                                            Cashback
                                        </span></label>
                                    </div>
                                </div>

                                {/* <!--view all--> */}
                                <div className="view-all">
                                    <button>View all
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                                                fill="white" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!--annual fee--> */}
                        <div className="content-one">
                            <h5>By Annual Fees</h5>
                            <div className="range__slider">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div id="slider-range"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" readOnly />
                                                <input type="hidden" name="max-value" value="" readOnly />
                                            </div>
                                        </div>
                                        <span className="min-max left">₹500</span>
                                        <span className="min-max right">₹5,000+</span>
                                    </div>
                                </div>
                            </div>

                            {/* <!--Promotions--> */}
                            <div className="content-one">
                                <h5>By Category</h5>
                                <div className="shortforms-container">
                                    <input className="lets-checkbox" type="radio" id="instant" name="Category" required />
                                    <input className="lets-checkbox" type="radio" id="welcome" name="Category" required />
                                    <input className="lets-checkbox" type="radio" id="reward" name="Category" required />
                                    <input className="lets-checkbox" type="radio" id="voucher" name="Category" required />

                                    <label htmlFor="instant">Instant Approval</label>
                                    <label htmlFor="welcome">Welcome Gift</label>
                                    <label htmlFor="reward">Reward Points Never Expire</label>
                                    <label htmlFor="voucher">Vouchers & Offers</label>
                                </div>
                            </div>


                            <div className="apply-filter">
                                <button>Apply Filters</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default ListingFilter