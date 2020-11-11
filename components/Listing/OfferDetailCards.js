const OfferDetailCards = () => {
    return (
        <section className="container long-cards">
            <div className="long-cards-wrapper">
            <div className="long-cards-wrapper-card">
                <img className="recommended" src="../../images/icons/stamp.svg" />
                <div className="top">
                    <div className="name">
                        <img className="mob-logo" src="../../images/icons/citi-logo.png" />

                        <h3><span>Citibank</span><br />Rewards Credit Card</h3>
                        <div>
                            <img src="../../images/listings/card.svg" />
                        </div>
                    </div>
                    <div className="content">
                        <ul>
                            <li>Earn 10 reward points for every ₹125 spent at apparel & department stores </li>
                            <li>Instant Redemption at select partner stores</li>
                            <li>Spend and get up to 300 bonus rewards points in a month</li>
                            <li>Get 5% Cashback on all utility bill payments through Citibank Online Bill Pay</li>
                        </ul>
                    </div>
                    <div className="fee">
                        <h5>Annual fee:</h5>
                        <p><b>₹2500</b> (First year)</p>
                        <p><b>₹2500</b> (Second year onwards)</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="lifetime">
                        <h5>Lifetime reward points</h5>
                    </div>
                    <div className="options">
                        <button id="view-details">View Details</button>
                        <button id="apply-now">Apply Now</button>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default OfferDetailCards