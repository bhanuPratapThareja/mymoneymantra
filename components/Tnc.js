const TermsAndConditions = props => {
    const tcns = props.tncsData[0].terms_and_conditions
    console.log('tncs: ', tcns)
    return (
        <div>
            <span dangerouslySetInnerHTML={{ __html: tcns }}></span>
        </div>
      )
}

export default TermsAndConditions