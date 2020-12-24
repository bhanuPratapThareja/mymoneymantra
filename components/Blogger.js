import Strapi from '../providers/strapi'
const strapi = new Strapi()

const Blogger = props => {
    const { section_heading, bloggers } = props.data
    const onOpenBlog = url => {
    }

    return (
        <section data-aos="fade-up" className="container blog-container aos-init">
            <div className="blog">
                <div dangerouslySetInnerHTML={{ __html: section_heading }}></div>
                <div className="blog-wrapper" id="slider_blogs">

                    {bloggers.map((blog, i) => {
                        const { header, short_text, image, read_text, redirect_url, id } = blog
                        const blogClasses = ['blog-wrapper-card', `card-${i + 1}`]
                        return (
                            <div className={blogClasses.join(' ')} id={`blog-card-${i + 1}`} key={id}>
                                <div className={`image_${i + 1}`}>
                                    <img src={`${strapi.baseUrl}${image.url}`} alt={image.name} />
                                </div>
                                <div className="content">
                                    <div dangerouslySetInnerHTML={{ __html: header }}></div>
                                    <div dangerouslySetInnerHTML={{ __html: short_text }}></div>

                                    <div className="details">
                                        <span>Created At </span><span>{read_text}</span>
                                        <button onClick={() => onOpenBlog(redirect_url)}>Read more</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default Blogger