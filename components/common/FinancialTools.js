const FinancialTools = props => {
   const { section_heading, quick_financial_tools } = props.data
   return (
      <section data-aos="fade-up" className="container aos-init">
         <div className="financial">
            <h2>{section_heading}</h2>
            <div className="financial-wrapper">
               {quick_financial_tools.map(tool => {
                  return (
                     <div className="financial-wrapper-card" key={tool.id}>
                        <div className="financial-wrapper-card-content">
                           <div dangerouslySetInnerHTML={{ __html: tool.heading }}></div>
                           <div dangerouslySetInnerHTML={{ __html: tool.sub_text }}></div>
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