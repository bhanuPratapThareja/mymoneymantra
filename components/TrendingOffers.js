import { useEffect, useState } from 'react'
import Strapi from '../providers/strapi'
import { offerSlick } from '../Utils/offerSlick'

const TrendingOffers = props => {
    const strapi = new Strapi()
    const [offers, setOffers] = useState([])

    useEffect(() => {
        let offers = []
        if (props.trendingOffers && props.trendingOffers.length) {
            props.trendingOffers[0].offers.forEach(item => {
                offers.push(item.card)
            })
        } else {
            offers = props.data.trending_offers
        }

        loadOffers(offers)

        $(document).ready(function () {
            $('.slick-slider').not('.slick-initialized').slick({
                centerMode: true,
                slidesToShow: 3,
                cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
                speed: 1000,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true,
                            variableWidth: true,
                            arrows: true
                        }
                    },
                    {
                        breakpoint: 1023,
                        settings: {
                            arrows: true,
                            centerMode: true,
                            centerPadding: '0px',
                            slidesToShow: 1,
                            variableWidth: true,
                            infinite: false,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: true,
                            centerMode: true,
                            centerPadding: '0px',
                            slidesToShow: 1,
                            variableWidth: true,
                            infinite: false,
                        },
                    },
                ]
            })
        })

    }, [])

    const loadOffers = async offers => {
        setOffers(offerSlick(offers))
    }

    if (!offers.length) {
        return null
    }

    return (
        <section data-aos="fade-up" className="container popular-card-container aos-init">
            <div className="popular-cards">
                <h2>Trending Offers</h2>
                <div className="popular-cards-slider slick-initialized slick-slider" id="trending-offers-sec"><button className="slick-prev slick-arrow" aria-label="Previous" type="button" >Previous</button>

                    <button className="slick-prev slick-arrow" aria-label="Previous" id="slick-prev" type="button">Previous</button>

                    <div className="slick-list draggable" style={{ padding: '0px 50px' }} >
                        <div className="slick-track" style={{ opacity: '1', width: '20000px', transform: 'translate3d(-210px, 0px, 0px)' }} >

                            {/* <button className="slick-next slick-arrow" id="slick-next" aria-label="Next" type="button">Next</button> */}

                            {offers.map(offer => {
                                return (
                                    <div key={offer.id} className={offer.classes} data-slick-index={offer['data-slick-index']} aria-hidden="false" tab-index={offer['data-slick-index']} >
                                        <div>
                                            <div className="popular-cards-slider-card" style={{ width: '100%', display: 'inline-block' }}>
                                                <div className="popular-cards-slider-card-top">
                                                    <div className="head">
                                                        <h3><b className="card_name">{offer.bank_name}</b><br />{offer.product_type}</h3>
                                                        <img src={`${strapi.baseUrl}${offer.image.url}`} />
                                                    </div>
                                                    <div className="content">
                                                        <ul>
                                                            {offer.fbp.fbp_text.map(fbp => <li key={fbp.id}>{fbp.text}</li>)}
                                                        </ul>
                                                    </div>
                                                    <div className="fee">
                                                        <h5><b>{offer.price}</b> Annual fee</h5>
                                                    </div>
                                                </div>
                                                <div className="popular-cards-slider-card-bottom">
                                                    <div>
                                                        <h5>{offer.usp_highlights}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div></div><button className="slick-next slick-arrow" id="slick-next" aria-label="Next" type="button" >Next</button></div>
            </div>
        </section>
    )
}

export default TrendingOffers