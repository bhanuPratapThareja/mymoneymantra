import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'
import { makeDecision } from '../../utils/decision'
import { extractOffers, viewOffers } from '../../services/offersService'
import { setLeadBank, clearLeadId } from '../../utils/sessionAccess'
import { sf, ApplyNow } from '../../utils/types'

const Offers = props => {
    const router = useRouter()
    const [componentOffers, setComponentOffers] = useState([])
    const { section_heading } = props.data

    useEffect(() => {
        if (!componentOffers.length) {
            if (props.blogTrendingOffers) {
                setComponentOffers(props.blogTrendingOffers)
            } else {
               getOffers()
            }
         }
    },[])

    const getOffers = async () => {
        if (!props.componentType) {
            return
        }
        const offerType = props.componentType === 'offers.popular-offers-component' ? 'populars' : 'trendings'
        const apiOffers = await viewOffers(props.productType)
        if (apiOffers) {
            let offers = apiOffers[offerType]
            if(!offers || !offers.length) {
                return
            }
            const updatedOffers = await extractOffers(offers)
            setComponentOffers(updatedOffers)
        }
    }

    const redirectToShortForm = offer => {
        const { bank: { bank_name: bankName, bank_id: bankId }, productType } = offer
        const primaryPath = productType.slug
        const leadBank = { bankId, bankName }
        setLeadBank(leadBank)
        clearLeadId()
        if (router.pathname === '/[primaryPath]') {
            props.setFormRedirection(sf)
            props.goToShortForm()
        } else {
            const pathname = `/${primaryPath}`
            const query = { formRedirection: sf }
            router.push({ pathname, query }, pathname, { shallow: true })
        }
    }

    const onOfferClick = async offer => {
        const { productDecision, productType } = offer
        if (productDecision === ApplyNow) {
            redirectToShortForm(offer)
            
        } else {
            const decision = makeDecision(productDecision, offer, productType.slug, null)
            const { pathname, query } = decision
            router.push({ pathname, query }, pathname, { shallow: true })
        }
        
    }

    if (!componentOffers.length) {
        return null
    }

    const cardsComponentId = props.type === 'populars' ? 'popular-cards-sec' : 'trending-offers-sec'

    if (window !== undefined && window.initSlickCards && componentOffers.length) {
        setTimeout(() => {
            window.initSlickCards()
        }, 500)
    }

    return (
        <section data-aos="fade-up" className="container popular-card-container aos-init aos-animate">
            <div className="popular-cards">
                <h2>{section_heading}</h2>
                <div className="popular-cards-slider" id={cardsComponentId}>
                    {componentOffers.map(offer => {
                        const { bank, product } = offer
                        const { product_name, product_feature, product_annual_fee,
                            product_usp_highlight, product_interest_rate,
                            product_tenure, product_loan_amount, product_emi } = product
                        return (
                            <div className="popular-cards-slider-card" key={product.id}>
                                <div className="popular-cards-slider-card-top" onClick={() => onOfferClick(offer)}>
                                    <div className="head">
                                        <h3 className="card_name"><b>{bank.bank_name}</b><br />{product_name}</h3>
                                        <Image image={bank.bank_logo} />
                                    </div>
                                    <div className="content">
                                        <ul>
                                            {product_feature.product_feature.map(feature => <li key={feature.id}><span dangerouslySetInnerHTML={{ __html: feature.description }}></span></li>)}
                                        </ul>
                                    </div>

                                    <div className="fee">
                                        {product_annual_fee ?
                                            <h5><b>₹{product_annual_fee.annual_fee_fy}</b> Annual fee</h5>
                                            : null}


                                        {product_interest_rate ?
                                            <h5>Int Rates :<span><b>&nbsp; {product_interest_rate.min_value}% - {product_interest_rate.max_value}%
                              {product_interest_rate.duration === 'Annually' ? 'p.a.' : 'm.a.'}</b></span></h5>
                                            : null}

                                        {product_tenure ?
                                            <h5>Max Tenure : <span><b>&nbsp; {product_tenure.tenure}</b></span></h5>
                                            : null}

                                        {product_loan_amount ?
                                            <h5>Loan Amt : <span><b>&nbsp;{
                                                Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product_loan_amount.amount)}</b></span></h5>
                                            : null}

                                        {product_emi ?
                                            <h5>Lowest EMI : <span><b>&nbsp; {
                                                Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product_emi.emi)}</b></span></h5> : null}

                                    </div>
                                </div>
                                <div className="popular-cards-slider-card-bottom">
                                    <div dangerouslySetInnerHTML={{ __html: product_usp_highlight.highlight }}></div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default Offers