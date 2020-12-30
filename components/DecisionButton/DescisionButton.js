const DecisionButton = props => {
    const { id, buttonText, offer } = props

    const buttonClick = () => {
        props.onButtonClick(buttonText, offer)
    }

    return (
        <button id={id} onClick={buttonClick}>{buttonText}</button>
    )
}

export default DecisionButton