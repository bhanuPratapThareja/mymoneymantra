import DownChevron from '../../public/assets/images/icons/down-chevron.svg'
import { closeFilter } from '../../utils/listingsFilterHandler'
import { initializeMoneyRange, initializePercentRange, initializeYearRange, getSliderFilterValues } from '../../utils/noUiSliderHandler';
import { 
    generateBanksCheckboxes, 
    generateCategoriesCheckboxes,
    generatePromotionCheckboxes,
    generateAnnualFeesBlock,
    generateEmiBlock,
    generateLoanAmountBlock,
    generateRoiBlock,
    generateTenureBlock,
    generateInterestRateBlock
} from '../../utils/listingsFilterGenerator'

class ListingFilter extends React.Component {

    state = {
        gotOfferCards: false,
        filters: {},
        showCheckboxes: 4,
        checkboxes: [],
        radios:[]
    }

    componentDidMount() {
        // this.updateBanksBlock()
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.allOfferCards.length) {
            return false
        }
        return true
    }

    componentDidUpdate() {
        this.updateBanksBlock()
    }

    updateBanksBlock = () => {
        if (!this.state.gotOfferCards) {
            const bankBlock = generateBanksCheckboxes(this.props.allOfferCards, this.state.showCheckboxes)
            if(bankBlock) {
                this.setState({ checkboxes: [...this.state.checkboxes, bankBlock], gotOfferCards: true }, () => {
                    this.updateCategoriesBlock()
                })
            } else {
                this.updateCategoriesBlock()
            }
        }
    }

    updateCategoriesBlock = () => {
        const categoryBlock = generateCategoriesCheckboxes(this.props.allOfferCards, this.state.showCheckboxes)
        if(categoryBlock) {
            this.setState({ checkboxes: [...this.state.checkboxes, categoryBlock] }, () => {
                this.updatePromotionsBlock()
            })
        } else {
            this.updatePromotionsBlock()
        }
    }

    updatePromotionsBlock = () => {
        const promotionBlock = generatePromotionCheckboxes(this.props.allOfferCards, this.state.showCheckboxes)
        if(promotionBlock) {
            this.setState({ checkboxes: [...this.state.checkboxes, promotionBlock] }, () => {
                this.updateAnnualFeesBlock()
            })
        } else {
            this.updateAnnualFeesBlock()
        }
    }
    
    updateAnnualFeesBlock = () => {
        const annualFeesSlider = generateAnnualFeesBlock(this.props.allOfferCards)
        if(annualFeesSlider) {
            this.setState({ annualFeesSlider }, () => {
                initializeMoneyRange(annualFeesSlider, 'annual-fees-range')
                this.updateEmiBlock()
            })
        } else {
            this.updateEmiBlock()
        }
    }

    updateEmiBlock = () => {
        const emiSlider = generateEmiBlock(this.props.allOfferCards)
        if(emiSlider) {
            this.setState({ emiSlider }, () => {
                initializeMoneyRange(emiSlider, 'emi-range')
                this.updateLoanAmountBlock()
            })
        } else {
            this.updateLoanAmountBlock()
        }
    }

    updateLoanAmountBlock = () => {
        const loanAmountSlider = generateLoanAmountBlock(this.props.allOfferCards)
        if(loanAmountSlider) {
            this.setState({ loanAmountSlider }, () => {
                initializeMoneyRange(loanAmountSlider, 'max-loan-amount-range')
                this.updateInterestRatesBlock()
            })
        } else {
            this.updateInterestRatesBlock()
        }
    }

    updateInterestRatesBlock = () => {
        const interestRatesSlider = generateInterestRateBlock(this.props.allOfferCards)
        if(interestRatesSlider) {
            this.setState({ interestRatesSlider }, () => {
                initializePercentRange(interestRatesSlider, 'interest-rate-range')
                this.updateTenureBlock()
            })
        } else {
            this.updateTenureBlock()
        }
    }

    updateTenureBlock = () => {
        const tenureSlider = generateTenureBlock(this.props.allOfferCards)
        if(tenureSlider) {
            this.setState({ tenureSlider }, () => {
                initializeYearRange(tenureSlider, 'tenure-range')
                this.readyFilters()
            })
        } else {
            this.readyFilters()
        }
    }

    readyFilters = () => {
        setTimeout(() => {
            this.props.setFiltersReady(true)
        }, 1000)
    }

    handleCheckbox = (e, type) => {
        const { name, checked } = e.target
        const selectedCheckboxes = this.state.filters[type] ? this.state.filters[type] : []
        if (checked) {
            selectedCheckboxes.push(name)
        } else {
            const index = selectedCheckboxes.indexOf(name)
            selectedCheckboxes.splice(index, 1)
        }
        const filters = { ...this.state.filters, [type]: selectedCheckboxes }
        this.setState({ ...this.state, filters })
    }

    handleRadio = (value, type) => {
        const filters = { ...this.state.filters, [type]: [value] }
        this.setState({ ...this.state, filters })
    }

    onApplyFilter = () => {
        const { annualFeesSlider, emiSlider, loanAmountSlider, interestRatesSlider, tenureSlider } = this.state
        const annualFees = getSliderFilterValues(annualFeesSlider, 'annual-fees-range')
        const emi = getSliderFilterValues(emiSlider, 'emi-range')
        const interestRate = getSliderFilterValues(interestRatesSlider, 'interest-rate-range')
        const maxLoanAmount = getSliderFilterValues(loanAmountSlider, 'max-loan-amount-range')
        const tenure = getSliderFilterValues(tenureSlider, 'tenure-range')

        const filters = { ...this.state.filters, annualFees, emi, interestRate, maxLoanAmount, tenure }
        this.setState({ ...this.state, filters }, () => {
            this.onCloseFilter()
        })
    }

    onCloseFilter = () => {
        closeFilter({ ...this.state.filters }, this.props.filterCardsFilterComponent)
    }

    onClickViewAll = type => {
        const updatedCheckboxes = [...this.state.checkboxes]
        updatedCheckboxes.forEach(checkboxes => {
            if (checkboxes.type === type) {
                checkboxes.veiwAll = false
                checkboxes.showCheckboxes = checkboxes.values.length
            }
        })
        this.setState({ checkboxes: updatedCheckboxes })
    }

    render() {
        const { checkboxes, radios, annualFeesSlider, emiSlider,
            loanAmountSlider, interestRatesSlider, tenureSlider } = this.state
        return (
            <section className="listing-modal mm-modal" id="listing-filter-show">
                <div className="overlay"></div>
                <div className="mm-modal-wrapper">
                    <div className="head">
                        <h3>Filters</h3>
                        <img src="/assets/images/icons/cross.svg" className="filter-cross" onClick={closeFilter} />
                    </div>
                    <div className="content">

                        <form>
                            {checkboxes && checkboxes.length ? <>
                                {checkboxes.map((checkboxGroup, i) => {
                                    return (
                                        <div className="content-one" key={i}>
                                            <h5>{checkboxGroup.heading}</h5>
                                            <div className="fields-wrapper">
                                                {checkboxGroup.values.map((checkbox, i) => {
                                                    if (i + 1 <= checkboxGroup.showCheckboxes) {
                                                        return (
                                                            <div className="checkbox-container" key={i + 1}>
                                                                <div className="checkbox">
                                                                    <input type="checkbox" id={checkbox.tag} name={checkbox.tag} onChange={e => this.handleCheckbox(e, checkboxGroup.type)} />
                                                                    <label htmlFor={checkbox.tag}>
                                                                        <span>{checkbox.name}</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}

                                                {checkboxGroup.veiwAll ? <div className="view-all">
                                                    <button onClick={() => this.onClickViewAll(checkboxGroup.type)}>{'View All'}
                                                        <DownChevron />
                                                    </button>
                                                </div> : null}
                                            </div>
                                        </div>
                                    )
                                })}
                            </> : null}

                            {annualFeesSlider ? <div className="content-one">
                                <h5>{annualFeesSlider.heading}</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="annual-fees-range"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <input type="hidden" name="min-value" value="" readOnly />
                                                    <input type="hidden" name="max-value" value="" readOnly />
                                                </div>
                                            </div>
                                            <span className="min-max left">₹{annualFeesSlider.min}</span>
                                            <span className="min-max right">₹{annualFeesSlider.max}</span>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}

                            {emiSlider ? <div className="content-one">
                                <h5>{emiSlider.heading}</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="emi-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" readOnly />
                                                <input type="hidden" name="max-value" value="" readOnly />
                                            </div>
                                        </div>
                                        <span className="min-max left">₹{emiSlider.min}</span>
                                        <span className="min-max right">₹{emiSlider.max}</span>
                                    </div>
                                </div>
                            </div> : null}

                            {tenureSlider? <div className="content-one">
                                <h5>{tenureSlider.heading}</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="tenure-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </div>
                                        </div>
                                        <span className="min-max left">{tenureSlider.min} years</span>
                                        <span className="min-max right">{tenureSlider.max} years</span>
                                    </div>
                                </div>
                            </div> : null}

                            {interestRatesSlider ? <div className="content-one">
                                <h5>{interestRatesSlider.heading}</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="interest-rate-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </div>
                                        </div>
                                        <span className="min-max left">{interestRatesSlider.min}%</span>
                                        <span className="min-max right">{interestRatesSlider.max}%</span>
                                    </div>
                                </div>
                            </div> : null}

                            {loanAmountSlider ? <div className="content-one">
                                <h5>{loanAmountSlider.heading}</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="max-loan-amount-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </div>
                                        </div>
                                        <span className="min-max left">₹{loanAmountSlider.min}</span>
                                        <span className="min-max right">₹{loanAmountSlider.max}</span>
                                    </div>
                                </div>
                            </div> : null}

                            {radios && radios.length ? <>
                                {radios.map((radio, i) => {
                                    return (
                                        <div className="content-one" key={i}>
                                            <h5>{radio.heading}</h5>
                                            <div className="shortforms-container">
                                                {radio.values.map((radio_button, i) => {
                                                    const labelStyles = this.state.filters[radio.type] ? this.state.filters[radio.type][0] === radio_button.tag ? { border: '1px solid green' } : null : null
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <label htmlFor={radio_button.tag} style={labelStyles} onClick={() => this.handleRadio(radio_button.tag, radio.type)}>{radio_button.name}</label>
                                                            <input
                                                                className="lets-checkbox"
                                                                type="radio"
                                                                name={radio_button.name}
                                                                value={radio_button.tag}
                                                            />
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </> : null}

                            <div className="apply-filter">
                                <button type="button" onClick={this.onApplyFilter}>Apply Filters</button>
                            </div>

                        </form>

                    </div>
                </div>
            </section>
        )
    }

}

export default ListingFilter