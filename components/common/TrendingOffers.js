import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'
import { getProductDecision } from '../../services/offersService'

const TrendingOffers = props => {
   const router = useRouter()
   const { section_heading } = props.data

   useEffect(() => {
      if(window !== undefined && window.initSlickCards && props.offers.length) {
         window.initSlickCards()
      }
   })

   const onOfferClick = async offer => {
      const { product, bank } = offer
      const response = await getProductDecision([offer])
      const productDecision = response[0].productDecision
      if (productDecision === 'Apply Now') {
         props.goToShortFormPage()
         return
      }
      const { slug: bankSlug } = bank
      const { slug: productSlug } = product
      const primaryPath = props.primaryPath
      
      if(primaryPath === 'credit-cards') {
         router.push(`/${primaryPath}/${bankSlug}/${productSlug}`)
      } else {
         router.push(`/${primaryPath}/${bankSlug}`)
      }
   }

   if (!props.offers || !props.offers.length) {
      return null
   }

   return (
      <section data-aos="fade-up" className="container popular-card-container aos-init aos-animate">
         <div className="popular-cards">
            <h2>{section_heading}</h2>
            <div className="popular-cards-slider" id="popular-cards-sec">
               {props.offers.map(offer => {
                  const { bank, product } = offer
                  const { product_name, product_feature, product_annual_fee,
                     product_usp_highlight, product_interest_rate } = product
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

                           {product_interest_rate ? <div className="fee">
                              <h5>{product_interest_rate.min_value}% - {product_interest_rate.max_value}%
                              {product_interest_rate.duration === 'Annually' ? 'p.a.' : 'm.a.'}</h5>
                           </div> : null}
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

export default TrendingOffers