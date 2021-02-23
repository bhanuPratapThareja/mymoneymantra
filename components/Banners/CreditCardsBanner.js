import Image from '../ImageComponent/ImageComponent'

const CreditCardsBanner = props => {
    const { product_banner_heading, product_banner_sub_text,
        product_banner_image, product_banner_button_text,
        product_banner_button_url } = props.data.product_banner

    return (
        <div className="combined-wrapper">
            <section className="banner">
                <div className="banner-wrapper">
                    <span dangerouslySetInnerHTML={{ __html: product_banner_heading }}></span>
                    <span dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></span>
                    {product_banner_button_text ?
                        <button onClick={props.goToShortForm}>{product_banner_button_text}</button>
                        : null}
                    {/* <Image className="banner-card" image={product_banner_image} /> */}
                    <img className="banner-card" src="/assets/images/credit-card-flow/Credit_Card_1_f9f70fd273_dcd2872201.png" alt="cc_image" />
                </div>
            </section>
        </div>
    ) 
}

export default CreditCardsBanner