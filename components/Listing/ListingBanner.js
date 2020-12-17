import { useEffect, useState } from 'react'
import ListingFilter from './ListingFilter'
import Strapi from '../../providers/strapi'
import $ from 'jquery'
import Router from 'next/router';

if (typeof window != 'undefined') {
    $(document).ready(function () {
        $(".filter-option").click(function () {
            $("#" + this.id + "-show").slideToggle("300");
            $('body', "html").css("overflow", "hidden")
        })
    })
}

const ListingBanner = props => {
    const { heading, category, number_of_offers, product } = props.data
    const [selectedOption, setSelectedOption] = useState('all')
    const strapi = new Strapi()

    useEffect(() => {
        onBannerCategoryChange(selectedOption)
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
                        <div dangerouslySetInnerHTML={{ __html: heading }}></div>
                        <div className="category">
                            <h5>Browse by category:</h5>
                            <div className="category-wrapper">
                                <div className="checkbox-container" name="category" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                                    {category.map(category => {
                                        return (
                                            <React.Fragment key={category.id}>
                                                <input className="lets-checkbox" value={category.label.toLowerCase()} type="radio" id={category.label.toLowerCase()} name="category" required />
                                                <label htmlFor={category.label.toLowerCase()} className="banner_label">
                                                    <img src={`${strapi.baseUrl}${category.image.url}`} alt={category.image.name} width="40" height="40" />
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
                            <h3><span id="count">{props.numberOfCards}</span> {product.toLowerCase()}</h3>
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