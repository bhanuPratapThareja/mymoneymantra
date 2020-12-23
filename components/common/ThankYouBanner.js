import { useRouter } from 'next/router'
import Image from '../ImageComponent/ImageComponent'

const ThankYouBanner = props => {
    const router = useRouter()
    const { thank_you_icon, thank_you_text, thank_you_sub_text,
        thank_you_content, thank_you_button } = props.data.thank_you_banner

    function comingSoon() {
        alert("Coming Soon")
    }

    return (
        <div className="thankyou-page">
            <div className="mobile-background"></div>
            <div className="combined-wrapper">
                <section className="banner container">
                    <div className="thankyou-banner">
                        <div className="top" style={{ textAlign: 'center' }}>
                            <Image image={thank_you_icon} />
                            <div style={{ marginBottom: '10px' }} dangerouslySetInnerHTML={{ __html: thank_you_text }}></div>

                            {router.query.bank_name ? <>
                                <p>{'for applying for a'}</p>
                                <p>{` with ${router.query.bank_name}`}</p>
                            </>
                                : null}
                        </div>
                        <div className="bottom">
                            <div dangerouslySetInnerHTML={{ __html: thank_you_sub_text }}></div>
                            {router.query.updatedLeadId ? <h2>{router.query.updatedLeadId}</h2> : ""}
                            <div className="track-button">
                                <button onClick={comingSoon}>{thank_you_button}</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ThankYouBanner;