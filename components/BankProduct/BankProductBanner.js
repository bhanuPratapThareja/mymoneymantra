import Strapi from '../../providers/strapi'

const BankProductBanner = props => {
    const strapi = new Strapi()
    const { button, heading, image, sub_text } = props.data;
    return (
        <div className="credit-card-flow c-detail-page">
            <div className="combined-wrapper">
            <section className="banner container">
                <div className="banner-wrapper">
                    <div dangerouslySetInnerHTML={{ __html: heading }}></div>
                    <p>{sub_text}</p>
                    <button>{button}</button>
                </div>
                <div>
                    <img className="banner-card" src={`${strapi.baseUrl}${image.url}`} alt={image.name} />
                </div>
            </section>
            </div>
        </div>
    )
}

export default BankProductBanner;