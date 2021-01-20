import Image from '../ImageComponent/ImageComponent'

const BlogBanner = props => {
    console.log("----------------", props.data.blog_banner)   
    const { blog_banner_heading, blog_banner_image, blog_banner_label, blog_banner_url,blog_banner_arrow_image } = props.data.blog_banner
    return (

        <section className="main-head">
            <div className="mobile-background"></div>

            <div className="container">
                <span dangerouslySetInnerHTML={{ __html: blog_banner_heading }}></span>
                <div className="search-wrap">
                    <input type="text" value="" placeholder={ blog_banner_label} />
                    <Image image={blog_banner_image} />
                    <Image image={blog_banner_arrow_image} />                   
                </div>
            </div>
        </section>

    )
}

export default BlogBanner
