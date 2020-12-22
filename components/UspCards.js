import Strapi from '../providers/strapi';

const UspCards = props => {
    const strapi = new Strapi()

    function renderUspCards(uspCards) {
        return uspCards.map(card => {
            return <div className="banner-features-block" key={card.id}>
                <img src={`${strapi.baseUrl}${card.usp_cards_image.url}`} alt={card.usp_cards_image.name} />
                <div dangerouslySetInnerHTML={{ __html: card.usp_cards_heading }}></div>
                <div dangerouslySetInnerHTML={{ __html: card.usp_cards_sub_text }}></div>
            </div>
        })
    }

    if (!props.data.usp_cards) {
        return null
    }

    return (
        <div className="container banner-features-container">
            <div className="banner-features">
                {renderUspCards(props.data.usp_cards)}
            </div>
        </div>
    )
}

export default UspCards