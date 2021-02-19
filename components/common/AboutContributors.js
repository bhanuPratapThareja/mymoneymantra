import Image from "../ImageComponent/ImageComponent"

const AboutContributors = (props) => {
    // const { blog_contributors_image, blog_contributors_name, blog_contributors_text, blog_contributor_about } = props.data
    return (
        <div className="container cstm-space">
            {props.data.length ? <section className="cstm-post">
                <div className="cstm-pic">
                    <Image image={props.data[0].blog_contributors_image} />
                </div>
                <div className="cstm-content">
                    <div className="content-heading">
                        <h3>{props.blogsCount ? props.blogsCount : "0"} <span>{props.blogsCount == 1 ? "Post" : "Posts"}</span></h3>
                        <h3>, 0 <span>Comment</span></h3>
                    </div>
                    <h5 className="cstm-main-content" dangerouslySetInnerHTML={{ __html: props.data[0].blog_contributor_about }}></h5>
                </div>
            </section> : null}
        </div>
    )
}
export default AboutContributors