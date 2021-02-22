import Strapi from "../../providers/strapi";
import Layout from "../../components/Layout";
import BlogBanner from '../../components/Banners/BlogBanner'
import BlogFilter from '../../components/common/BlogFilter'
import ProductSlider from '../../components/common/ProductSlider'
import Blogger from "../../components/common/Blogger"
import { getClassesForPage } from '../../utils/classesForPage'
import FeaturedContributors from "../../components/common/FeaturedContributors";
import { useEffect } from "react";
import { useRouter } from "next/router";
import RecentBlogs from "../../components/common/RecentBlogs";

const Blog = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const getComponents = (dynamic) => {
    console.log('blog index dynamic', dynamic)
    return dynamic.map((block) => {
      switch (block.__component) {
        case "banners.blog-banners-component":
          return <BlogBanner key={block.id} data={block} />;
        case "offers.popular-blogs-component":
          return <Blogger key={block.id} data={block} />;
        case "blocks.recent-blog":
          return <RecentBlogs key={block.id} data={block} />;
        case "blocks.blog-contributors-component":
          return <FeaturedContributors key={block.id} data={block} allBlogs={props.allBlogs} />
        case "blocks.blog-category":
          return <ProductSlider key={block.id} data={block} />;
        case "blocks.blog-list-component":
          return <BlogFilter key={block.id} data={props.allBlogs} blogsFilter={props.blogsFilter} />;

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
  const blogsFilter = await strapi.processReq('GET', `filters?slug=blogs-filter`)

  const pageData = await strapi.processReq(
    "GET",
    `pages?slug=blog`
  );
  const allBlogs = await strapi.processReq(
    "GET",
    `posts`
  );

  const data = pageData && pageData.length ? pageData[0] : null;
  return { props: { data, pageClasses, blogsFilter, allBlogs } };
}

export default Blog;
