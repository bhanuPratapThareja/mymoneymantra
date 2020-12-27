import { manageRichText } from '../../Utils/richText'

const BuySection = props => {
    const { find_and_compare_heading, find_and_compare_sub_text } = props.data.find_and_compare
    const heading = manageRichText(find_and_compare_heading)
    return (
        <section  data-aos="fade-up" className="buy-section aos-init">
            <div className="container buy-section-wrapper">
                <span dangerouslySetInnerHTML={{ __html: heading }}></span>
                <div className="buy-section-wrapper-paragraph">
                    <span dangerouslySetInnerHTML={{ __html: find_and_compare_sub_text }}></span>
                </div>
            </div>
        </section>
    )
}

export default BuySection