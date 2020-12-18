import Strapi from '../../providers/strapi'
import { useRouter } from 'next/router';

const ThankYouBanner = props => {
    const router = useRouter();
    const strapi = new Strapi()
    const { thank_you_icon, thankyou_text, sub_text, sub_text_1, button } = props.data
    function comingSoon(){
        alert("Coming Soon")
      }

    return (
        <div className="thankyou-page">
            <div className="mobile-background"></div>
            <div className="combined-wrapper">
                <section className="banner container">
                    <div className="thankyou-banner">
                        <div className="top" style={{ textAlign: 'center' }}>
                            <img src={`${strapi.baseUrl}${thank_you_icon.url}`} alt={thank_you_icon.name} />
                            <h2 style={{ marginBottom: '10px' }}>{thankyou_text}</h2>
                            {router.query.bank_name ? <>
                                <p>{'for applying for a'}</p>
                                <p>{`Credit Card with ${router.query.bank_name}`}</p>
                            </>
                                : null}
                        </div>
                        <div className="bottom">
                            <h6>{sub_text_1}</h6>
                            {router.query.updatedLeadId ? <h2>{router.query.updatedLeadId}</h2> : ""}
                            <div className="track-button">
                                <button onClick={comingSoon}>{button}</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ThankYouBanner;