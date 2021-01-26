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

    const getComponents = (dynamic, preferredBanks) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'form-components.long-form-component-new':
                    return <LongForm key={block.id} data={block}  preferredBanks={preferredBanks} />
            }
        })
    }


    return (
        <div className="long-form">
            <div className="mobile-background"></div>
            {props.data ? <Layout>
                <section className="long-form-wrapper">
                    {getComponents(props.data.dynamic, props.preferredBanks)}
                </section>
            </Layout> : null}

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const primaryPath = 'rkpl'
    console.log('in rkpl primaryPath',primaryPath)
    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-long-form`)
    const data = pageData[0]
    console.log('longformbank data',data)
   

    const preferredBanksData = await strapi.processReq("GET", `list-preferences`)
    const preferredBanks = preferredBanksData[0]

    return { props: { data, preferredBanks } }

}

export default RKPLBank