import Strapi from '../../providers/strapi'
import { getClassesForPage } from '../../utils/classesForPage'
import Layout from '../../components/Layout'
import BlogDetails from '../../components/common/BlogsDetails'
import BlogMediaLinks from '../../components/common/BlogMediaLinks'
import CommentSection from '../../components/common/CommentSection'
import ProductSlider from '../../components/common/ProductSlider'
import Offers from '../../components/common/Offers'
import Blogger from '../../components/common/Blogger'
import { useEffect } from 'react'



const BlogDetail = props => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [props.blogData])
    const getComponents = (dynamic) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.blog-texts-component':
                    return <BlogDetails key={block.id} data={props.blogData} />
                case 'blocks.blog-social-media-links-component':
                    return <BlogMediaLinks key={block.id} data={block} />
                case "blocks.blogs-comment-section-component":
                    return <CommentSection blogId={props.blogData.id} />
                case "blocks.blog-category":
                    return <ProductSlider key={block.id} data={block} />;
                case "offers.popular-offers-personal-loans-component":
                    return <Offers key={block.id} data={block} />
                case 'blocks.similar-blogs-component':
                    return <Blogger key={block.id} data={block} />
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
    const blogData = await strapi.processReq(
        "GET",
        `quick-blogs/${query.id}`
    );
    console.log("blog detail id", blogData)
    const pageData = await strapi.processReq(
        "GET",
        `pages?slug=${primaryPath}-${secondaryPath}`
    );
    const data = pageData && pageData.length ? pageData[0] : null;
    return { props: { data, pageClasses, blogData } };
}
export default BlogDetail
