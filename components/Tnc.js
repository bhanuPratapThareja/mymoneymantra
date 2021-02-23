const TermsAndConditions = props => {
    return (
        <div className="tnc">
            <span dangerouslySetInnerHTML={{ __html: props.tncData.content }}></span>
        </div>
      )
}

export default TermsAndConditions