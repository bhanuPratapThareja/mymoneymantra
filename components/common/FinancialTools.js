const FinancialTools = props => {
   const { section_heading, quick_financial_tools } = props.data

   return (
      <section data-aos="fade-up" className="container aos-init aos-animate">
         <div className="financial">
            <h2>{section_heading}</h2>
            <div className="financial-wrapper">
               {quick_financial_tools.map(tool => {
                  return (
                     <div className="financial-wrapper-card" key={tool.id}>
                        <div className="financial-wrapper-card-content">
                           <div dangerouslySetInnerHTML={{ __html: tool.heading }}></div>
                           <p style={{ marginTop: '8px' }}>{tool.display_sub_text}</p>
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