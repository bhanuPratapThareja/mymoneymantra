import { useRouter } from 'next/router'
import { setBlogId } from '../../utils/localAccess'
import Image from '../ImageComponent/ImageComponent'

const BlogList = (props) => {
    const { data } = props
    const router = useRouter()
    let sortedBlogs = data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    const onOpenBlog = blog => {
        setBlogId(blog.id)
        router.push(`/blog/details/${blog.slug}`)
    }
    return (
        <section className="blogs-filter container">
            <div className="filter-cards">
                <div className="filter-cards-wrapper" >
                    {sortedBlogs.length ? sortedBlogs.map((blog, i) => {
                        const { header, short_text, image, read_text, redirect_url, id, createdAt, published_at, content } = blog
                        const date = new Date(published_at);
                        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                        const createdDate = `${da} ${mo} ${ye}`;
                        const readingTime = require('reading-time');
                        const blogreadTime = readingTime(content);
                        const blogClasses = ['blog-wrapper-card', 'single', `card-1`]
                        return (
                            <div className={blogClasses.join(' ')} id={`blog-card-${i + 1}`} key={id}>
                                <div className={`image_1`}>
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
                            </div>
                        )
                    }) : <div>No Result Found</div>}

                </div>
            </div>
        </section>
    );
}

export default BlogList;