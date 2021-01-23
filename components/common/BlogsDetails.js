import Image from '../ImageComponent/ImageComponent'

const BlogsDetails = props => {
    // const { header, read_text, blog_sub_category, content, display_short_text } = props.data.blogger
    const { header, read_text, blog_sub_category, content, display_short_text } = props.data
    const subCategory = blog_sub_category ? blog_sub_category.blog_sub_category : ""
    console.log(subCategory)
    return (
        <section className="blog-head">
            <div className="blog-detail-wrapper container">
                <div className="blog-wrapper-content">
                    <div className="blog-wrap-top">
                        <h1 dangerouslySetInnerHTML={{ __html: header }}></h1>
                        <span>{read_text}//{subCategory}</span>
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default BlogsDetails