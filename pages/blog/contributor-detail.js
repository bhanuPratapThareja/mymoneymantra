import Layout from "../../components/Layout";
import { getClassesForPage } from '../../utils/classesForPage'
import Strapi from "../../providers/strapi";
import BlogBanner from '../../components/Banners/BlogBanner';
import BlogList from '../../components/common/BlogList';
import AboutContributors from '../../components/common/AboutContributors'
import { useEffect } from "react";


const ContributorDetails = (props) => {
    console.log("all blogs contri detail", props.allBlogs)
    let filteredBlogs = []
    const filteredContributors = props.contributorData.filter(contributor => contributor.id == props.id)
    let name = filteredContributors[0].blog_contributors_name
    props.allBlogs.forEach(blog => {
        if (blog.blog_author) {
            if (name.toLowerCase().includes(blog.blog_contributor.blog_contributors_name.toLowerCase())) {
                filteredBlogs.push(blog)
            }
        }
    })
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const getComponents = (dynamic) => {
        return dynamic.map((block) => {
            switch (block.__component) {
                case "banners.blog-banners-component":
                    return <BlogBanner key={block.id} data={block} name={name} author={filteredContributors[0]} />
                case "blocks.blogger-about-contributors-component":
                    return <AboutContributors key={block.id} blogsCount={filteredBlogs.length} data={filteredContributors[0]} />
                case "blocks.blog-by-contributor-componrnt":
                    return <BlogList key={block.id} data={filteredBlogs} />

            }
        });
    };
    return <div className={props.pageClasses}>

        {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}

    </div>
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi();
    const { query } = ctx;
    const primaryPath = 'contributor';
    const secondaryPath = 'details';
    const pageClasses = getClassesForPage('blog', 'details')


    const contributorData = await strapi.processReq(
        "GET",
        `blog-featured-contributors`
    );
    const allBlogs = await strapi.processReq(
        "GET",
        `quick-blogs`
    );
    const pageData = await strapi.processReq(
        "GET",
        `pages?slug=${primaryPath}-${secondaryPath}`
    );
    const data = pageData && pageData.length ? pageData[0] : null;
    return { props: { allBlogs, contributorData, id: query.slug, data, pageClasses } };
}

export default ContributorDetails