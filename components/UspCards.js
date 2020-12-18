import Strapi from '../providers/strapi';

const UspCards = props => {
    const strapi = new Strapi()

    function renderUspCards(uspCards) {
        return uspCards.map(card => {
            return <div className="banner-features-block" key={card.id}>
                <img src={`${strapi.baseUrl}${card.image.url}`} alt={card.image.name} />
                <h3>{card.heading}</h3>
                <p>{card.sub_text}</p>
            </div>
        })
    }

    if (!props.data.usp_card) {
        return null
    }

    return (
        <div className="container banner-features-container">
            <div className="banner-features">
                {renderUspCards(props.data.usp_card)}
            </div>
        </div>
    )
}

export default UspCards