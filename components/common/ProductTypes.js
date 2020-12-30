import { useState, useEffect } from 'react'
import Strapi from '../../providers/strapi'
import Link from 'next/link'

const ProductType = props => {
    const strapi = new Strapi()
    const [leftPositionedProductTypes, setlLeftPositionedProductTypes] = useState([])
    const [rightPositionedProductTypes, setlRightPositionedProductTypes] = useState([])

    useEffect(() => {
        let leftProductTypes = []
        let rightProductTypes = []
        props.data.home_product_types.forEach(productType => {
            if (productType.home_product_type_position === 'left') {
                leftProductTypes.push(productType)
            } else {
                rightProductTypes.push(productType)
            }
        })
        setlLeftPositionedProductTypes(leftProductTypes)
        setlRightPositionedProductTypes(rightProductTypes)
    }, [])

    return (
        <section data-aos="fade-up" className="product aos-init">
            <div className="container product-wrapper" id="pb-section">

                <div className="product-wrapper-left">
                    {leftPositionedProductTypes.map(productType => {
                        const { home_product_type_heading_label, home_product_type_image, home_product_type_url } = productType
                        return (
                            <Link href={home_product_type_url} key={productType.id}>
                                <a className="product-block">
                                    <img src={`${strapi.baseUrl}${home_product_type_image.url}`} alt={home_product_type_image.name} />
                                    <h3>{home_product_type_heading_label}</h3>
                                    <img className="flow-arrow" src="/assets/images/icons/arrow-right-32.svg" alt="" />
                                </a>
                            </Link>
                        )
                    })}

                </div>

                <div className="product-wrapper-right">
                    {rightPositionedProductTypes.map(productType => {
                        const { home_product_type_heading_label, home_product_type_image, home_product_type_url } = productType
                        return (
                            <Link href={home_product_type_url} key={productType.id}>
                                <a className="product-block">
                                    <img src={`${strapi.baseUrl}${home_product_type_image.url}`} alt={home_product_type_image.name} />
                                    <h3>{home_product_type_heading_label}</h3>
                                    <img className="flow-arrow" src="/assets/images/icons/arrow-right-32.svg" alt="" />
                                </a>
                            </Link>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default ProductType