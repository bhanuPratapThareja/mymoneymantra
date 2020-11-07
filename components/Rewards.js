const Rewards = (props) => {
   console.log('props for rewrds: ', props)
   return (
      <section data-aos="fade-up" className="container reward-cover aos-init aos-animate">
         <div className="reward">
            <div className="reward-content">
               <h3>heading</h3>
               {/* <p>{sub_text}</p> */}
            </div>
            <div className="reward-button">
               {/* <button>{button}</button> */}
            </div>
         </div>
      </section>
   )

}

export default Rewards