import Strapi from '../../providers/strapi'

const HomePageBanner = props => {

    const strapi = new Strapi()
    const { product_banner_heading, product_banner_sub_text, product_banner_image } = props.data.product_banner
    console.log('inside home page  props.data',props.data.product_banner)
    return (
        <section className="homepage-banner">
            <div className="container homepage-banner-wrapper">
                <div className="homepage-banner-wrapper-left">
                    <div dangerouslySetInnerHTML={{ __html: product_banner_heading }}></div>
                    <div dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></div>
                </div>
                <div className="homepage-banner-wrapper-right">
                    <div className="homepage-banner-wrapper-right-content">
                        <img className="banner-card" src={`${strapi.baseUrl}${product_banner_image.url}`} alt={product_banner_image.name} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePageBanner