import Strapi from "../../providers/strapi"

const AboutContributors = (props) => {
    const { blog_contributors_image, blog_contributors_name, blog_contributors_text, blog_contributor_about } = props.data
    const strapi = new Strapi()
    return (
        <div  >
            <img src={`${strapi.baseUrl}${blog_contributors_image.url}`} alt={blog_contributors_image.name} />
            <div >

                <h3>{props.blogsCount ? props.blogsCount : "0"} <span>{props.blogsCount == 1 ? "Post" : "Posts"}</span></h3>
                <h5 dangerouslySetInnerHTML={{ __html: blog_contributor_about }}></h5>
            </div>
        </div>
    )
}
export default AboutContributors