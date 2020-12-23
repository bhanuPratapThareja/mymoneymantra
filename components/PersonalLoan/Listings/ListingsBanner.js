const PersonalLoanListingsBanner = props => {
    const { loan_listing_banner_heading } = props.data.loan_listing_banner

    return (
        <section className="container banner">
            <div className="mobile-background"></div>
            <div className="banner-wrapper">
                <div className="top">
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: loan_listing_banner_heading }}></div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="cards">
                        <h3><span id="count">57</span> personal loans</h3>
                    </div>
                    <div className="filter">
                        <button className="filter-option" id="listing-filter">Filters
                        <img src="/assets/images/icons/down-chevron.svg" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PersonalLoanListingsBanner