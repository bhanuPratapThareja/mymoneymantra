import Strapi from '../providers/strapi'

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

    function goToShortFormPage() {
        window.scrollTo({
            top: 1000,
            //behavior: 'smooth'
        });
    }

    return (
        <section className="banner">
            <div className="banner-wrapper">
                <div className="normal-banner">
                    <div dangerouslySetInnerHTML={{ __html: heading }}></div>
                    <p>{sub_text}</p>
                    <button onClick={goToShortFormPage}>{button}</button>
                </div>
                <img className="banner-card" src={`${strapi.baseUrl}${image.url}`} alt={image.name} />
            </div>

            {usp_cards ? <div className="container banner-features-container">
                <div className="banner-features">
                    {renderUspCards(usp_cards)}
                </div>
            </div> : null}

            <style jsx>{`
                .normal-banner > h1 {
                    color: green !important;
                }
            `}</style>

        </section>
    )
}

export default Banner