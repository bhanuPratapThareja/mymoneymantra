import Image from '../../ImageComponent/ImageComponent'
import { manageRichText } from '../../../Utils/richText'

const CreditCardsBanner = props => {
    const { product_banner_heading, product_banner_sub_text,
        product_banner_image, product_banner_button_text,
        product_banner_button_url } = props.data.product_banner

    const heading = manageRichText(product_banner_heading)

    function goToShortFormPage() {
        window.scrollTo({ top: 1000 })
    }

    return (
        <div className="combined-wrapper">
            <section className="banner">
                <div className="banner-wrapper">
                    <span dangerouslySetInnerHTML={{ __html: heading }}></span>
                    <span dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></span>
                    {product_banner_button_text ?
                        <button onClick={goToShortFormPage}>{product_banner_button_text}</button>
                        : null}
                    <Image className="banner-card" image={product_banner_image} />
                </div>
            </section>
        </div>
    )
}

export default CreditCardsBanner