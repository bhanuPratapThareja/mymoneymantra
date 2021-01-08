import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Strapi from '../../../../../providers/strapi'
import Layout from '../../../../../components/Layout'
import LongFormBanner from '../../../../../components/common/LongFormBanner'
import LongForm from '../../../../../components/common/LongForm'
import { getLongFormSearchParams } from '../../../../../utils/searchParams'
import { getProductAndBank } from '../../../../../services/formService'
import { getDetailsSearchParams } from '../../../../../utils/searchParams'

const LongFormProduct = props => {
    const router = useRouter()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getComponents = (dynamic, bankData, productData) => {
        // console.log('dynamic: ', dynamic)
        return dynamic.map(block => {
            switch (block.__component) {
                case 'banners.long-form-banners-component':
                    return <LongFormBanner key={block.id} data={block} bank={bankData} product={productData} />

                case 'form-components.long-form-component-new':
                    return <LongForm key={block.id} data={block} />
            }
        })
    }

    if (!props.data) {
        const { primaryPath, longFormBank, longFormProduct } = router.query
        alert(`Page does not exist. Redirecting you to ${primaryPath.split('-').join(' ')} page`)
        const pathname = `/${primaryPath}`
        router.push(pathname)
        return <div className="interim-class"></div>
    }

    return (
        <div className="long-form">
            <div className="mobile-background"></div>
            {props.data ? <Layout>
                <section className="long-form-wrapper">
                    {getComponents(props.data.dynamic, props.bankData, props.productData)}
                </section>
            </Layout> : null}

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    const { query } = ctx
    const { primaryPath, longFormBank, longFormProduct } = query
    let data = null
    let bankData = null
    let productData = null

    const pageData = await strapi.processReq('GET', `pages?slug=${primaryPath}-${longFormBank}-long-form`)

    if (pageData) {
        data = pageData[0]

        const search = getDetailsSearchParams(primaryPath, longFormBank, longFormProduct)
        const detailsData = await strapi.processReq('GET', search)
        const details = detailsData[0]
        bankData = details.bank
        console.log('bankData: ', bankData)

        const creditCardProductData = details.credit_card_product ? details.credit_card_product : null
        const personalLoanProductData = details.personal_loan_product ? details.personal_loan_product : null
        const homeLoanProductData = details.home_loan_product ? details.home_loan_product : null
        productData = creditCardProductData || personalLoanProductData || homeLoanProductData
        console.log('productData: ', productData)

        return { props: { data, bankData, productData } }
    } else {
        return { props: { data: null } }
    }


}

export default LongFormProduct