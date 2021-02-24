import Layout from "../../../../components/Layout";
import { getClassesForPage } from '../../../../utils/classesForPage'
import Strapi from "../../../../providers/strapi";
import BlogBanner from '../../../../components/Banners/BlogBanner';
import BlogList from '../../../../components/common/BlogList';
import AboutContributors from '../../../../components/common/AboutContributors'
import { useEffect, useState } from "react";
import { getContributorId } from "../../../../utils/localAccess";

const ContributorDetails = (props) => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState([])
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        // let contributorId = '60055f01246abc1243abf8b6'
        let id = getContributorId()
        let filteredBlogs = []
        const filteredContributors = props.contributorData.filter(contributor => contributor.id == id)
        let name = filteredContributors[0].post_contributors_name
        console.log("name:",name)
        props.allBlogs.forEach(blog => {
            // console.log(blog)
            console.log("blogsssssss",blog.post_contributor.post_contributors_name.toLowerCase())
            let blogFound = name.toLowerCase().includes(blog.post_contributor.post_contributors_name.toLowerCase())
            if (blogFound) {
                filteredBlogs.push(blog)
            }
        })
        setName(name)
        setAuthor(filteredContributors)
        console.log("filteredBlogs",filteredBlogs)
        setBlogs(filteredBlogs)
        window.scroll(0, 0)
    }, [])
    const getComponents = (dynamic) => {
        console.log("dynamic",dynamic)
        return dynamic.map((block) => {
            console.log("block",block)
            switch (block.__component) {
                case "banners.blog-banners-component":
                    return <BlogBanner key={block.id} data={block} name={name} author={author[0]} />
                case "blocks.blogger-about-contributors-component":
                    return <AboutContributors key={block.id} blogsCount={blogs.length} data={author} />
                case "blocks.blog-by-contributor-componrnt":
                    return <BlogList key={block.id} data={blogs} />

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
    const pageClasses = getClassesForPage('contributor-detail')


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
    return { props: { allBlogs, contributorData, data, pageClasses } };
}

export default ContributorDetails