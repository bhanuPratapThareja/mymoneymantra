import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'

const ThankYouBanner = props => {
    const router = useRouter()
    const { thank_you_icon, thank_you_text, thank_you_sub_text,
        thank_you_button } = props.data.thank_you_banner

    const { leadId, bank, productType } = props

    const viewMoreRedirect = () => {
        const url = `/${productType.slug}/listings`
        router.push(url)
    }

    return (
        <div className="thankyou-page">
            <div className="mobile-background"></div>
            <div className="combined-wrapper">
                {productType ? <section className="banner container">
                    <div className="thankyou-banner">
                        <div className="top" style={{ textAlign: 'center' }}>
                            <Image image={thank_you_icon} />
                            {bank ? <>
                                <div style={{ marginBottom: '10px' }} dangerouslySetInnerHTML={{ __html: thank_you_text }}></div>
                                <p>{`for applying for a ${productType.product_type_name.slice(0, -1)}`}</p>
                                <p>{` with ${bank.bankName}.`}</p>
                            </> : null}
                        </div>
                        {leadId ? <div className="bottom">
                            <div dangerouslySetInnerHTML={{ __html: thank_you_sub_text }}></div>
                            <h2 style={{ color: 'darkgrey' }}>{leadId}</h2>
                            <div className="track-button">
                                <button >{thank_you_button}</button>
                            </div>
                            <div className="track-button" onClick={viewMoreRedirect}>
                                <button >{'View More'}</button>
                            </div>
                        </div> : null}
                    </div>
                </section> : null}
            </div>
        </div>
    )
}

export default ThankYouBanner