import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Strapi from '../../providers/strapi'
import Layout from '../../components/Layout'
import LongForm from '../../components/common/LongForm'


const RKPLBank = props => {
    const router = useRouter()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = (dynamic, preferredSelectionLists) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'form-components.long-form-component-new':
                    return <LongForm 
                                key={block.id} 
                                data={block} 
                                preferredSelectionLists={preferredSelectionLists}
                            />
            }
        })
    }


    return (
        <div className="long-form">
            <div className="mobile-background"></div>
            {props.data ? <Layout>
                <section className="long-form-wrapper">
                    {getComponents(props.data.dynamic, props.preferredSelectionLists)}
                </section>
            </Layout> : null}

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const primaryPath = 'rkpl'
    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-long-form`)
    const data = pageData[0]
    const preferredSelectionLists = await strapi.processReq("GET", `list-preferences`)

    return { props: { data, preferredSelectionLists } }

}

export default RKPLBank