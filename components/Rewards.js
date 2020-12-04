import { useState, useEffect } from 'react'
import Strapi from '../providers/strapi'

const Rewards = props => {
   const { heading, sub_text, button } = props.rewards
   function goToShortFormPage() {
      window.scrollTo({
          top: 1000,
          behavior: 'smooth'
      });
  }

  function rewardsCta(){
     if(props.path==='credit-cards'){
      goToShortFormPage()
     }
  }

   return (
      <section data-aos="fade-up" className="container reward-cover aos-init">
         <div className="reward">
            <div className="reward-content">
               <h3>{heading}</h3>
               <p>{sub_text}</p>
            </div>
            <div className="reward-button">
              
           <button onClick={rewardsCta}>{button}</button>
               
            </div>
         </div>
      </section>
   )

}

export default Rewards;

