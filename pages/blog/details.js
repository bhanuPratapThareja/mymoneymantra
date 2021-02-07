import Strapi from '../../providers/strapi'
import { getClassesForPage } from '../../utils/classesForPage'
import Layout from '../../components/Layout'
import BlogDetails from '../../components/common/BlogsDetails'
import BlogMediaLinks from '../../components/common/BlogMediaLinks'
import ProductSlider from '../../components/common/ProductSlider'
import Offers from '../../components/common/Offers'
import Blogger from '../../components/common/Blogger'
import { extractTrendingOffers } from '../../services/componentsService'

const BlogDetail = props => {
    const getComponents = (dynamic) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.blog-texts-component':
                    return <BlogDetails key={block.id} data={props.blogData} blogId={props.blogData.id} />
                // return <BlogDetails key={block.id} data={props.blogData} blogId={props.blogData.id} commentData={commentData} />
                case 'blocks.blog-social-media-links-component':
                    return <BlogMediaLinks key={block.id} data={block} />
                case "blocks.blog-category":
                    return <ProductSlider key={block.id} data={block} />;
                case "offers.popular-offers-personal-loans-component":
                    return <Offers key={block.id} data={block} offers={props.trendingOffers || []} />
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
        `quick-blogs/${query.slug}`
    );
    const pageData = await strapi.processReq(
        "GET",
        `pages?slug=${primaryPath}-${secondaryPath}`
    )

  const trendingOffers = await extractTrendingOffers(pageData[0])

    const data = pageData && pageData.length ? pageData[0] : null;
    return { props: { data, pageClasses, blogData, trendingOffers } };
}
export default BlogDetail
