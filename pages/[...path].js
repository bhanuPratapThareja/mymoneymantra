import { useEffect, useState } from 'react';
import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import CreditScore from '../components/CreditScore'
import TrendingOffers from '../components/TrendingOffers'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import Rewards from '../components/Rewards'
import Offers from '../components/Offers'
import LearnMore from '../components/LearnMore'
import Blog from '../components/Blog'
import ShortExtendedForm from '../components/ShortExtendedForm';
import { getMastersData, getCompanyMastersData } from '../services/mastersService'
import { getCompanyMaster } from '../services/companiesMaster'
import { getPincodeMaster } from '../services/pincodeMaster'

const Home = props => {

    // const [companyMaster, setCompanyMaster] = useState(null)
    // const [pincodeMaster, setPincodeMaster] = useState(null)

    // useEffect(() => {
    //     const { companyMaster } = getCompanyMaster()
    //     const { pincodeMaster } = getPincodeMaster()
    //     setCompanyMaster(companyMaster)
    //     setPincodeMaster(pincodeMaster)
    // }, [])

    const { data, path, bankMaster, companyMasterData } = props

    const getComponents = (dynamic, path, bankMaster, companyMasterData) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner':
                    return <Banner key={block.id} data={block} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block} path={path} />
                case 'blocks.banks':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.offer':
                    return <Offers key={block.id} data={block} />
                case 'blocks.trending-offers':
                    return <TrendingOffers key={block.id} data={block} />
                case 'blocks.blogs':
                    return <Blog key={block.id} data={block} />
                case 'blocks.learn-more':
                    return <LearnMore key={block.id} data={block} />
                case 'blocks.credit-score':
                    return <CreditScore key={block.id} data={block} />
                case 'form-components.onboarding-short-form':
                    return <ShortExtendedForm
                        key={block.id}
                        data={block}
                        path={path}
                        bankMaster={bankMaster}
                        companyMaster={companyMasterData}
                      
                    />
            }
        })
    }
    // pincodeMaster={pincodeMaster}


    return (
        <div className="credit-card-flow">
            {props ? <Layout>{getComponents(data.dynamic, path, bankMaster, companyMasterData)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    let props = {}
    let bankMaster = []
    let companyMasterData = []

    try {
        const masterData = await getMastersData()
        bankMaster = masterData.bankMaster
    } catch (err) {
    }

    try {
        const companyData = await getCompanyMastersData()
        companyMasterData = companyData.companyMaster
    } catch (err) {
    }




    try {
        const [path] = ctx.params.path
        const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
        const data = pageData[0]
        props = { data, path }
    } catch (err) {
    }

    return { props: { ...props, bankMaster, companyMasterData } }
}

export default Home