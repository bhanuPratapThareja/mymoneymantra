import Strapi from "../../providers/strapi"

const BlogMediaLinks = props => {
    const strapi = new Strapi()
    const {blog_social_media_link_component} = props.data.blog_social_media_link
    console.log("------ccccccccccccc------",blog_social_media_link_component)

   



    return (
        <section id="blog-head">
            <div id="blog-socials">
            {blog_social_media_link_component.map(image => {
                        return (
                            <div className="slide_cell" key={image.id}>
                           <a> <img src={`${strapi.baseUrl}${image.blog_social_media_image.url}`}  /></a>
                            </div>
                        )
                    })}
                    </div>
        </section>
    )

}

export default BlogMediaLinks