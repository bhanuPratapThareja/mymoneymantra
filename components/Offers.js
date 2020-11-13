import { useEffect, useState } from 'react'
import $ from 'jquery'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import Strapi from '../providers/strapi'
import { offerSlick } from '../Utils/offerSlick'

const Offers = props => {
   const strapi = new Strapi()
   const [offers, setOffers] = useState([])

   useEffect(() => {
      setOffers(offerSlick(props.data.cards));
   }, [])

   return (
      <section data-aos="fade-up" className="container popular-card-container aos-init aos-animate">
         <div className="popular-cards">
            <h2>{props.data.section_heading}</h2>
            <div className="popular-cards-slider slick-initialized slick-slider" id="trending-offers-sec"><button className="slick-prev slick-arrow" aria-label="Previous" type="button" >Previous</button>

               <button className="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button>

               <div className="slick-list draggable" style={{ padding: '0px 50px' }} >
                  <div className="slick-track" style={{ opacity: '1', width: '20000px', transform: 'translate3d(-210px, 0px, 0px)' }} >

                     <button className="slick-next slick-arrow" aria-label="Next" type="button">Next</button>

                     {offers.map(offer => {
                        return (
                           <div key={offer.id} className={offer.classes} data-slick-index={offer['data-slick-index']} aria-hidden="false" tab-index={offer['data-slick-index']} >
                              <div>
                                 <div className="popular-cards-slider-card" style={{ width: '100%', display: 'inline-block' }}>
                                    <div className="popular-cards-slider-card-top">
                                       <div className="head">
                                          <h3><b className="card_name">{offer.bank_name}</b><br />{offer.product_type}</h3>
                                          <img src={`${strapi.baseUrl}${offer.image.url}`} />
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