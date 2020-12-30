const DecisionButton = props => {
    const { id, primaryPath, buttonText, offer } = props

    const buttonClick = () => {
        props.onButtonClick(primaryPath, buttonText, offer)
    }

    return (
        <button id={id} onClick={buttonClick}>{buttonText}</button>
    )
}

export default DecisionButton