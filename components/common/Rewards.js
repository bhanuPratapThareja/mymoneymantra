const Rewards = props => {
   const { rewards_heading, rewards_sub_text, rewards_button, rewards_button_url } = props.data.reward

   const onClickRewardsButton = url => {
   
         const shortFormEl = document.getElementsByClassName('lets-find-container')
       if (shortFormEl.length) {
          const shortFormElOffset = shortFormEl[0].offsetTop - 85
          window.scrollTo({ top: shortFormElOffset })
       } else {
          window.scrollTo({ top: 0 })
       }
     
   }

   return (
      <section data-aos="fade-up" className="container reward-cover aos-init">
         <div className="reward">
            <div className="reward-content">
               <div dangerouslySetInnerHTML={{ __html: rewards_heading }}></div>
               <div dangerouslySetInnerHTML={{ __html: rewards_sub_text }}></div>
            </div>
            <div className="reward-button">
               <button onClick={() => onClickRewardsButton(rewards_button_url)}> {rewards_button} </button>
            </div>
         </div>
      </section>
   )

}

export default Rewards

