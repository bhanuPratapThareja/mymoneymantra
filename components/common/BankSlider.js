import { useEffect } from 'react'
import Image from '../ImageComponent/ImageComponent'

const BankSlider = props => {

    useEffect(() => {
        if(window !== undefined && window.initSlickBanks) {
            window.initSlickBanks() 
         }
     }, [])
    const { bank_slider_heading, bank_slider_images } = props.data.bank_slider

    return (
        <section data-aos="fade-up" className="banks-holder aos-init">
            <div className="blue-patch"></div>
            <div className="container banks">
                <div dangerouslySetInnerHTML={{ __html: bank_slider_heading }}></div>
                <div className="banks-slider">
                    {bank_slider_images.map(image => {
                        return (
                            <div className="slide_cell" key={image.id}>
                                <Image image={image} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default BankSlider