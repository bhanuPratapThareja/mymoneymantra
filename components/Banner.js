import { useState, useEffect } from 'react'
import Strapi from '../providers/strapi'

const Banner = props => {
    const strapi = new Strapi()
    const [uspCards, setUspCards] = useState([])

    useEffect(() => {
        async function getUspCardsData() {
            const strapi = new Strapi()
            const uspCardsData = await strapi.processReq('GET', 'banner-cards')
            if (uspCardsData) {
                const { banner_cards: usp_cards } = uspCardsData
                setUspCards(usp_cards)
            }
        }
        getUspCardsData()
    }, [])

    function renderUspCards() {
        return uspCards.map(card => {
            return (
                <div className="banner-features-block" key={card.id}>
                    <img src={`${strapi.baseUrl}${card.image.url}`} alt={card.image.name} />
                    <h3>{card.heading}</h3>
                    <p>{card.description}</p>
                </div>
            )
        })
    }

    const { heading, sub_text, button, image } = props.banner;

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

            {uspCards ? <div className="container banner-features-container">
                <div className="banner-features">
                    {renderUspCards()}
                </div>
            </div> : null}

        </section>
    )
}

export default Banner