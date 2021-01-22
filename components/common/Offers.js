import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'
import { viewOffer, customerOfferData, getProductDecisionForDetailsBanner } from '../../services/offersService'

const Offers = props => {
   const router = useRouter()
   const primaryPath = router.query.primaryPath
   const [cards, setCards] = useState([])

   useEffect(() => {
      const cards = props.data.credit_card_products || props.data.personal_loan_products || props.data.home_loan_products || []
      setTimeout(() => {
         localStorage.setItem('productId', cards[0].productId)
      }, 2000);
      setCards(cards)
      dataToShow()
   }, [])


   const dataToShow = async() =>{
      let offerData =  await customerOfferData();
      let { populars,trendings } = offerData
      console.log('inside offer.js populars productId',populars[0].productId)
      console.log('inside offer.js trendings productId',trendings[0].productId)

   }
   

   const redirectToDetailsPage = async offer => {
      const { bank, slug: productSlug } = offer
      const { slug: bankSlug } = bank
      const productDetails = await getProductDecisionForDetailsBanner(offer, bank, primaryPath)
      if(productDetails.productDecision === 'Apply Now') {
         props.goToShortFormPage()
         return
      }
      router.push(`/${primaryPath}/${bankSlug}/${productSlug}`)
   }

   if (!cards.length) {
      return null
   }

   const { section_heading } = props.data
   

   return (
      <section data-aos="fade-up" className="container popular-card-container">
         <div className="popular-cards">
            <h2>{section_heading}</h2>
            <div className="popular-cards-slider" id="popular-cards-sec">
               {cards.map(offer => {
                  const { id, bank, product_card_name,product_name, cards_features, annual_fee_fy, intrest_rate, usp_highlights } = offer
                  return (
                     <div className="popular-cards-slider-card" key={id} onClick={() => redirectToDetailsPage(offer)}>
                        <div className="popular-cards-slider-card-top">
                           <div className="head">
                              <h3><b className="card_name">{bank.bank_name}</b><br />{product_card_name || product_name}</h3>
                              <Image image={bank.bank_logo} />
                           </div>
                           <div className="content">
                              <ul>
                                 {cards_features.map(feature => <li key={feature.id}><span dangerouslySetInnerHTML={{ __html: feature.card_feature }}></span></li>)}
                              </ul>
                           </div>

                           {annual_fee_fy ? <div className="fee">
                              <h5><b>₹{annual_fee_fy}</b> Annual fee</h5>
                           </div> : null}

                           {intrest_rate ? <div className="fee">
                              <div dangerouslySetInnerHTML={{ __html: intrest_rate }}></div>
                           </div> : null}
                        </div>
                        <div className="popular-cards-slider-card-bottom">
                           <div dangerouslySetInnerHTML={{ __html: usp_highlights }}></div>
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