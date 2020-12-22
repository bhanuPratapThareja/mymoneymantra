import Strapi from '../providers/strapi'

const Testimonials = props => {
    const strapi = new Strapi()
    return (
        <section data-aos="fade-up" className="testimonial aos-init">
            <div className="container testimonial-wrapper">
                {props.data.statistics.map(testimonial => {
                    const { id, image, stats, sub_text } = testimonial
                    return (
                        <div className="testimonial-wrapper-block" key={id}>
                            <img src={`${strapi.baseUrl}${image.url}`} alt={image.name} />
                            <div dangerouslySetInnerHTML={{ __html: stats }}></div>
                            <div dangerouslySetInnerHTML={{ __html: sub_text }}></div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Testimonials