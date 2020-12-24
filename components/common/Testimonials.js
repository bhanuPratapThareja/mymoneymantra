import Image from '../ImageComponent/ImageComponent'

const Testimonials = props => {
    return (
        <section data-aos="fade-up" className="testimonial aos-init">
            <div className="container testimonial-wrapper">
                {props.data.statistics.map(testimonial => {
                    const { id, image, stats, sub_text } = testimonial
                    return (
                        <div className="testimonial-wrapper-block" key={id}>
                            <Image image={image} />
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