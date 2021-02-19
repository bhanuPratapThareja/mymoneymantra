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
    // const { blog_social_media_link_component } = props.data.blog_social_media_link
    return (
        <section id="blog-head">
            <div id={props.blogShareButton ? 'pop_up_container' : 'blog-socials'}>
                <div className={props.blogShareButton ? 'pop_up_share' : 'slide_cell share_buttons'}>
                    <TwitterShareButton url={props.url} onShareWindowClose={() => props.openBlogShare(false)} >
                        {props.blogShareButton ? <TwitterIcon size={32} /> : <TwitterIcon size={36} />}
                    </TwitterShareButton>
                    <FacebookShareButton onShareWindowClose={() => props.openBlogShare(false)} url={props.url}>
                        {props.blogShareButton ? <FacebookIcon size={32} /> : <FacebookIcon size={36} />}
                    </FacebookShareButton>
                    {props.blogData.image ? <PinterestShareButton media={`${props.blogData.image.url ? props.blogData.image.url : '/assets/images/icons/twitter.svg'}`} url={props.url} onShareWindowClose={() => props.openBlogShare(false)}>
                        {props.blogShareButton ? <PinterestIcon size={32} /> : <PinterestIcon size={36} />}
                    </PinterestShareButton> : null}
                    <LinkedinShareButton url={props.url} onShareWindowClose={() => props.openBlogShare(false)} >
                        {props.blogShareButton ? <LinkedinIcon size={32} /> : <LinkedinIcon size={36} />}
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