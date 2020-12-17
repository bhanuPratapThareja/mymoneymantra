import Strapi from '../providers/strapi'

const TrendingOffers = props => {
    const strapi = new Strapi()

    const redirectToDetailsPage = (bank, product) => {
        const path = Router.query.path[0]
        if (!bank || !product) {
           Router.push('/404')
           return
        }
        Router.push(`/${path}/${bank}/${product}`)
     }
  
     if(!props.data.cards.length){
        return null
     }


    return (
        <section data-aos="fade-up" className="container popular-card-container">
            <div className="popular-cards">
                <h2>Trending Offers</h2>
                <div className="popular-cards-slider" id="trending-offers-sec">

                {props.data.cards.map(offer => {
                     const { id, bank, product_name, card_features, annual_fee, usp_highlights, slug } = offer
                     return (
                        <div className="popular-cards-slider-card" key={id} onClick={() => redirectToDetailsPage(bank.slug, slug)}>
                           <div className="popular-cards-slider-card-top">
                              <div className="head">
                                 <h3><b className="card_name">{bank.bank_name}</b><br />{product_name}</h3>
                                 <img src={`${strapi.baseUrl}${bank.bank_logo.url}`} />
                              </div>
                              <div className="content">
                                 <ul>
                                    {card_features.map(feature => <li key={feature.id}>{feature.card_feature}</li>)}
                                 </ul>
                              </div>
                              {annual_fee ? <div className="fee">
                                 <h5><b>₹{annual_fee.fy_annual_fee}</b> Annual fee</h5>
                              </div> : null}
                           </div>
                           <div className="popular-cards-slider-card-bottom">
                              <div>
                                 <h5>{usp_highlights}</h5>
                              </div>
                           </div>
                        </div>
                     )
                  })}

                </div>
            </div>
        </section>
    )
}

export default TrendingOffers