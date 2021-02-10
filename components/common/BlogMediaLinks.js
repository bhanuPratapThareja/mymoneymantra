import Strapi from "../../providers/strapi"

import {
    FacebookIcon,
    FacebookShareButton,
    FacebookShareCount,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";

const BlogMediaLinks = props => {
    const strapi = new Strapi()
    const actionAfterShare = (e) => {
        console.log(e)
    }
    console.log(props.blogData)
    // const { blog_social_media_link_component } = props.data.blog_social_media_link
    return (
        <section id="blog-head">
            <div id={props.blogShareButton ? 'pop_up_container' : 'blog-socials'}>
                <div className={props.blogShareButton ? 'pop_up_share' : 'slide_cell share_buttons'}>
                    <TwitterShareButton url={props.url} >
                        {props.blogShareButton ? <TwitterIcon size={32} /> : <img src='/assets/images/icons/twitter.svg' />}
                    </TwitterShareButton>
                    <FacebookShareButton onShareWindowClose={() => props.openBlogShare(false)} url={props.url}>
                        {props.blogShareButton ? <FacebookIcon size={32} /> : <img src='/assets/images/icons/fb.svg' />}
                    </FacebookShareButton>
                    {/* <PinterestShareButton media={`${props.blogData.image.url}`} url={props.url}>
                        {props.blogShareButton ? <PinterestIcon size={32} /> : <PinterestIcon size={24} />}
                    </PinterestShareButton> */}
                    <LinkedinShareButton url={props.url}>
                        {props.blogShareButton ? <LinkedinIcon size={32} /> : <img src='/assets/images/icons/linkedin.svg' />}
                    </LinkedinShareButton>
                    {props.blogShareButton ? <button onClick={() => props.openBlogShare(false)}>X</button> : null}
                </div>
                {/* {blog_social_media_link_component.map(image => {
                    return (
                        <div onClick={goToMediaLinks} className="slide_cell" key={image.id}>
                            <a> <img src={`${strapi.baseUrl}${image.blog_social_media_image.url}`} /></a>
                        </div>
                    )
                })} */}
            </div>
        </section>
    )

}

export default BlogMediaLinks