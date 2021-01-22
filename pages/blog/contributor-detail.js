import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Strapi from "../../providers/strapi";

const ContributorDetails = (props) => {
    const router = useRouter()
    let filteredBlogs = []
    const filteredContributors = props.contributorData.filter(contributor => contributor.id == props.id)
    console.log("contributor", filteredContributors)
    let name = filteredContributors[0].blog_contributors_name
    props.allBlogs.forEach(blog => {
        if (blog.blog_author) {
            if (name.toLowerCase().includes(blog.blog_author.toLowerCase())) {
                filteredBlogs.push(blog)
            }
        }
    })
    console.log(filteredBlogs)
    return <div>
        <Layout>


            Contributor Detail page
        </Layout>
    </div>
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi();
    const { query } = ctx;


    const contributorData = await strapi.processReq(
        "GET",
        `blog-featured-contributors`
    );
    const allBlogs = await strapi.processReq(
        "GET",
        `quick-blogs`
    );
    // const pageData = await strapi.processReq(
    //     "GET",
    //     `pages?slug=${primaryPath}-${secondaryPath}`
    // );
    // const data = pageData && pageData.length ? pageData[0] : null;
    return { props: { allBlogs, contributorData, id: query.id } };
}

export default ContributorDetails