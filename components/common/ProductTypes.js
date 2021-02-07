import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Strapi from '../../providers/strapi'
import Link from 'next/link'
import SvgImage from '../ImageComponent/SvgComponents'

const ProductType = props => {
    const strapi = new Strapi()
    const router = useRouter()
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

    const redirectToProductType = url => {
        console.log('url: ', url)
        if(!url) {
            router.push('/coming-soon')
            return
        }

        router.push(url)
    }

    return (
        <section data-aos="fade-up" className="product aos-init aos-animate">
            <div className="container product-wrapper" id="pb-section">

                <div className="product-wrapper-left">
                    {leftPositionedProductTypes.map(productType => {
                        const { home_product_type_heading_label, home_product_type_image, home_product_type_url } = productType
                        return (
                            <div onClick={() => redirectToProductType(home_product_type_url)} key={productType.id}>
                                <a className="product-block">
                                    <SvgImage image={home_product_type_image} />
                                    <h3>{home_product_type_heading_label}</h3>
                                    <img className="flow-arrow" src="/assets/images/icons/arrow-right-32.svg" alt="" />
                                </a>
                            </div>
                        )
                    })}

                </div>

                <div className="product-wrapper-right">
                    {rightPositionedProductTypes.map(productType => {
                        const { home_product_type_heading_label, home_product_type_image, home_product_type_url } = productType
                        return (
                            <div onClick={() => redirectToProductType(home_product_type_url)} key={productType.id}>
                                <a className="product-block">
                                    <SvgImage image={home_product_type_image} />
                                    <h3>{home_product_type_heading_label}</h3>
                                    <img className="flow-arrow" src="/assets/images/icons/arrow-right-32.svg" alt="" />
                                </a>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default ProductType