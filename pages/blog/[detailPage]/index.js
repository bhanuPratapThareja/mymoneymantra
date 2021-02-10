import Strapi from '../../../providers/strapi'
import { getClassesForPage } from '../../../utils/classesForPage'
import Layout from '../../../components/Layout'
import BlogDetails from '../../../components/common/BlogsDetails'
import BlogMediaLinks from '../../../components/common/BlogMediaLinks'
import ProductSlider from '../../../components/common/ProductSlider'
import Offers from '../../../components/common/Offers'
import Blogger from '../../../components/common/Blogger'
import { useEffect, useState } from 'react'
import { getBlogId } from '../../../utils/localAccess'
import { get } from 'jquery'
import SimilarArticles from '../../../components/common/SimilarArticles'

const BlogDetail = props => {
    const [currentUrl, setCurrentUrl] = useState()
    const [blogData, setBlogData] = useState([])
    let strapi = new Strapi()
    useEffect(() => {
        let blogId = getBlogId('blogId')
        const getBlogData = async () => {
            const blog = await strapi.processReq(
                "GET",
                `quick-blogs/${blogId}`
            );
            setBlogData(blog)
        }
        getBlogData()
        let url = window.location.href
        setCurrentUrl(url)
    }, [])
    const getComponents = (dynamic) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.blog-texts-component':
                    return <BlogDetails key={block.id} data={blogData} blogId={blogData.id} url={currentUrl} allBlogs={props.allBlogs} />
                // return <BlogDetails key={block.id} data={blogData} blogId={blogData.id} commentData={commentData} />
                case 'blocks.blog-social-media-links-component':
                    return <BlogMediaLinks key={block.id} data={block} url={currentUrl} blogData={blogData} />
                case "blocks.blog-category":
                    return <ProductSlider key={block.id} data={block} />;
                // case "offers.popular-offers-personal-loans-component":
                //     return <Offers key={block.id} data={block} />
                case 'blocks.similar-blogs-component':
                    return <SimilarArticles key={block.id} data={props.allBlogs} categories={blogData.blog_categories} subCategories={blogData.blog_sub_categories} />
            }
        })
    }
    return (
        <div className={props.pageClasses}>
            {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
        </div>
    )
}
export async function getServerSideProps(ctx) {
    const strapi = new Strapi();
    const { query } = ctx;
    const primaryPath = 'blog'
    const secondaryPath = 'details'
    const pageClasses = getClassesForPage(primaryPath, secondaryPath)

    const allBlogs = await strapi.processReq(
        "GET",
        `quick-blogs`
    );

    const blogData = await strapi.processReq(
        "GET",
        `quick-blogs/${query.slug}`
    );
    const pageData = await strapi.processReq(
        "GET",
        `pages?slug=${primaryPath}-${secondaryPath}`
    );
    const data = pageData && pageData.length ? pageData[0] : null;
    return { props: { data, pageClasses, blogData, allBlogs } };
}
export default BlogDetail