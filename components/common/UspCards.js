import Image from '../ImageComponent/ImageComponent'

const UspCards = props => {
    function renderUspCards(uspCards) {
        return uspCards.map(card => {
            return <div className="banner-features-block" key={card.id}>
                <Image image={card.usp_cards_image} />
                <div dangerouslySetInnerHTML={{ __html: card.usp_cards_heading }}></div>
                <div dangerouslySetInnerHTML={{ __html: card.usp_cards_sub_text }}></div>
            </div>
        })
    }

    if (!props.data.usp_cards) {
        return null
    }

    return (
        <div  data-aos="fade-up" className="container banner-features-container aos-init">
            <div className="banner-features">
                {renderUspCards(props.data.usp_cards)}
            </div>
        </div>
    )
}

export default UspCards