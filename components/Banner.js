
import Strapi from '../providers/strapi'

const Banner = props => {

 const strapi = new Strapi()

    function renderUspCards(uspCards) {
        return uspCards.map(card => {
            return (
                <div className="banner-features-block" key={card.id}>
                    <img src={`${strapi.baseUrl}${card.image.url}`} alt={card.image.name} />
                    <h3>{card.heading}</h3>
                    <p>{card.sub_text}</p>
                </div>
            )
        })
    }

    const { heading, sub_text, button, image,usp_cards } = props.banner

    return (
        <section className="banner">
            <div className="banner-wrapper">
                <div className="normal-banner">
                    <h1>{heading}</h1>
                    <p>{sub_text}</p>
                    <button>{button}</button>
                </div>
                <img className="banner-card" src={`${strapi.baseUrl}${image.url}`} alt={image.name} />
            </div>

            {usp_cards ? <div className="container banner-features-container">
                <div className="banner-features">
                    {renderUspCards(usp_cards)}
                </div>
            </div> : null}

        </section>
    )
}

export default Banner