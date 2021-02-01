import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { getPrimaryPath, getLeadId, getLeadBank } from '../../utils/localAccess';
import Image from '../ImageComponent/ImageComponent'

const ThankYouBanner = props => {
    const [productType, setProductType] = useState('')
    const { thank_you_icon, thank_you_text, thank_you_sub_text,
            thank_you_button } = props.data.thank_you_banner

    useEffect(() => {
        console.log('leadId:::',props.primaryPath)
        if(props.primaryPath === 'rkpl') {
            setProductType('Credit Card')
        } else {
            setProductType(props.primaryPath.split('-').join(' ').slice(0, -1))
        }
        setTimeout(() => {
            console.log('productType: ', productType)
        }, 1000)
    }, [])

    return (
        <div className="thankyou-page">
            <div className="mobile-background"></div>
            <div className="combined-wrapper">
                <section className="banner container">
                    <div className="thankyou-banner">
                        <div className="top" style={{ textAlign: 'center' }}>
                            <Image image={thank_you_icon} />
                            <div style={{ marginBottom: '10px' }} dangerouslySetInnerHTML={{ __html: thank_you_text }}></div>
                            <p>{`for applying for a ${'Credit Card'}`}</p>
                            <p>{` with ${props.bankName}.`}</p>
                        </div>

                        {props.leadId ? <div className="bottom">
                            <div dangerouslySetInnerHTML={{ __html: thank_you_sub_text }}></div>
                            <h2 style={{ color: 'darkgrey' }}>{props.leadId}</h2>
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

export default ThankYouBanner