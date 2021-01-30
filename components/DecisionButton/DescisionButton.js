import { useRouter } from 'next/router'
import { makeDecision } from '../../utils/decision'

const DecisionButton = props => {
    const router = useRouter()
    const { idForStyle, buttonText, offer, primaryPath, changePageType } = props

    const onButtonClick = () => {
        const decision = makeDecision(buttonText, offer, primaryPath, changePageType)
        const { pathname, query } = decision
        router.push({ pathname, query }, pathname, { shallow: true })
    }

    return (
        <button id={idForStyle} onClick={onButtonClick}>{buttonText}</button>
    )
}

export default DecisionButton