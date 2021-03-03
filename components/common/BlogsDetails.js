import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { cleanAuthorName, formatCategoryForUrl } from '../../utils/formatDataForBlogs'
import { setContributorId } from '../../utils/localAccess'
import CommentSection from './CommentSection'

const BlogsDetails = props => {
    const router = useRouter()
    // const [showContent, setshowContent] = useState(false)
    const [blogData, setBlogData] = useState([])
    const goToPage = (name) => {
        let formattedCategoryName = formatCategoryForUrl(name)
        router.push(`/blog/category/${formattedCategoryName}`)
    }
    const goToContributorDetailPage = (contributor) => {
        let name = cleanAuthorName(contributor.blog_contributors_name)
        setContributorId(contributor.id)
        router.push(`/blog/contributor-detail/${name}`)
    }
    const {showContent} = props
    useEffect(() => {
        if (props.data.length != 0) {
            props.setShowContent(true)
            setBlogData(props.data)
        } else {
            props.setShowContent(false)
        }
        window.scroll(0, 0)
    }, [props.data])
    // const { header, read_text, blog_sub_category, content, display_short_text } = props.data.blogger
    const { header, blog_contributor,post_contributor, published_at, read_text, blog_sub_category, content, display_short_text, blog, blog_categories,post_categories } = blogData
    const mainCategories = post_categories ? post_categories : []
    const readingTime = require('reading-time');
    const blogreadTime = showContent ? readingTime(content, { wordsPerMinute: '50' }) : null;
    const { blogId, allBlogs } = props
    const authorBlogs = showContent ? allBlogs.filter(blog => blog.post_contributor.post_contributors_name.toLowerCase() == post_contributor.post_contributors_name.toLowerCase()) : []
    const blogCount = authorBlogs.length ? authorBlogs.length : 0
    const date = showContent ? new Date(published_at) : null;
    const ye = showContent ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date) : null;
    const mo = showContent ? new Intl.DateTimeFormat('en', { month: 'short' }).format(date) : null;
    const da = showContent ? new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date) : null;
    const createdDate = `${da} ${mo} ${ye}`;
    return (
        <section className="blog-head">
            {showContent ? <div className="blog-detail-wrapper container">
                <div className="blog-wrapper-content">
                    <div className="blog-wrap-top">
                        <div dangerouslySetInnerHTML={{ __html: header }}></div>
                        <span>
                            {createdDate} // {blogreadTime.text}
                            {mainCategories.length ? mainCategories.map((category, i) => (
                                <span key={i} onClick={() => goToPage(category.blog_category_name)}>
                                    // {category.blog_category_name}
                                </span>)
                            ) : null}
                        </span>
                        <div className='author_bio_detail_page'>Author :
                        <span onClick={() => goToContributorDetailPage(post_contributor)} dangerouslySetInnerHTML={{ __html: post_contributor.post_contributors_name }}>
                            </span>
                            <p>({blogCount} {blogCount == 1 ? 'post' : 'posts'},0 comments)</p>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                    <CommentSection blogId={blogId} blogData={props.data} url={props.url} />
                </div>
            </div> : null}
        </section>
    )

}

export default BlogsDetails