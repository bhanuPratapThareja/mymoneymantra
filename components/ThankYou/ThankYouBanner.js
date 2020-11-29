import Strapi from '../../providers/strapi'
import MarkDown from '../../Utils/markdown'

const ThankYouBanner = props => {
    const strapi = new Strapi()
    const { thank_you_icon, thankyou_text, sub_text, sub_text_1 ,button} = props.data

    return (
        <div className="thankyou-page">
            <div className="combined-wrapper">
                <section className="banner container">
                    <div className="thankyou-banner">
                        <div className="top">
                            <img src={`${strapi.baseUrl}${thank_you_icon.url}`} alt={thank_you_icon.name} />
                            <h2>{thankyou_text}</h2>
                            <MarkDown markDown={sub_text}/>
                            
                        </div>
                        <div className="bottom">
                            <h6>{sub_text_1}</h6>
                            <div className="track-button">
                                <button>{button}</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>




    )
}

export default ThankYouBanner;