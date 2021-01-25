import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'


const Blogger = props => {
    const router = useRouter()
    let { section_heading, bloggers } = props.data

    const onOpenBlog = blog => {
        router.push({ pathname: '/blog/details', query: { id: blog.id } })
    }

    return (
        <section data-aos="fade-up" className="container blog-container aos-init">
            <div className="blog">
                <div dangerouslySetInnerHTML={{ __html: section_heading }}></div>
                <div className="blog-wrapper" id="slider_blogs">

                    {bloggers.map((blog, i) => {
                        const { header, short_text, image, read_text, redirect_url, id, createdAt, popular } = blog
                        const date = new Date(createdAt);
                        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                        const createdDate = `${da} ${mo} ${ye}`;
                        const blogClasses = ['blog-wrapper-card', `card-${i + 1}`]
                        console.log(blog)
                        return (
                            popular ? <div className={blogClasses.join(' ')} id={`blog-card-${i + 1}`} key={id}>
                                <div className={`image_${i + 1}`}>
                                    <Image image={image} />
                                </div>
                                <div className="content">
                                    <span dangerouslySetInnerHTML={{ __html: header }}></span>
                                    <span dangerouslySetInnerHTML={{ __html: short_text }}></span>

                                    <div className="details">
                                        <span>{createdDate} </span><span>{read_text}</span>
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