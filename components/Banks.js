import Strapi from '../providers/strapi'
const strapi = new Strapi()

const Banks = props => {

    let bank_sub_text = props.banks.sub_text;
    let showBankImage = props.banks.repeatable_new_bank;

    return (
        <section data-aos="fade-up" className="banks-holder aos-init">
            <div className="blue-patch"></div>
            <div className="container banks">
                <h2>{bank_sub_text}</h2>
                <div className="banks-slider slick-initialized slick-slider">

                    <button className="slick-prev slick-arrow slick-disabled" aria-label="Previous" type="button" aria-disabled="true" style={{ display: "inline-block" }}>
                        Previous
                    </button>
                    <div className="slick-list draggable">

                        <div className="slick-track" style={{ opacity: "1", width: "1116px", transform: "translate3d(0px, 0px, 0px)" }}>
                            {showBankImage && showBankImage.map(banksImage => {
                                
                                return (

                                    <div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style={{ width: "186px" }} key={banksImage.id}>

                                        <div>
                                            <div className="slide_cell" style={{ width: "100%", display: "inline-block" }}>
                                                <img src={`${strapi.baseUrl}${banksImage.image.url}`} alt={banksImage.image.name} />
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <button className="slick-next slick-arrow" aria-label="Next" type="button" aria-disabled="false">
                        Next
                    </button>
                </div>
            </div>
       
        </section>

    )
}

export default Banks