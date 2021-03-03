import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { setBlogId } from '../../utils/localAccess'
import Image from '../ImageComponent/ImageComponent'

const SimilarArticles = (props) => {
    const router = useRouter()
    const [similarBlogs, setSimilarBlogs] = useState([])
    let { data, categories } = props
    const sortBlogsByDate = (blogs) => {
        let sortedBlogsByDate = blogs.sort((a, b) => moment(moment(a.publish_at).format('YYYY-MM-DD')).isBefore(moment(b.publish_at).format('YYYY-MM-DD')) ? -1 : 1)
        return sortedBlogsByDate
    }
    useEffect(() => {
        let blogs = []
        if (props.categories && props.categories.length) {

            data.forEach(blog => {
                blog.post_categories.forEach(blogCategory => {
                    props.categories.forEach(category => {
                        if (blogCategory.post_category_name.includes(category.post_category_name)) {
                            blogs.push(blog)
                        }
                    })
                })
            })
            let similarArticles = sortBlogsByDate(blogs)
            setSimilarBlogs(similarArticles)
        } else {
            let similarArticles = sortBlogsByDate(data)
            setSimilarBlogs(similarArticles)
        }
    }, [props.categories])

    const onOpenBlog = blog => {
        setBlogId(blog.id)
        router.push(`/blog/${blog.slug}`)
    }

    return (
        <section data-aos="fade-up" className="container blog-container aos-init aos-animate">
            <div className="blog">
                <div><h2>Similar Articles</h2></div>
                <div className="blog-wrapper" id="slider_blogs">
                    {similarBlogs.length ? similarBlogs.map((blog, i) => {
                        const { header, short_text, image, read_text, redirect_url, id, createdAt, popular, content, published_at } = blog
                        const date = new Date(published_at);
                        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                        const createdDate = `${da} ${mo} ${ye}`;
                        const readingTime = require('reading-time');
                        const blogreadTime = readingTime(content);
                        const blogClasses = ['blog-wrapper-card', `card-${i + 1}`]
                        return (
                            i < 3 ? <div className={blogClasses.join(' ')} id={`blog-card-${i + 1}`} key={i}>
                                <div className={`image_${i + 1}`}>
                                    <Image image={image} />
                                </div>
                                <div className="content">
                                    <span dangerouslySetInnerHTML={{ __html: header }}></span>
                                    <span dangerouslySetInnerHTML={{ __html: short_text }}></span>
                                    <div className="details">
                                        <span>{createdDate}//{blogreadTime.text} </span>
                                        <button onClick={() => onOpenBlog(blog)}>Read more</button>
                                    </div>
                                </div>
                            </div> : null
                        )
                    }) : null}

                </div>
            </div>
        </section>
    )
}

export default SimilarArticles;