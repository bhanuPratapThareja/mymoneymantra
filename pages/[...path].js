import Strapi from '../providers/strapi'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import CreditScore from '../components/CreditScore'
import Banks from '../components/Banks'
import FinancialTools from '../components/FinancialTools'
import Rewards from '../components/Rewards'
import Offers from '../components/Offers'
import TrendingOffers from '../components/TrendingOffers'
import LearnMore from '../components/LearnMore'
import Blog from '../components/Blog'
import ShortExtendedForm from '../components/ShortExtendedForm';
import { getApiData } from '../api/api'
import { getMastersData } from '../services/mastersService'
import { useEffect, useState } from 'react';

const Home = props => {

    const { data, path, bankMaster } = props


    const getComponents = (dynamic, path, bankMaster) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner':
                    return <Banner key={block.id} data={block} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block} />
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
                    return <ShortExtendedForm key={block.id} data={block} path={path} bankMaster={bankMaster} />
            }
        })
    }
    


    return (
        <div className="credit-card-flow">

            {/* <br /><br /><br /><br /><br /><br /><br /><br />
            <Button variant="contained" onClick={handleOpen}>Open OTP Popup</Button>
            <SmsOtpModal open={open} handleClose={handleClose} />            */}

            {props ? <Layout>{getComponents(data.dynamic, path, bankMaster)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    let props = {}
    let bankMaster = []
    try{
        const masterData = await getMastersData()
        console.log('masterData from master: ', masterData)
        bankMaster = masterData.bankMaster

    } catch(err) {

    }
        

    try {
        const [path] = ctx.params.path
        const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
        const data = pageData[0]
        props = { data, path }
    } catch (err) {
    }

    return { props: { ...props, bankMaster } }
}

export default Home