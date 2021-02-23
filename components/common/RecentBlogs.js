import moment from "moment"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { setBlogId } from "../../utils/localAccess"
import Image from "../ImageComponent/ImageComponent"

const RecentBlogs = (props) => {
    const router = useRouter()
    const { posts } = props.data
    let recentBlogs = posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

    useEffect(() => {
        if (window !== undefined && window.initSlickCards && posts && posts.length) {
            console.log('recent slic intialized')
            window.initSlickCards()
        }
    })

    const onOpenBlog = blog => {
        setBlogId(blog.id)
        router.push(`/blog/details/${blog.slug}`)
    }
    return (
        <section data-aos="fade-up" className="popular-card-container aos-animate aos-init">
            <div className="popular-cards">
                <h2>Recent Articles</h2>
                <div className="popular-cards-slider" id="popular-cards-sec" >
                    {
                        recentBlogs.map((blog, i) => {
                            const { header, short_text, image, read_text, redirect_url, id, createdAt, popular, content, published_at } = blog
                            const date = new Date(published_at);
                            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                            const createdDate = `${da} ${mo} ${ye}`;
                            const readingTime = require('reading-time');
                            const blogreadTime = readingTime(content);
                            return (
                                <div key={i} className="blog-wrapper-card single card-1 slide_cell cstm-prd" id="blog-card-1">
                                    <div className='image_1'>
                                        <Image image={image} />
                                    </div>
                                    <div className="content">
                                        <span dangerouslySetInnerHTML={{ __html: header }}></span>
                                        <span dangerouslySetInnerHTML={{ __html: short_text }}></span>
                                        <div className="details">
                                            <span>{createdDate} // {blogreadTime.text} </span>
                                            <button onClick={() => onOpenBlog(blog)}>Read more</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }



                </div>
            </div>
        </section>
    );
}

export default RecentBlogs;