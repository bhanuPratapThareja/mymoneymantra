import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Strapi from '../../providers/strapi'
import Image from '../ImageComponent/ImageComponent'

const BlogBanner = props => {
    const { banner_heading, banner_image, banner_label, banner_url, arrow_image, author } = props.data.post_banner
    const router = useRouter()
    const strapi = new Strapi()
    const [searchKey, setSearchKey] = useState('')

    useEffect(() =>{
        if(router.query.q){
            setSearchKey(router.query.q)
        }
    },[]) 

    const handleSearch = () => {
        if (props.author) {
            router.push(`/blog/blog-search?author=${props.author.blog_contributors_name}&q=${searchKey}`)
            return
        }
        if (searchKey.length) {
            router.push(`/blog/blog-search?q=${searchKey}`)
        }
    }
    const handleEnterPress = (e) => {
        if (e.keyCode == 13) {
            handleSearch()
        }
    }

    return (

        <section className="main-head">
            <div className="mobile-background"></div>
            <div className="container">
                {props.name ? <><h3 className="cstm-head">Author : <span dangerouslySetInnerHTML={{ __html: props.name }}></span></h3></> : <span dangerouslySetInnerHTML={{ __html: banner_heading }}></span>}
                <div className="search-wrap">
                    <input type="text" onKeyUp={handleEnterPress} onChange={(e) => setSearchKey(e.target.value)} value={searchKey} placeholder={banner_label} />
                    <Image image={banner_image} />
                    <img onClick={handleSearch} src={`${arrow_image.url}`} />
                </div>
            </div>
        </section>

    )
}

export default BlogBanner