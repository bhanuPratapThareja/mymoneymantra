import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from '../ImageComponent/ImageComponent'

const BlogBanner = props => {
    const { blog_banner_heading, blog_banner_image, blog_banner_label, blog_banner_url, blog_banner_arrow_image } = props.data.blog_banner
    const router = useRouter()
    const [searchKey, setSearchKey] = useState('')

    const handleSearch = () => {
        router.push(`/blog/blog-search?s=${searchKey}`)
    }

    return (

        <section className="main-head">
            <div className="mobile-background"></div>
            <div className="container">
                <span dangerouslySetInnerHTML={{ __html: blog_banner_heading }}></span>
                <div className="search-wrap">
                    <input type="text" onChange={(e) => setSearchKey(e.target.value)} value={searchKey} placeholder={blog_banner_label} />
                    <Image image={blog_banner_image} />
                    <Image image={blog_banner_arrow_image} />
                    <button onClick={handleSearch} >Search</button>
                </div>
            </div>
        </section>

    )
}

export default BlogBanner
