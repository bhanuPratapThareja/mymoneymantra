import Strapi from "../../providers/strapi";
import Layout from "../../components/Layout";
import BlogBanner from '../../components/Banners/BlogBanner'
import BlogFilter from '../../components/common/BlogFilter'
import ProductSlider from '../../components/common/ProductSlider'
import Blogger from "../../components/common/Blogger"
import { getClassesForPage } from '../../utils/classesForPage'
import FeaturedContributors from "../../components/common/FeaturedContributors";


const Blog = (props) => {
  const getComponents = (dynamic) => {
    return dynamic.map((block) => {
      switch (block.__component) {
        case "banners.blog-banners-component":
          return <BlogBanner key={block.id} data={block} />;
        case "offers.popular-blogs-component":
          return <Blogger key={block.id} data={block} />;
        case "blocks.blog-contributors-component":
          return <FeaturedContributors key={block.id} data={block} />
        case "blocks.blog-category":
          return <ProductSlider key={block.id} data={block} />;
        case "blocks.blog-list-component":
          return <BlogFilter key={block.id} data={block} />;

      }
    });
  };

  return (
    <div className={props.pageClasses}>
      {props.data ? <Layout>{getComponents(props.data.dynamic)}</Layout> : null}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const strapi = new Strapi();
  const { query } = ctx;
  const primaryPath = query.primaryPath;
  const pageClasses = getClassesForPage('blog')


  const pageData = await strapi.processReq(
    "GET",
    `pages?slug=blog`
  );
  const data = pageData && pageData.length ? pageData[0] : null;
  return { props: { data, pageClasses } };
}

export default Blog;
