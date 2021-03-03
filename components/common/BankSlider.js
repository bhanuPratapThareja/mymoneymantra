import { useEffect } from 'react'
import Image from '../ImageComponent/ImageComponent'
import { useRouter } from 'next/router'

const BankSlider = props => {
    const router = useRouter()
    useEffect(() => {
        if (window !== undefined && window.initSlickBanks && props.data.bank_slider.bank_slider_images_new.length) {
            window.initSlickBanks()
        }
    }, [])

    const { bank_slider_heading, bank_slider_images_new } = props.data.bank_slider
    const { primaryPath } = props


    const onClickBank = url => {
        let redirectedUrl = `/${primaryPath}${url}`
        router.push(redirectedUrl)
    }

    return (
        <section data-aos="fade-up" className="banks-holder aos-init aos-animate">
            <div className="blue-patch"></div>
            <div className="container banks">
                <div dangerouslySetInnerHTML={{ __html: bank_slider_heading }}></div>
                <div className="banks-slider">
                    {bank_slider_images_new.map((image) => {
                        return (
                            <div className="slide_cell" key={image.id} >
                                <div onClick={() => onClickBank(image.redirect_url)}>
                                    <Image image={image.images} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

    )
}

export default BankSlider