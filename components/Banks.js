import Strapi from '../providers/strapi'

const Banks = props => {
    const strapi = new Strapi()
    let banks_heading = props.banks.banks_heading;
    let showBankImage = props.banks.repeatable_new_bank;

    return (
        <section data-aos="fade-up" className="banks-holder">
            <div className="blue-patch"></div>
            <div className="container banks">
                <div dangerouslySetInnerHTML={{ __html: banks_heading }}></div>
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
    )
}

export default Banks