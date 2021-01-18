import Strapi from "../../providers/strapi";
import TermsAndConditions from "../../components/TermsAndConditons/TermsAndConditions";
import Layout from "../../components/Layout";

const TermsConditions = (props) => {
  const getComponents = (dynamic) => {
    return dynamic.map((block) => {
      switch (block.__component) {
        case "blocks.terms-and-conditions":
          return <TermsAndConditions key={block.id} data={block} />;
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

  const pageData = await strapi.processReq(
    "GET",
    `pages?slug=terms-and-conditions`
  );
  const data = pageData && pageData.length ? pageData[0] : null;
  console.log(data);
  return { props: { data } };
}

export default TermsConditions;
