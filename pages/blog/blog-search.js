import { useEffect, useState } from 'react';
import BlogBanner from '../../components/Banners/BlogBanner';
import BlogList from '../../components/common/BlogList';
import Layout from '../../components/Layout';
import Strapi from '../../providers/strapi'
import { getClassesForPage } from '../../utils/classesForPage';

const BlogSearchPage = (props) => {
    const [data, setData] = useState([])
    let searchKey = ''
    console.log(props.blogData)
    useEffect(() => {
        if (props.query.s) {
            searchKey = props.query.s
            let filteredBlogs = props.blogData.filter(blog => blog.header.toLowerCase().includes(searchKey.toLowerCase()))
            setData(filteredBlogs)
        }
        if (props.query.subcategory) {
            setData(props.blogData)
        }
        if (props.query.category) {
            console.log(props.query.category)
            let filteredBlogs = []
            props.blogData.forEach((blog) => {
                blog.blog_categories.forEach(category => {
                    if (props.query.category === category.id) {
                        filteredBlogs.push(blog)
                    }
                })
            })
            console.log("category", filteredBlogs)
            setData(filteredBlogs)
        }

        // window.scroll(0, 0)
    }, [props.query])
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
    console.log("search query", query)
    return { props: { data, pageClasses, query, blogData } };
}

export default BlogSearchPage;