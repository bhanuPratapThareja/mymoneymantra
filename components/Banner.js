import Strapi from '../providers/strapi'

const Banner = props => {
    const strapi = new Strapi()
    const { heading, sub_text, button, image } = props.data

    function goToShortFormPage() {
        window.scrollTo({ top: 1000 })
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
        </section>
    )
}

export default Banner