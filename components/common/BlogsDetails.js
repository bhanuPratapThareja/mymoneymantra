import Image from '../ImageComponent/ImageComponent'

const BlogsDetails = props => {
    console.log("blog details", props.data)
    const { header, read_text, blog_sub_category, content, display_short_text } = props.data.blogger
    return (
        <section className="blog-head">
            <div className="blog-detail-wrapper container">
                <div className="blog-wrapper-content">
                    <div className="blog-wrap-top">
                        <h1 dangerouslySetInnerHTML={{ __html: header }}></h1>
                        <span>{read_text}//{blog_sub_category}</span>
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>

                    </div>
                </div>
            </div>
        </section>
    )

}

export default BlogsDetails