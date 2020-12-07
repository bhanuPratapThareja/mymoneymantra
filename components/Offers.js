import { useEffect, useState } from 'react'
import Strapi from '../providers/strapi'

const Offers = props => {
   if(!props.data.cards){
      return null;
   }

   const strapi = new Strapi()
   return (
      <section data-aos="fade-up" className="container popular-card-container">
         <div className="popular-cards">
            <h2>Popular Credit Cards</h2>
            <div className="popular-cards-slider" id="popular-cards-sec">

               {props.data.cards.map(offer => {
                  return (
                     <div className="popular-cards-slider-card" key={offer.id}>
                        <div className="popular-cards-slider-card-top">
                           <div className="head">
                              <h3><b className="card_name">{offer.bank_name}</b><br />Platinum Delight Credit Card</h3>
                              <img src={`${strapi.baseUrl}${offer.image.url}`} />
                           </div>
                           <div className="content">
                              <ul>
                                 <li>Earn 10 reward points for every ₹125 spent at apparel & department stores</li>
                                 <li>Instant Redemption at select partner stores</li>
                              </ul>
                           </div>
                           <div className="fee">
                              <h5><b>₹2500</b> Annual fee</h5>
                           </div>
                        </div>
                        <div className="popular-cards-slider-card-bottom">
                           <div>
                              <h5>Lifetime reward points</h5>
                           </div>
                        </div>
                     </div>
                  )
               })}


               {/* <div className="popular-cards-slider-card" style={{ display: 'none' }}>
                  <div className="popular-cards-slider-card-top">
                     <div className="head">
                        <h3><b className="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                        <img src="/assets/images/icons/citi-logo.png" />
                     </div>
                     <div className="content">
                        <ul>
                           <li>Earn 10 reward points for every ₹125 spent at apparel & department stores</li>
                           <li>Instant Redemption at select partner stores</li>
                        </ul>
                     </div>
                     <div className="fee">
                        <h5><b>₹2500</b> Annual fee</h5>
                     </div>
                  </div>
                  <div className="popular-cards-slider-card-bottom">
                     <div>
                        <h5>Lifetime reward points</h5>
                     </div>
                  </div>
               </div>

               <div className="popular-cards-slider-card">
                  <div className="popular-cards-slider-card-top">
                     <div className="head">
                        <h3><b className="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                        <img src="/assets/images/icons/citi-logo.png" />
                     </div>
                     <div className="content">
                        <ul>
                           <li>Earn 10 reward points for every ₹125 spent at apparel & department stores</li>
                           <li>Instant Redemption at select partner stores</li>
                        </ul>
                     </div>
                     <div className="fee">
                        <h5><b>₹2500</b> Annual fee</h5>
                     </div>
                  </div>
                  <div className="popular-cards-slider-card-bottom">
                     <div>
                        <h5>Lifetime reward points</h5>
                     </div>
                  </div>
               </div>

               <div className="popular-cards-slider-card">
                  <div className="popular-cards-slider-card-top">
                     <div className="head">
                        <h3><b className="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                        <img src="/assets/images/icons/citi-logo.png" />
                     </div>
                     <div className="content">
                        <ul>
                           <li>Earn 10 reward points for every ₹125 spent at apparel & department stores</li>
                           <li>Instant Redemption at select partner stores</li>
                        </ul>
                     </div>
                     <div className="fee">
                        <h5><b>₹2500</b> Annual fee</h5>
                     </div>
                  </div>
                  <div className="popular-cards-slider-card-bottom">
                     <div>
                        <h5>Lifetime reward points</h5>
                     </div>
                  </div>
               </div> */}

            </div>
         </div>
      </section>
   )
}

export default Offers