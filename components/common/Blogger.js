import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { setBlogId } from '../../utils/localAccess'
import Image from '../ImageComponent/ImageComponent'


const Blogger = props => {
    const router = useRouter()
    useEffect(() => {
        if (window !== undefined && window.initSlickBlogs && props.data.blogger && props.data.blogger.image.length) {
            window.initSlickBlogs()
        }
    })
    
    let { section_heading, bloggers } = props.data
    let popularBlogs = bloggers.filter(blog => blog.popular === true)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
    let randomBlogs = shuffleArray(popularBlogs)


    const onOpenBlog = blog => {
        setBlogId(blog.id)
        router.push(`/blog/details/${blog.slug}`)
    }

    return (
        <section data-aos="fade-up" className="container blog-container aos-init aos-animate">
            <div className="blog">
                <div dangerouslySetInnerHTML={{ __html: section_heading }}></div>
                <div className="blog-wrapper" id="slider_blogs">
                    {randomBlogs.map((blog, i) => {
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
                            (i < 3) ? <div className={blogClasses.join(' ')} id={`blog-card-${i + 1}`} key={i}>
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
                    })}

                </div>
            </div>
        </section>
    )
}

export default Blogger