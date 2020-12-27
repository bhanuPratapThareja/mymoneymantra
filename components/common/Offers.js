import { useState, useEffect } from 'react'
import Image from '../ImageComponent/ImageComponent'
import { viewOffer,customerOfferData } from '../../services/offersService'

const Offers = props => {
   // const router = useRouter()
   const [cards, setCards] = useState([])
   const [heading, setHeading] = useState('')

   useEffect(() => {
      console.log(props)
      const cards =  props.data.credit_card_products || props.data.personal_loan_products || []
      // console.log('cards: ', cards)
      const heading = props.data.section_heading
      setCards(cards)
      setHeading(heading)
   },[])


   const redirectToDetailsPage = (bank, product) => {
      // console.log(props.primaryPath)
      // console.log(bank)
      // console.log(product)
      //   const path = router.query.path[0]
      //   if (!bank || !product) {
      //      Router.push('/404')
      //      return
      //   }
      //   router.push(`/${path}/${bank}/${product}`)
   }

   if (!cards.length) {
      return null
   }

   // const { section_heading, cards } = props.data

   return (
      <section data-aos="fade-up" className="container popular-card-container">
         <div className="popular-cards">
            <h2>{heading}</h2>
            <div className="popular-cards-slider" id="popular-cards-sec">
               {cards.map(offer => {
                  const { id, bank, product_name, cards_features, annual_fee, intrest_rate, usp_highlights, slug } = offer
                  return (
                     <div className="popular-cards-slider-card" key={id} onClick={() => redirectToDetailsPage(bank.slug, slug)}>
                        <div className="popular-cards-slider-card-top">
                           <div className="head">
                              <h3><b className="card_name">{bank.bank_name}</b><br />{product_name}</h3>
                              <Image image={bank.bank_logo} />
                           </div>
                           <div className="content">
                              <ul>
                                 {cards_features.map(feature => <li style={{listStyle: 'none'}} key={feature.id}><span dangerouslySetInnerHTML={{ __html: feature.card_feature }}></span></li>)}
                              </ul>
                           </div>

                           {annual_fee ? <div className="fee">
                              <h5><b>₹{annual_fee.fy_annual_fee}</b> Annual fee</h5>
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