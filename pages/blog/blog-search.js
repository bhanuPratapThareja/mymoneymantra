import { useEffect, useState } from 'react';
import moment from 'moment'
import BlogBanner from '../../components/Banners/BlogBanner';
import BlogList from '../../components/common/BlogList';
import Layout from '../../components/Layout';
import Strapi from '../../providers/strapi'
import { getClassesForPage } from '../../utils/classesForPage';

const BlogSearchPage = (props) => {
    const [data, setData] = useState([])
    const sortBlogs = (searchKeyword, blogs) => {
        let sortedBlogsByKeyword = blogs.sort((a, b) => a.header.indexOf(searchKeyword) < b.header.indexOf(searchKeyword) ? 1 : -1)
        return sortedBlogsByKeyword
    }
    const sortBlogsByDate = (blogs) => {
        console.log(blogs)
        let sortedBlogsByDate = blogs.sort((a, b) => moment(moment(a.publish_at).format('YYYY-MM-DD')).isBefore(moment(b.publish_at).format('YYYY-MM-DD')) ? -1 : 1)
        console.log(sortedBlogsByDate)
        return sortedBlogsByDate
    }
    let searchKey = ''
    useEffect(() => {
        if (props.query.q) {
            searchKey = props.query.q
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
            let blogs = sortBlogs(searchKey, filteredBlogs)
            let sortByDate = sortBlogsByDate(blogs)
            setData(sortByDate)
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
                    if (blog.header.toLowerCase().includes(props.query.q.toLowerCase())) {
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
    const pageClasses = getClassesForPage('blog-search')

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