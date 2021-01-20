const ProductSlider = props => {
    
    const {Blog_product_card,product_type_slider_heading} = props.data.product_type_slider

    return (
        <section data-aos="fade-up" className="banks-holder aos-init">
            <div className="blue-patch"></div>
            <div className="container banks">
                <div dangerouslySetInnerHTML={{ __html: product_type_slider_heading }}></div>
                <div className="banks-slider">
                    { Blog_product_card.map(card => {
                        return (
                            <div className="slide_cell" key={card.id}>
                              <h3>{card.blog_products_cards_text}</h3> 
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProductSlider