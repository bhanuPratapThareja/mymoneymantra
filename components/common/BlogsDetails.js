import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CommentSection from './CommentSection'

const BlogsDetails = props => {
    const router = useRouter()
    const [displayBlog, setDisplayBlog] = useState(false)
    const [blogData, setBlogData] = useState([])
    const goToPage = (name) => {
        router.push({ pathname: "/blog/blog-search", query: { category: name } })
    }
    const goToContributorDetailPage = (contributor) => {
        router.push({ pathname: "/blog/contributor-detail", query: { slug: contributor.id } })
    }
    console.log('detail props', props.data)
    useEffect(() => {
        if (props.data.length != 0) {
            setDisplayBlog(true)
            setBlogData(props.data)
            console.log(typeof props.data)
        } else {
            setDisplayBlog(false)
            console.log(typeof props.data)
        }
        window.scroll(0, 0)
    }, [props.data])
    // const { header, read_text, blog_sub_category, content, display_short_text } = props.data.blogger
    const { header, blog_contributor, read_text, blog_sub_category, content, display_short_text, blog, blog_categories } = blogData
    const mainCategories = blog_categories ? blog_categories : []
    const readingTime = require('reading-time');
    const blogreadTime = displayBlog ? readingTime(content) : null;
    const { blogId, allBlogs } = props
    const authorBlogs = displayBlog ? allBlogs.filter(blog => blog.blog_contributor.blog_contributors_name == blog_contributor.blog_contributors_name) : []
    const blogCount = authorBlogs.length ? authorBlogs.length : 0
    return (
        <section className="blog-head">
            {displayBlog ? <div className="blog-detail-wrapper container">
                <div className="blog-wrapper-content">
                    <div className="blog-wrap-top">
                        <h1 dangerouslySetInnerHTML={{ __html: header }}></h1>
                        <span>
                            {blogreadTime.text}
                            {mainCategories.length ? mainCategories.map((category, i) => (
                                <span onClick={() => goToPage(category.blog_category_name)}>
                                    // {category.blog_category_name}
                                </span>)
                            ) : null}
                        </span>
                        <span className='author_bio_detail_page'>Author : <span onClick={() => goToContributorDetailPage(blog_contributor)} dangerouslySetInnerHTML={{ __html: blog_contributor.blog_contributors_name }}></span><p>({blogCount} {blogCount == 1 ? 'post' : 'posts'},0 comments)</p></span>
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                    <CommentSection blogId={blogId} blogData={props.data} url={props.url} />
                </div>
            </div> : null}
        </section>
    )

}

export default BlogsDetails