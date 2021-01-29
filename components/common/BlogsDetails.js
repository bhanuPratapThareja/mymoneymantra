import { useRouter } from 'next/router'
import { useEffect } from 'react'
import CommentSection from './CommentSection'

const BlogsDetails = props => {
    const router = useRouter()
    const goToPage = (name) => {
        router.push({ pathname: "/blog/blog-search", query: { category: name } })
    }
    useEffect(() => {
        window.scroll(0, 0)
    }, [props.data])
    // const { header, read_text, blog_sub_category, content, display_short_text } = props.data.blogger
    const { header, read_text, blog_sub_category, content, display_short_text, blog, blog_categories } = props.data
    const mainCategories = blog_categories ? blog_categories : []
    const readingTime = require('reading-time');
    const blogreadTime = readingTime(content);
    const { blogId, commentData } = props
    return (
        <section className="blog-head">
            <div className="blog-detail-wrapper container">
                <div className="blog-wrapper-content">
                    <div className="blog-wrap-top">
                        <h1 dangerouslySetInnerHTML={{ __html: header }}></h1>
                        <span>
                           {read_text}//{blogreadTime.text}
                            {mainCategories.length ? mainCategories.map((category, i) => (
                                <span onClick={() => goToPage(category.blog_category_name)}>
                                    // {category.blog_category_name}
                                </span>)
                            ) : null}
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                    <CommentSection blogId={blogId} commentData={commentData} />
                </div>
            </div>
        </section>
    )

}

export default BlogsDetails