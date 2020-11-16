import Strapi from '../providers/strapi'
import Router from 'next/router';
import Link from 'next/link'

const Banner = props => {
    const strapi = new Strapi()
    const { heading, sub_text, button, image, usp_cards } = props.data

    function renderUspCards(uspCards) {
        return uspCards.map(card => {
            return <div className="banner-features-block" key={card.id}>
                <img src={`${strapi.baseUrl}${card.image.url}`} alt={card.image.name} />
                <h3>{card.heading}</h3>
                <p>{card.sub_text}</p>
            </div>
        })
    }

    function goToPage() {
        Router.push(`${basePath}/loan-listing`)
    }

    return (
        <section className="banner">
            <div className="banner-wrapper">
                <div className="normal-banner">
                    {/* <h1>{heading}</h1> */}
                    <h1><b>Credit cards</b> for <br />all your needs.</h1>
                    <p>{sub_text}</p>
                    <button onClick={goToPage}>{button}</button>
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