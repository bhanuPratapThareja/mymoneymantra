import Strapi from '../../providers/strapi'

const Banner = props => {
    const strapi = new Strapi()
    const { product_banner_heading, product_banner_sub_text,
        product_banner_image, product_banner_button_text, product_banner_button_url } = props.data.product_banner

    function goToShortFormPage() {
        window.scrollTo({ top: 1000 })
    }

    return (
        <section className="banner">
            <div className="banner-wrapper">
                <div className="normal-banner">
                    <div dangerouslySetInnerHTML={{ __html: product_banner_heading }}></div>
                    <div dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></div>
                    {product_banner_button_text ?
                        <button onClick={goToShortFormPage}>{product_banner_button_text}</button>
                        : null}
                </div>
                <img
                    className="banner-card"
                    src={`${strapi.baseUrl}${product_banner_image.url}`} alt={product_banner_image.name}
                />
            </div>
        </section>
    )
}

export default Banner