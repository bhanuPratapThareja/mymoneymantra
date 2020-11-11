import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'
import ListingBanner from '../../components/Listing/ListingBanner'

const HomeLoan = ({ data }) => {

    const getComponents = blocks => {
        return blocks.map(block => {
            switch (block.__component) {
                case 'blocks.listing-banner':
                    return <ListingBanner key={block.id} data={block} />
            }
        })
    }

    return (
        <div className="listings">
            {data ? <Layout>{getComponents(data.blocks)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(props) {
    const strapi = new Strapi()
    const [path] = props.params.path
    const pageData = await strapi.processReq('GET', `pages?slug=home-loan-${path}`)
    const data = pageData[0]
    return { props: { data } }
}

export default HomeLoan