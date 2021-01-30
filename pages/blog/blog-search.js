import { filter } from 'lodash';
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
        if (props.query.s) {
            searchKey = props.query.s
            // let filteredBlogs = props.blogData.filter(blog => blog.header.toLowerCase().includes(searchKey.toLowerCase()))
            let filteredBlogs = []
            props.blogData.forEach(blog => {
                if (blog.header.toLowerCase().includes(searchKey.toLowerCase())) {
                    filteredBlogs.push(blog)
                }
                if (blog.blog_author) {
                    if (blog.blog_author.toLowerCase().includes(searchKey.toLowerCase())) {
                        filteredBlogs.push(blog)
                    }
                }
            })
            setData(filteredBlogs)
        }
        if (props.query.subcategory) {
            setData(props.blogData)
        }
        if (props.query.category) {
            let filteredBlogs = []
            props.blogData.forEach((blog) => {
                blog.blog_categories.forEach(category => {
                    if (category.blog_category_name.toLowerCase().includes(props.query.category.toLowerCase())) {
                        filteredBlogs.push(blog)
                    }
                })
            })
            setData(filteredBlogs)
        }
        if (props.query.author) {
            let filteredBlogs = []
            props.blogData.forEach(blog => {
                if (props.query.author.toLowerCase().includes(blog.blog_author.toLowerCase())) {
                    if (blog.header.toLowerCase().includes(props.query.s.toLowerCase())) {
                        filteredBlogs.push(blog)
                    }
                }
            })
            setData(filteredBlogs)
        }
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
    return { props: { data, pageClasses, query, blogData } };
}

export default BlogSearchPage;