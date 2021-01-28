import Strapi from "../../providers/strapi"

const AboutContributors = (props) => {
    const { blog_contributors_image, blog_contributors_name, blog_contributors_text, blog_contributor_about } = props.data
    const strapi = new Strapi()
    return (
        <div  className="container">
            <section className="cstm-post">
                <div className="cstm-pic"><img src={`${strapi.baseUrl}${blog_contributors_image.url}`} alt={blog_contributors_image.name} /></div>
                <div className="cstm-content">
                    <div className="content-heading">
                        <h3>{props.blogsCount ? props.blogsCount : "0"} <span>{props.blogsCount == 1 ? "Post" : "Posts"}</span></h3>
                        <h3>, 0 <span>Comment</span></h3>
                    </div>
                    <p className="cstm-desig">Employee - MyMoneyMantra  |</p>
                    <h5 className="cstm-main-content" dangerouslySetInnerHTML={{ __html: blog_contributor_about }}></h5>
                </div>
            </section>
        </div>
    )
}
export default AboutContributors