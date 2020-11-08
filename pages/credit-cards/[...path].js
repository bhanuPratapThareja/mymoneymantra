import Strapi from '../../providers/strapi'

const HomeLoan = (props) => {
  return (
    <>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
      <p>This is home loan page</p>
    </>
  )
}

export async function getServerSideProps(props) {
  const strapi = new Strapi()
    const { path } = props.params
    // const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
    // const data = pageData[0]
    
    return { props: {  } }
}

export default HomeLoan