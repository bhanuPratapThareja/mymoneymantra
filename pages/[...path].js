import { useState } from 'react'
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
import SmsOtpModal from '../components/UI/SmsOtpModal/SmsOtpModal'
import { Button } from '@material-ui/core'

const Home = props => {

    const [open, setOpen] = useState(false)
    const [otp] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    }

    const getComponents = (dynamic, path) => {
        return dynamic.map(block => {
            switch (block.__component) {
                case 'blocks.product-banner':
                    return <Banner key={block.id} data={block} />
                case 'blocks.financial-tools':
                    return <FinancialTools key={block.id} tools={block} />
                case 'blocks.rewards':
                    return <Rewards key={block.id} rewards={block}  path={path}/>
                case 'blocks.banks':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.bank-new':
                    return <Banks key={block.id} banks={block} />
                case 'blocks.offer':
                    return <Offers key={block.id} data={block} />
                case 'blocks.trending-offers':
                    return <TrendingOffers key={block.id} data={block}  />
                case 'blocks.blogs':
                    return <Blog key={block.id} data={block} />
                case 'blocks.learn-more':
                    return <LearnMore key={block.id} data={block} />
                case 'blocks.credit-score':
                    return <CreditScore key={block.id} data={block} />
                case 'form-components.onboarding-short-form':
                    return <ShortExtendedForm key={block.id} data={block} path={path} />
            }
        })
    }

    const { data, path } = props


    return (
        <div className="credit-card-flow">

            {/* <br /><br /><br /><br /><br /><br /><br /><br />
            <Button variant="contained" onClick={handleOpen}>Open OTP Popup</Button>
            <SmsOtpModal open={open} handleClose={handleClose} />            */}

            {props ? <Layout>{getComponents(data.dynamic, path)}</Layout> : null}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const strapi = new Strapi()
    let props = {}
    let trendingOffers = null
    let trendingProductId = ''
    let offersData = []

    // try {
    //     const { url, body } = getApiData('offers')
    //     const res = await strapi.apiReq('POST', url, body)
    //     offersData = res.response.payload
    // } catch(err) {
    // }

    // try {
    //     trendingOffers = await strapi.processReq('GET', `products?_where[product_id]=${trendingProductId}`)
    // } catch (err) {
    // }

    try {
        const [path] = ctx.params.path
        const pageData = await strapi.processReq('GET', `pages?slug=${path}`)
        const data = pageData[0]
        props = { data, path }
    } catch (err) {
    }

    return { props: { ...props } }
}

export default Home