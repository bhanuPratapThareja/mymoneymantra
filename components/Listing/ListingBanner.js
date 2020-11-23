import { useEffect, useState } from 'react'
import ListingFilter from './ListingFilter'
import Strapi from '../../providers/strapi'
import $ from 'jquery'

if (typeof window != 'undefined') {
    $(document).ready(function () {
        $(".filter-option").click(function () {
            $("#" + this.id + "-show").slideToggle("300");
            $('body', "html").css("overflow", "hidden")
        })

        $(".filter-cross").click(function () {
            $(".filter-cross").closest(".mm-modal").slideToggle(300);
            $('body', "html").css("overflow", "scroll")
        })
    })
}

const ListingBanner = ({ data }) => {
    const { heading_for_product, number_of_offers, listing_cateogry } = data
    const [selectedOption, setSelectedOption] = useState('all')
    const strapi = new Strapi()

    useEffect(() => {
        onBannerCategoryChange(selectedOption)
    })

    const onBannerCategoryChange = category => {
        const els = document.getElementsByClassName('banner_label')
        for (let i = 0; i < els.length; i++) {
            if (els[i].getAttribute('for') === category) {
                els[i].classList.add('listing-banner_selected')
            } else {
                els[i].classList.remove('listing-banner_selected')
            }
        }

    }

    return (
        <>
            <section className="container banner">
                <div className="mobile-background"></div>
                <div className="banner-wrapper">
                    <div className="top">
                        <div>
                            <h1>Here are the best <span>{heading_for_product}</span> offers recommended for you.</h1>
                            <h1 className="desk-hide">Here’s what we recommend for you.</h1>
                        </div>
                        <div className="category">
                            <h5>Browse by category:</h5>
                            <div className="category-wrapper">
                                <div className="checkbox-container" name="category" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                                    {listing_cateogry.map(category => {
                                        return (
                                            <React.Fragment key={category.id}>
                                                <input className="lets-checkbox" value={category.label.toLowerCase()} type="radio" id={category.label.toLowerCase()} name="category" required />
                                                <label htmlFor={category.label.toLowerCase()} className="banner_label">
                                                    <img src={`${strapi.baseUrl}${category.images.url}`} alt={category.images.name} width="40" height="40" />
                                                    <h4 className="listing-banner_category-label">{category.label}</h4>
                                                </label>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="cards">
                            <h3><span id="count">{number_of_offers}</span> {heading_for_product.toLowerCase(0)}</h3>
                        </div>
                        <div className="filter">
                            <button
                                className="filter-option"
                                id="listing-filter">
                                Filters
                                <img src="../../images/icons/down-chevron.svg" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <ListingFilter />
        </>
    )
}

export default ListingBanner