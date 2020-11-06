const FinancialTools = props => {
   const { tools } = props
   return (
      <section data-aos="fade-up" className="container aos-init aos-animate">
         <div className="financial">
            <h2>Financial tools</h2>
            <div className="financial-wrapper">
               {tools.map(tool => {
                  return (
                     <div className="financial-wrapper-card" key={tool.id}>
                        <div className="financial-wrapper-card-content">
                           <h3>{tool.heading}</h3>
                           <h5>{tool.sub_text}</h5>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>
   )
}

export default FinancialTools