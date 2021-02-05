const TermsAndConditions = props => {
    const tcns = props.tncsData[0].terms_and_conditions 
    return (
       <div dangerouslySetInnerHTML={{ __html: tcns }}></div>
      )
}

export default TermsAndConditions