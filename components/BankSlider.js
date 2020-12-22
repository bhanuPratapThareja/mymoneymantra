import Strapi from '../providers/strapi'

const BankSlider = props => {
    const strapi = new Strapi()
    const { bank_slider_heading, bank_slider_images } = props.data.bank_slider

    return (
        <section data-aos="fade-up" className="banks-holder aos-init">
            <div className="blue-patch"></div>
            <div className="container banks">
                <div dangerouslySetInnerHTML={{ __html: bank_slider_heading }}></div>
                <div className="banks-slider">
                    {bank_slider_images.map(image => {
                        return (
                            <div className="slide_cell" key={image.id}>
                                <img src={`${strapi.baseUrl}${image.url}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default BankSlider