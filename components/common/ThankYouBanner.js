import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { getLeadId } from '../../utils/localAccess';
import Image from '../ImageComponent/ImageComponent'
import { getApiData } from '../../api/api'
import axios from 'axios'

const ThankYouBanner = props => {
    const router = useRouter()
    const { bankName, primaryPath } = router.query
    const [leadId, setLeadId] = useState('')
    const [productType, setProductType] = useState('')

    const { thank_you_icon, thank_you_text, thank_you_sub_text,
        thank_you_content, thank_you_button } = props.data.thank_you_banner

    useEffect(() => {
        let leadId = ''
        if(router.query.leadId) {
            leadId = router.query.leadId
        } else if(getLeadId(primaryPath)) {
            leadId = getLeadId(primaryPath)
        }

        setLeadId(getLeadId(primaryPath))
        const leadId = getLeadId(primaryPath)
        sendNotification(leadId)
        setLeadId(leadId)

        let productType = ''
        if (primaryPath === 'credit-cards') {
            productType = 'credit card'
        } else if (primaryPath === 'personal-loans') {
            productType = 'personal loan'
        } else if (primaryPath === 'home-loans') {
            productType = 'home loan'
        }
        setProductType(productType)
    }, [])

    const sendNotification = async(leadId) => {
        const { url, body } = getApiData('sendNotification')
        body.request.payload.leadId = leadId;
        body.request.payload.actionName = "Short Form Submit";
        try {
            const res = await axios.post(url, body)
            console.log('res',res)
            return res;
        } catch (error) { }
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

                            {leadId && bankName ? <>
                                <p>{`for applying for a ${productType}`}</p>
                                <p>{` with ${router.query.bankName} bank.`}</p>
                            </>
                                : null}
                        </div>

                        {leadId && bankName ? <div className="bottom">
                            <div dangerouslySetInnerHTML={{ __html: thank_you_sub_text }}></div>
                            <h2 style={{ color: 'darkgrey' }}>{leadId}</h2>
                            <div className="track-button">
                                <button >{thank_you_button}</button>
                            </div>
                        </div> : null}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ThankYouBanner;