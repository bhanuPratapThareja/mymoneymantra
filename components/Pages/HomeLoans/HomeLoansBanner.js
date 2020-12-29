import Image from '../../ImageComponent/ImageComponent'

const HomeLoansBanner = props => {
    const { product_banner_heading, product_banner_sub_text,
        product_banner_image, product_banner_button_text } = props.data.product_banner
    console.log(props)
    return (
        <div className="combined-wrapper">
            <section className="banner">
                <div className="banner-wrapper new-banner-wrapper new-health-wrapper">
                    <div className="normal-banner new-normal-banner">
                        <span dangerouslySetInnerHTML={{ __html: product_banner_heading }}></span>
                        <span dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></span>
                        <button>{product_banner_button_text}</button>
                    </div>
                    <Image className="edit-class" image={product_banner_image} />
                </div>
            </section>
        </div>
    )
}

export default HomeLoansBanner