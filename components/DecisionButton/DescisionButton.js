import { useRouter } from 'next/router'
import { makeDecision } from '../../utils/decision'

const DecisionButton = props => {
    const router = useRouter()
    const primaryPath = router.query.primaryPath
    const { idForStyle, buttonText, offer } = props

    const onButtonClick = () => {
        const decision = makeDecision(buttonText, primaryPath, offer)
        const { pathname, query } = decision
        router.push({ pathname, query }, pathname, { shallow: true })
    }

    return (
        <button id={idForStyle} onClick={onButtonClick}>{buttonText}</button>
    )
}

export default DecisionButton