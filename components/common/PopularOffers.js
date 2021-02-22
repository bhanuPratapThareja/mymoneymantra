import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'
import { makeDecision } from '../../utils/decision'
import { getProductType } from '../../utils/localAccess'
import { extractOffers, viewOffers } from '../../services/offersService'
import { getFormattedCurrency, getWholeNumberFromCurrency } from "../../utils/formattedCurrency"

const PopularOffers = props => {
   const router = useRouter()
   const [popularOffers, setPopularOffers] = useState([])
   const { section_heading } = props.data

   useEffect(() => {
      if (!popularOffers.length) {
         getOffers()
      }
   }, [popularOffers])

   const getOffers = async () => {
      const productType = getProductType()
      const apiOffers = await viewOffers(productType.productTypeId)
      if (apiOffers) {
         let populars = apiOffers.populars
         const popularOffers = await extractOffers(populars)
         setPopularOffers(popularOffers)
         if (window !== undefined && window.initSlickCards && popularOffers.length) {
            setTimeout(() => {
               window.initSlickCards()
            }, 1000)
         }
      }
   }

   const onOfferClick = async offer => {
      const { productDecision } = offer
      const decision = makeDecision(productDecision, offer, props.primaryPath, null)
      const { pathname, query } = decision
      router.push({ pathname, query }, pathname, { shallow: true })
   }

   if (!popularOffers.length) {
      return null
   }

   return (
      <section data-aos="fade-up" className="container popular-card-container aos-init aos-animate">
         <div className="popular-cards">
            <h2>{section_heading}</h2>
            <div className="popular-cards-slider" id="popular-cards-sec">
               {popularOffers.map(offer => {
                  const { bank, product } = offer
                  const { product_name, product_feature, product_annual_fee,
                     product_usp_highlight, product_interest_rate, 
                     product_tenure, product_loan_amount,product_emi } = product

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

                           {product_annual_fee ? <div className="fee">
                              <h5><b>₹{product_annual_fee.annual_fee_fy}</b> Annual fee</h5>
                           </div> : null}

                           <div className="fee">
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
                                 Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product_emi.emi)}</b></span></h5> :null}

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

export default PopularOffers