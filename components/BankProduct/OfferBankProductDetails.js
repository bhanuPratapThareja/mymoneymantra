const OfferBankProductDetails = props => {
    const { annual_fee, eligibility_criteria, joining_bonus, logo, points_and_rewards } = props.data;
    return (
        <div className="c-detail-page">
            <section className="container annual-fee">
                <div className="annual-fee-wrapper">
                    <div className="left">
                        <h3>{points_and_rewards.headimg}</h3>
                        <ul>
                            <li>Earn 10 reward points for every ₹125 spent at apparel & department stores</li>
                            <li>Instant Redemption at select partner stores</li>
                            <li>Spend and get up to 300 bonus rewards points in a month</li>
                            <li>Get 5% Cashback on all utility bill payments through Citibank Online Bill Pay</li>
                        </ul>
                    </div>
                    <div className="right">
                        <h3>{annual_fee.heading}</h3>
                        <p className="right-para">{annual_fee.annual_fee_fy}</p>
                        <p className="right-para">{annual_fee.annual_fee_fy}</p>
                        <h3>{joining_bonus.heading}</h3>
                        <p>{joining_bonus.sub_text}</p>
                        <h3>{eligibility_criteria.heading}</h3>
                        <p>{eligibility_criteria.sub_text}</p>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default OfferBankProductDetails