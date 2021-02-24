import { useEffect, useState } from "react";
import BlogBanner from "../../../components/Banners/BlogBanner";
import BlogList from "../../../components/common/BlogList";
import Layout from "../../../components/Layout";
import Strapi from "../../../providers/strapi";
import { getClassesForPage } from "../../../utils/classesForPage";
import { unformatCategoryName } from "../../../utils/formatDataForBlogs";

const BlogsByCategory = (props) => {
    const [BlogsByCategory, setBlogsByCategory] = useState([])
    useEffect(() => {
        if (props.query.category) {
            let filteredBlogs = []
            let categoryName = unformatCategoryName(props.query.category)
            props.blogData.forEach((blog) => {
                blog.post_categories.forEach(category => {
                    if (category.post_category_name.toLowerCase().includes(categoryName.toLowerCase())) {
                        filteredBlogs.push(blog)
                    }
                })
            })
            setBlogsByCategory(filteredBlogs)
        }
    }, [props.query.category])

    const getComponents = (dynamic) => {
        return dynamic.map((block) => {
            switch (block.__component) {
                case "banners.blog-banners-component":
                    return <BlogBanner key={block.id} data={block} />
                case 'blocks.blog-list-component':
                    return <BlogList key={block.id} data={BlogsByCategory} />
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

export default BlogsByCategory;