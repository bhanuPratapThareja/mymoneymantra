import Image from '../ImageComponent/ImageComponent'

const AboutUs = props => {
    const { why_choose_heading, why_choose_money, why_choose_sub_text } = props.data.why_choose_money_mantra
    return (
        <section data-aos="fade-up" className="aboutUs aos-init">
            <div className="container product-wrapper">
                <div className="product-wrapper-left aboutUs-left">
                    <div dangerouslySetInnerHTML={{ __html: why_choose_heading }}></div>
                    <Image image={why_choose_money} />
                </div>
                <div className="product-wrapper-right aboutUs-right">
                    <div dangerouslySetInnerHTML={{ __html: why_choose_sub_text }}></div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs