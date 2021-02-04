import Image from '../ImageComponent/ImageComponent'

const ThankYouBanner = props => {

    const { thank_you_icon, thank_you_text, thank_you_sub_text,
        thank_you_button } = props.data.thank_you_banner

    const { leadId, bank, productType } = props

    return (
        <div className="thankyou-page">
            <div className="mobile-background"></div>
            <div className="combined-wrapper">
                {bank && productType ? <section className="banner container">
                    <div className="thankyou-banner">
                        <div className="top" style={{ textAlign: 'center' }}>
                            <Image image={thank_you_icon} />
                            <div style={{ marginBottom: '10px' }} dangerouslySetInnerHTML={{ __html: thank_you_text }}></div>
                            <p>{`for applying for a ${productType.productTypeName.slice(0, -1)}`}</p>
                            <p>{` with ${bank.bankName}.`}</p>
                        </div>
                        <div className="bottom">
                            <div dangerouslySetInnerHTML={{ __html: thank_you_sub_text }}></div>
                            <h2 style={{ color: 'darkgrey' }}>{leadId}</h2>
                            <div className="track-button">
                                <button >{thank_you_button}</button>
                            </div>
                        </div>
                    </div>
                </section> : null}
            </div>
        </div>
    )
}

export default ThankYouBanner