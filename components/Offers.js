import { useEffect, useState } from "react"
import $ from 'jquery'


const Offers = props => {
   const [offers, setOffers] = useState([])

   useEffect(() => {
      let arrLength = props.data.cards.length
      let centerIndex = Math.round(arrLength / 3)
      let array1 = []
      let array2 = []
      let array3 = []

      props.data.cards.forEach((card, index) => {
         if (index === centerIndex) {
            card['data-slick-index'] = 0
            array2.push(card);
         }
         if (index < centerIndex) {
            array1.push(card);
         }
         if (index > centerIndex) {
            array3.push(card);
         }
      })

      var revIndex = 0
      for (var i = array1.length - 1; i >= 0; i--) {
         array1[i]['data-slick-index'] = revIndex - 1
         revIndex--
      }

      for (let i = 0; i < array3.length; i++) {
         array3[i]['data-slick-index'] = i + 1
      }

      let newCards = [...array1, ...array2, ...array3]
      newCards.forEach(card => {
         if (card['data-slick-index'] < -1) {
            card.classes = "slick-slide"
         }
         if (card['data-slick-index'] == -1) {
            card.classes = "slick-slide slick-active"
         }
         if (card['data-slick-index'] == 0) {
            card.classes = "slick-slide slick-active slick-current slick-center"
         }
         if (card['data-slick-index'] == 1) {
            card.classes = "slick-slide slick-active"
         }
         if (card['data-slick-index'] > 1) {
            card.classes = "slick-slide"
         }
      })
      setOffers(newCards)
   }, [])

   return (
      <section data-aos="fade-up" className="container popular-card-container aos-init aos-animate">
         <div className="popular-cards">
            <h2>{props.data.section_heading}</h2>
            <div className="popular-cards-slider slick-initialized slick-slider" id="trending-offers-sec"><button className="slick-prev slick-arrow" aria-label="Previous" type="button" >Previous</button>

               <div className="slick-list draggable" style={{ padding: '0px 50px' }} >
                  <div className="slick-track" style={{ opacity: '1', width: '20000px', transform: 'translate3d(-170px, 0px, 0px)' }} >

                     {offers.map(offer => {


                        return (
                           <div key={offer.id} className={offer.classes} data-slick-index={offer['data-slick-index']} aria-hidden="false" tab-index="-1" >
                              <div>
                                 <div className="popular-cards-slider-card" style={{ width: '100%', display: 'inline-block' }}>
                                    <div className="popular-cards-slider-card-top">
                                       <div className="head">
                                          <h3><b className="card_name">{offer.bank_name}</b><br />{offer.product_type}</h3>
                                          <img src="images/icons/citi-logo.png" />
                                       </div>
                                       <div className="content">
                                          <ul>
                                             {offer.fbp.fbp_text.map(fbp => <li key={fbp.id}>{fbp.text}</li>)}
                                          </ul>
                                       </div>
                                       <div className="fee">
                                          <h5><b>{offer.price}</b> Annual fee</h5>
                                       </div>
                                    </div>
                                    <div className="popular-cards-slider-card-bottom">
                                       <div>
                                          <h5>{offer.usp_highlights}</h5>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     })}





                  </div></div><button className="slick-next slick-arrow" aria-label="Next" type="button" >Next</button></div>
         </div>
      </section>
   )
}

export default Offers