import { useEffect, useState } from 'react'
import ListingFilter from './ListingsFilter'
import Strapi from '../../providers/strapi'
import $ from 'jquery'

if (typeof window != 'undefined') {
    $(document).ready(function () {
        $(".filter-option").click(function () {
            $("#" + this.id + "-show").slideToggle("300");
            $('body', "html").css("overflow", "hidden")
        })
    })
}

const ListingBanner = props => {
    const strapi = new Strapi()
    const { listing_banner_heading, category_component, listing_banner_products } = props.data.listing_banner
    const [selectedOption, setSelectedOption] = useState('all')

    useEffect(() => {
        onBannerCategoryChange(selectedOption)
        console.log('props: ', props)
    }, [selectedOption])

    const onBannerCategoryChange = category => {
        const els = document.getElementsByClassName('banner_label')
        for (let i = 0; i < els.length; i++) {
            if (els[i].getAttribute('for') === category) {
                els[i].classList.add('listing-banner_selected')
            } else {
                els[i].classList.remove('listing-banner_selected')
            }
        }
        props.filterOfferCards(category)
    }

    return (
        <>
            <section className="container banner">
                <div className="mobile-background"></div>
                <div className="banner-wrapper cstm-bnr-txt">
                    <div className="top">
                        <div dangerouslySetInnerHTML={{ __html: listing_banner_heading }}></div>
                        {category_component && category_component.length ? <div className="category">
                            <h5>Browse by category:</h5>
                            <div className="category-wrapper">
                               <div className="checkbox-container" name="category" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                                    {category_component.map(category => {
                                        const {listing_banner_category_label, listing_banner_category_image} = category
                                        return (
                                            <React.Fragment key={category.id}>
                                                <input readOnly className="lets-checkbox" checked={selectedOption === listing_banner_category_label.toLowerCase()} value={listing_banner_category_label.toLowerCase()} type="radio" id={listing_banner_category_label.toLowerCase()} name="category" required />
                                                <label htmlFor={listing_banner_category_label.toLowerCase()} className="banner_label">
                                                    <img src={`${strapi.baseUrl}${listing_banner_category_image.url}`} alt={listing_banner_category_image.name} width="40" height="40" />
                                                    <h4 className="listing-banner_category-label">{listing_banner_category_label}</h4>
                                                </label>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </div> : null}
                    </div>
                    <div className="bottom">
                        <div className="cards">
                            <h3><span id="count">{props.numberOfCards}</span> {listing_banner_products.toLowerCase()}</h3>
                        </div>
                        {props.filters ? <div className="filter">
                            <button
                                className="filter-option"
                                id="listing-filter">
                                Filters
                                <img src="/assets/images/icons/down-chevron.svg" />
                            </button>
                        </div> : null}
                    </div>
                </div>
            </section>
            {props.filters ? <ListingFilter
                filters={props.filters}
                filterCardsFilterComponent={props.filterCardsFilterComponent}
            /> : null}
            <hr className="divider" />
        </>
    )
}

export default ListingBanner