import MarkDown from '../../Utils/markdown'

const OfferBankProductDetails = props => {
    return (
        <div className="c-detail-page">
            <section className="container annual-fee">
                <div className="annual-fee-wrapper">
                    {props.data.offers.map(offer => {
                        return (
                            <div className={offer.position}>
                                <h1>{offer.heading}</h1>
                                <MarkDown markDown={offer.content} />
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default OfferBankProductDetails