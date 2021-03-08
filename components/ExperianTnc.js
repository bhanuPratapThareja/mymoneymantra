const ExperianTnc = props => {
    console.log("propsddddddddd----------",props)
    return (
        <div className="tnc">
            <div dangerouslySetInnerHTML={{ __html: props.experianTncData.content }}></div>
        </div>
      )
}

export default ExperianTnc