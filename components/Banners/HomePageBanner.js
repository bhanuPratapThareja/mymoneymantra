import Image from '../ImageComponent/ImageComponent'

const HomePageBanner = props => {
    const { product_banner_heading, product_banner_sub_text, product_banner_image } = props.data.product_banner
    
    return (
        <div className="combined-wrapper">
            <section className="banner">
                <div className="banner-wrapper">
                    <span dangerouslySetInnerHTML={{ __html: product_banner_heading }}></span>
                    <span dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></span>
                </div>
                <Image className="banner-card" image={product_banner_image} />
                <div className="banner-content">
                    <div className="container banner-content-wrapper">
                        <span dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePageBanner