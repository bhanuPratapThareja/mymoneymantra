import { useEffect, useState } from "react"
import BlogMediaLinks from "../../../components/common/BlogMediaLinks"
import BlogsDetails from "../../../components/common/BlogsDetails"
import ProductSlider from "../../../components/common/ProductSlider"
import SimilarArticles from "../../../components/common/SimilarArticles"
import Offers from "../../../components/common/Offers"
import Layout from "../../../components/Layout"
import Strapi from "../../../providers/strapi"
import { extractOffers, viewOffers } from "../../../services/offersService"
import { getClassesForPage } from "../../../utils/classesForPage"
import { getBlogId } from "../../../utils/localAccess"

const BlogDetail = props => {
    const [currentUrl, setCurrentUrl] = useState()
    const [blogData, setBlogData] = useState([])
    const [trendingOffers, setTrendingOffers] = useState([])
    const [productType, setProductType] = useState()
    const [showContent,setShowContent] = useState(false)
    let strapi = new Strapi()
    useEffect(() => {
        let blogId = getBlogId('blogId')
        const getBlogData = async () => {
            const blog = await strapi.processReq(
                "GET",
                `quick-blogs/${blogId}`
            );
           let slugForProductTypeData = blog.post_categories[0].slug ? blog.post_categories[0].slug : 'credit-cards'
            const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${slugForProductTypeData}`)
           let productTypeId = productTypeData[0].product_type_id
            const apiOffers = await viewOffers(productTypeId)
            if (apiOffers) {
                const { trendings } = apiOffers
                const trendingOffers = await extractOffers(trendings, productTypeId)
                setTrendingOffers(trendingOffers)
            }
            setProductType(productTypeData[0])
            setBlogData(blog)
        }
        getBlogData()
        let url = window.location.href
        setCurrentUrl(url)
    }, [props.query])

    const getComponents = (dynamic) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.blog-texts-component':
                    return <BlogsDetails key={block.id} data={blogData} blogId={blogData.id} url={currentUrl} allBlogs={props.allBlogs} showContent={showContent} setShowContent = {setShowContent} />
                case 'blocks.blog-social-media-links-component':
                    return showContent ?  <BlogMediaLinks key={block.id} data={block} url={currentUrl} blogData={blogData} showContent={showContent} />:null
                case "blocks.blog-category":
                    return  showContent ? <ProductSlider key={block.id} data={block} /> :null;
                case 'offers.trending-offers-component':
                    return  showContent ?<Offers 
                        key={block.id} 
                        data={block}
                        blogTrendingOffers={trendingOffers}
                        
                    />:null
                case 'blocks.similar-blogs-component':
                    return  showContent ? <SimilarArticles key={block.id} data={props.allBlogs} categories={blogData.post_categories} subCategories={blogData.post_sub_categories} /> :null
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
        `posts/${query.slug}`
    );
    const pageData = await strapi.processReq(
        "GET",
        `pages?slug=${primaryPath}-${secondaryPath}`
    );
    const data = pageData && pageData.length ? pageData[0] : null;
    return { props: { data, pageClasses, blogData, allBlogs, query } };
}
export default BlogDetail