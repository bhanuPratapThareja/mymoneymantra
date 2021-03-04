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
import PageNotFound from "../../../components/PageNotFound"

const BlogDetail = props => {
    const [currentUrl, setCurrentUrl] = useState()
    const [blogData, setBlogData] = useState([])
    const [trendingOffers, setTrendingOffers] = useState([])
    const [showContent, setShowContent] = useState(false)
    let strapi = new Strapi()
    useEffect(() => {
        const getOfferData = async () => {
            console.log('product type id',props.productType)
            const apiOffers = await viewOffers(props.productType)
            if (apiOffers) {
                const { trendings } = apiOffers
                const trendingOffers = await extractOffers(trendings, props.productType.product_type_id)
                setTrendingOffers(trendingOffers)
            }
        }
        getOfferData()
        let url = window.location.href
        setCurrentUrl(url)
    }, [props.query])

    const getComponents = (dynamic) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.blog-texts-component':
                    return <BlogsDetails key={block.id} data={props.blog} blogId={props.blog.id} url={currentUrl} allBlogs={props.allBlogs} showContent={showContent} setShowContent={setShowContent} />
                case 'blocks.blog-social-media-links-component':
                    return showContent ? <BlogMediaLinks key={block.id} data={block} url={currentUrl} blogData={props.blog} showContent={showContent} /> : null
                case "blocks.blog-category":
                    return showContent ? <ProductSlider key={block.id} data={block} /> : null;
                case 'offers.trending-offers-component':
                    return trendingOffers&&trendingOffers.length? <Offers
                        key={block.id}
                        data={block}
                        blogTrendingOffers={trendingOffers}
                    /> :null
                case 'blocks.similar-blogs-component':
                    return showContent ? <SimilarArticles key={block.id} data={props.allBlogs} categories={blogData.post_categories} subCategories={blogData.post_sub_categories} /> : null
            }
        })
    }
    if (props.blog == null) {
        return <Layout>
            <PageNotFound />
        </Layout>
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
        `quick-blogs?slug=${query.detailsPage}`
    );
    const pageData = await strapi.processReq(
        "GET",
        `pages?slug=${primaryPath}-${secondaryPath}`
    );
    const blog = blogData && blogData.length ? blogData[0] : null
    let slugForProductTypeData =blog? blog.post_categories[0].slug :null
    console.log("slugForProductTypeData",slugForProductTypeData)
    const productTypeData = await strapi.processReq('GET', `product-type-v-2-s?slug=${slugForProductTypeData}`)
    let productType = productTypeData&&productTypeData.length?productTypeData[0]:null
    const data = pageData && pageData.length ? pageData[0] : null;
    console.log('slug for offers',productTypeData[0])
    return { props: { data, pageClasses, allBlogs, query, blog, productType } };
}
export default BlogDetail