import Strapi from '../providers/strapi'
import MarkDown from '../Utils/markdown'

const Banks = props => {
    const strapi = new Strapi()
    let banks_heading = props.banks.banks_heading;
    let showBankImage = props.banks.repeatable_new_bank;

    return (

        <section data-aos="fade-up" className="banks-holder">
            <div className="blue-patch"></div>
            <div className="container banks">
                <h2>The best offers from India’s most <br /><b>trusted banks</b></h2>
                <div className="banks-slider">
                    <div className="slide_cell"><img src="/assets/images/credit-card-flow/sbi.svg" alt="sbi" /></div>
                    <div className="slide_cell"><img src="/assets/images/credit-card-flow/hdfc.svg" alt="hdfc" /></div>
                    <div className="slide_cell"><img src="/assets/images/credit-card-flow/axis.svg" alt="axis" /></div>
                    <div className="slide_cell"><img src="/assets/images/credit-card-flow/citi.svg" alt="citi" /></div>
                    <div className="slide_cell"><img src="/assets/images/credit-card-flow/axis.svg" alt="axis" /></div>
                    <div className="slide_cell"><img src="/assets/images/credit-card-flow/citi.svg" alt="citi" /></div>
                </div>
            </div>
        </section>


        // <section data-aos="fade-up" className="banks-holder aos-init">
        //     <div className="blue-patch"></div>
        //     <div className="container banks">
        //         <MarkDown markDown={banks_heading} />
        //         <div className="banks-slider slick-initialized slick-slider">

        //             <button className="slick-prev slick-arrow slick-disabled" aria-label="Previous" type="button" aria-disabled="true" style={{ display: "inline-block" }}>
        //                 Previous
        //             </button>
        //             <div className="slick-list draggable">

        //                 <div className="slick-track" style={{ opacity: "1", width: "1116px", transform: "translate3d(0px, 0px, 0px)" }}>
        //                     {showBankImage && showBankImage.map(banksImage => {

        //                         return (

        //                             <div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style={{ width: "186px" }} key={banksImage.id}>

        //                                 <div>
        //                                     <div className="slide_cell" style={{ width: "100%", display: "inline-block" }}>
        //                                         <img src={`${strapi.baseUrl}${banksImage.image.url}`} alt={banksImage.image.name} />
        //                                     </div>
        //                                 </div>

        //                             </div>
        //                         )
        //                     })}
        //                 </div>
        //             </div>

        //             <button className="slick-next slick-arrow" aria-label="Next" type="button" aria-disabled="false">
        //                 Next
        //             </button>
        //         </div>
        //     </div>

        // </section>

    )
}

export default Banks