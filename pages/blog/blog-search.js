import { useEffect, useState } from 'react';
import BlogBanner from '../../components/Banners/BlogBanner';
import BlogList from '../../components/common/BlogList';
import Layout from '../../components/Layout';
import Strapi from '../../providers/strapi'
import { getClassesForPage } from '../../utils/classesForPage';

const BlogSearchPage = (props) => {
    const [data, setData] = useState([])
    let searchKey = ''
    useEffect(() => {
        searchKey = props.query.s
        console.log("blogs", props.blogData)
        let filteredBlogs = props.blogData.filter(blog => blog.header.toLowerCase().includes(searchKey.toLowerCase()))
        setData(filteredBlogs)
        window.scroll(0, 0)
    }, [props.query.s])
    const getComponents = (dynamic) => {
        return dynamic.map((block) => {
            switch (block.__component) {
                case "banners.blog-banners-component":
                    return <BlogBanner key={block.id} data={block} />
                case 'blocks.blog-list-component':
                    return <BlogList key={block.id} data={data} />
            }
        });
    };

    return (
        <div className={props.pageClasses}>
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi();
    const { query } = ctx;
    const primaryPath = query.primaryPath;
    const pageClasses = getClassesForPage('blog')

    const blogData = await strapi.processReq(
        "GET",
        `quick-blogs`
    );
    const pageData = await strapi.processReq(
        "GET",
        `pages?slug=blogs-search`
    );
    const data = pageData && pageData.length ? pageData[0] : null;
    return { props: { data, pageClasses, query, blogData } };
}

export default BlogSearchPage;