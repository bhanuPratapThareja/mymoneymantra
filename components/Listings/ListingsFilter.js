import { closeFilter } from '../../utils/loanListingFilterHandler'
import { initializeMoneyRange, initializeYearRange, getSliderFilterValues } from '../../utils/noUiSliderHandler'
import DownChevron from '../../public/assets/images/icons/down-chevron.svg'

class ListingFilter extends React.Component {

    state = {
        showCheckboxes: 4,
        filters: {}
    }

    componentDidMount() {
        const { filter_radio_name,
            filter_fee_annual, filter_emi,
            filter_tenure, filter_roi, filter_max_loan_amount } = this.props.filters

        const updatedCheckboxes = [...this.props.filters.checkboxes]
        
        if (updatedCheckboxes.length) {
            updatedCheckboxes.forEach((block, i) => {
                let blockValues = [...block.values]
                if (block.type === 'banks') {
                    let values = []
                    let tempBanksTags = []

                    blockValues.forEach(value => {
                        this.props.banksList.forEach(tag => {
                            if (value.tag === tag) {
                                if (!tempBanksTags.includes(tag)) {
                                    tempBanksTags.push(tag)
                                    values.push(value)
                                }
                            }
                        })
                    })

                    updatedCheckboxes[i].values = values

                } else {
                    updatedCheckboxes[i].values = blockValues
                }

                block.showCheckboxes = this.state.showCheckboxes
                block.totalCheckboxes = block.values.length
                block.veiwAll = block.values.length > this.state.showCheckboxes
            })

            this.setState({ checkboxes: updatedCheckboxes })
        }

        if (filter_radio_name.length) {
            this.setState({ filter_radio_name })
        }

        this.setState({ filter_fee_annual, filter_emi, filter_tenure, filter_roi, filter_max_loan_amount }, () => {
            initializeMoneyRange(filter_fee_annual, 'annual-fees-range')
            initializeMoneyRange(filter_emi, 'emi-range')
            initializeMoneyRange(filter_roi, 'roi-range')
            initializeMoneyRange(filter_max_loan_amount, 'max-loan-amount-range')
            initializeYearRange(filter_tenure, 'tenure-range')
        })

    }

    handleCheckbox = (e, type) => {
        const { name, checked } = e.target
        // console.log(e, type)
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
        const { filter_fee_annual, filter_emi, filter_roi, filter_max_loan_amount, filter_tenure } = this.state
        const annualFees = getSliderFilterValues(filter_fee_annual, 'annual-fees-range')
        const emi = getSliderFilterValues(filter_emi, 'emi-range')
        const roi = getSliderFilterValues(filter_roi, 'roi-range')
        const maxLoanAmount = getSliderFilterValues(filter_max_loan_amount, 'max-loan-amount-range')
        const tenure = getSliderFilterValues(filter_tenure, 'tenure-range')

        const filters = { ...this.state.filters, annualFees, emi, roi, maxLoanAmount, tenure }
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
        const { checkboxes, filter_fee_annual, filter_radio_name,
            filter_emi, filter_tenure, filter_roi, filter_max_loan_amount } = this.state
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
                                {checkboxes.map(checkboxGroup => {
                                    return (
                                        <div className="content-one" key={checkboxGroup.id}>
                                            <h5>{checkboxGroup.name}</h5>
                                            <div className="fields-wrapper">
                                                {checkboxGroup.values.map((checkbox, i) => {
                                                    if (i + 1 <= checkboxGroup.showCheckboxes) {
                                                        return (
                                                            <div className="checkbox-container" key={checkbox.id}>
                                                                <div className="checkbox">
                                                                    <input type="checkbox" id={checkbox.tag} name={checkbox.tag} onChange={e => this.handleCheckbox(e, checkboxGroup.type)} />
                                                                    <label htmlFor={checkbox.tag}><span>{checkbox.checkbox_name}</span></label>
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

                            {filter_fee_annual && filter_fee_annual.enable ? <div className="content-one">
                                <h5>{filter_fee_annual.heading}</h5>
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
                                            <span className="min-max left">₹{filter_fee_annual.min}</span>
                                            <span className="min-max right">₹{filter_fee_annual.max}+</span>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_emi && filter_emi.enable ? <div className="content-one">
                                <h5>{filter_emi.heading}</h5>
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
                                        <span className="min-max left">₹{filter_emi.min}</span>
                                        <span className="min-max right">₹{filter_emi.max}+</span>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_tenure && filter_tenure.enable ? <div className="content-one">
                                <h5>{filter_tenure.heading}</h5>
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
                                        <span className="min-max left">{filter_tenure.min} years</span>
                                        <span className="min-max right">{filter_tenure.max} years +</span>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_roi && filter_roi.enable ? <div className="content-one">
                                <h5>Rate Of Interest</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="roi-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </div>
                                        </div>
                                        <span className="min-max left">{filter_roi.min}%</span>
                                        <span className="min-max right">{filter_roi.max}% +</span>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_max_loan_amount && filter_max_loan_amount.enable ? <div className="content-one">
                                <h5>Maximum Loan Amount</h5>
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
                                        <span className="min-max left">{filter_max_loan_amount.min}</span>
                                        <span className="min-max right">{filter_max_loan_amount.max}</span>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_radio_name ? <>
                                {filter_radio_name.map(radio => {
                                    return (
                                        <div className="content-one" key={radio.id}>
                                            <h5>{radio.name}</h5>
                                            <div className="shortforms-container">
                                                {radio.filter_radio_options.map(radio_button => {
                                                    const labelStyles = this.state.filters[radio.type] ? this.state.filters[radio.type][0] === radio_button.tag ? { border: '1px solid green' } : null : null
                                                    return (
                                                        <React.Fragment key={radio_button.id}>
                                                            <label htmlFor={radio_button.tag} style={labelStyles} onClick={() => this.handleRadio(radio_button.tag, radio.type)}>{radio_button.name}</label>
                                                            <input
                                                                className="lets-checkbox"
                                                                type="radio"
                                                                name={radio.name}
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