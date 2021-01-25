import Link from "next/link"
import { useRouter } from "next/router"

const ProductSlider = props => {
    const router = useRouter()
    const { Blog_product_card, product_type_slider_heading } = props.data.product_type_slider
    const blogsByCategory = (card) => {
        // router.push({ pathname: '/blog/blog-search', query: { category: card.id } })
    }

    return (
        <section data-aos="fade-up" className="banks-holder aos-init">
            <div className="blue-patch"></div>
            <div className="container banks">
                <div dangerouslySetInnerHTML={{ __html: product_type_slider_heading }}></div>
                <div className="banks-slider">
                    {Blog_product_card.map(card => {

                        return (
                            <Link href={`/blog/blog-search?category=${card.id}`}>
                                <div className="slide_cell cstm-prd" key={card.id} onClick={blogsByCategory(card)} >
                                    <h3>{card.blog_products_cards_text}</h3>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProductSlider