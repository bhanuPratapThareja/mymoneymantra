import Image from '../ImageComponent/ImageComponent'
import CommentSection from './CommentSection'


const BlogsDetails = props => {
    // const { header, read_text, blog_sub_category, content, display_short_text } = props.data.blogger
    const { header, read_text, blog_sub_category, content, display_short_text } = props.data
    const readingTime = require('reading-time');
    const blogreadTime = readingTime(content);
    const subCategory = blog_sub_category ? blog_sub_category.blog_sub_category : ""
    console.log(subCategory)
    const { blogId, commentData } = props
    return (
        <section className="blog-head">
            <div className="blog-detail-wrapper container">
                <div className="blog-wrapper-content">
                    <div className="blog-wrap-top">
                        <h1 dangerouslySetInnerHTML={{ __html: header }}></h1>
                        <span>{blogreadTime.text}//{subCategory}</span>
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    </div>
                        <CommentSection blogId={blogId} commentData={commentData} />
                </div>
            </div>
        </section>
    )

}

export default BlogsDetails