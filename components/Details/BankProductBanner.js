import { useEffect, useState } from 'react'
import { getProductDecision } from '../../services/offersService'
import Image from '../ImageComponent/ImageComponent'

const BankProductBanner = props => {
    const [buttonText, setButtonText] = useState('')
    const { heading, image, sub_text } = props.data

    useEffect(() => {
        const cards = props.offer
        getCardsWithButtonText(cards)
    }, [])

    const getCardsWithButtonText = async cards => {
        const offers = await getProductDecision([cards])
        // console.log('new cards: ', offers[0])
    }

    return (
        <div className="credit-card-flow c-detail-page">
            <div className="combined-wrapper">
                <section className="banner container cstm-mb">
                    <div className="banner-wrapper">
                        <div dangerouslySetInnerHTML={{ __html: heading }}></div>
                        <p>{sub_text}</p>
                        {/* <button onClick={() => cardButtonClick(buttonType)} id="apply-now">{buttonText}</button> */}
                    </div>
                    <div>
                        <Image className="banner-card" image={image} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BankProductBanner