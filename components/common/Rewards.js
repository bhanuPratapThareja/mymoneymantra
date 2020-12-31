import { useRouter } from 'next/router'

const Rewards = props => {
   const router = useRouter()
   const { rewards_heading, rewards_sub_text, rewards_button, rewards_button_url } = props.data.reward

   function onClickRewardsButton(url) {
      if (router.route.split('/').length <= 2) {
         window.scrollTo({
            top: 1000
         })
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

