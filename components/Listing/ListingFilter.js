import { onCloseFilter } from '../../Utils/loanListingFilterHandler'

class ListingFilter extends React.Component {

    state = {
        banks: [],

    }

    componentDidMount() {
        console.log(this.props.filters)
    }


    onApplyFilter = () => {
        onCloseFilter()
    }

    render() {
        return (
            <section className="listing-modal mm-modal" id="listing-filter-show">
                <div className="overlay"></div>
                <div className="mm-modal-wrapper">
                    <div className="head">
                        <h3>Filters</h3>
                        <img src="/assets/images/icons/cross.svg" className="filter-cross" onClick={onCloseFilter} />
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
                                    <h5>Promotions</h5>
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
                                    <button type="button" onClick={this.onApplyFilter}>Apply Filters</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        )
    }

}

export default ListingFilter