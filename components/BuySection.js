const BuySection = props => {
    const { find_and_compare_heading, find_and_compare_sub_text } = props.data.find_and_compare
    return (
        <section  data-aos="fade-up" className="buy-section aos-init">
            <div className="container buy-section-wrapper">
                <div dangerouslySetInnerHTML={{ __html: find_and_compare_heading }}></div>
                <div className="buy-section-wrapper-paragraph">
                    <div dangerouslySetInnerHTML={{ __html: find_and_compare_sub_text }}></div>
                </div>
            </div>
        </section>
    )
}

export default BuySection