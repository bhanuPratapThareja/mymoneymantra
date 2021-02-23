import { useEffect, useState } from 'react'
import $ from 'jquery'
import SvgImage from '../ImageComponent/SvgComponents'
import ListingFilter from '../Listings/ListingsFilter'

const ListingBanner = props => {
    const { listing_banner_heading, categories } = props.data.listing_banner
    const [selectedOption, setSelectedOption] = useState('all')
    const [filtersReady, setFiltersReady] = useState(false)

    useEffect(() => {
        onBannerCategoryChange(selectedOption)
    }, [selectedOption])

    const onOpenFilter = () => {
        const el = document.getElementsByClassName('filter-option')[0]
        $("#" + el.id + "-show").slideToggle("300");
        $('body', "html").css("overflow", "hidden")
    }

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

    const getCalulatedProductType = () => {
        const productTypeName = props.numberOfCards == 1 ? props.productType.product_type_name.slice(0, -1) : props.productType.product_type_name
        return productTypeName.toLowerCase()
    }

    return (
        <section className="container banner">
            <div className="mobile-background"></div>
            <div className="banner-wrapper cstm-bnr-txt">
                <div className="top">
                    <div dangerouslySetInnerHTML={{ __html: listing_banner_heading }}></div>
                    {categories && categories.filter_category && categories.filter_category.length ? <div className="category">
                        <h5>Browse by category:</h5>
                        <div className="category-wrapper">
                            <div className="checkbox-container" name="category" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                                {categories.filter_category.map(category => {
                                    const { label, image } = category
                                    return (
                                        <React.Fragment key={category.id}>
                                            <input readOnly className="lets-checkbox" checked={selectedOption === label.toLowerCase()} value={label.toLowerCase()} type="radio" id={label.toLowerCase()} name="category" required />
                                            <label htmlFor={label.toLowerCase()} className="banner_label">
                                                <SvgImage image={image} />
                                                <h4 className="listing-banner_category-label">{label}</h4>
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
                        <h3><span id="count">{props.numberOfCards}</span> {getCalulatedProductType()}</h3>
                    </div>
                    {filtersReady ? <div className="filter">
                        <button
                            className="filter-option"
                            id="listing-filter"
                            onClick={onOpenFilter}>
                            Filters
                                <img src="/assets/images/icons/down-chevron.svg" />
                        </button>
                    </div> : null}
                </div>
            </div>
            <ListingFilter
                setFiltersReady={setFiltersReady}
                allOfferCards={props.allOfferCards}
                filters={props.filters}
                filterCardsFilterComponent={props.filterCardsFilterComponent}
            />
            <hr className="divider" />
        </section>
    )
}

export default ListingBanner