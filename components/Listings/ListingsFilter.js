import { closeFilter } from '../../Utils/loanListingFilterHandler'

class ListingFilter extends React.Component {

    state = {
        showCheckboxes: 4,
        filters: {}
    }

    componentDidMount() {
        const { checkboxes, filter_radio_name,
            filter_fee_annual, filter_emi,
            filter_tenure, filter_roi, filter_max_loan_amount } = this.props.filters

        if (this.props.filters.checkboxes.length) {
            this.props.filters.checkboxes.forEach(boxes => {
                boxes.showCheckboxes = this.state.showCheckboxes
                boxes.totalCheckboxes = boxes.values.length
                boxes.veiwAll = boxes.values.length > this.state.showCheckboxes
            })
            this.setState({ checkboxes: this.props.filters.checkboxes })
        }
        // if (filter_radio_name.length) {
        //     this.setState({ filter_radio_name })
        // }
        // this.setState({ filter_fee_annual, filter_emi, filter_tenure, filter_roi, filter_max_loan_amount })
        // setTimeout(() => {
        //     console.log(this.state)
        // }, 500);
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
        const el = document.getElementsByClassName('noUi-tooltip')
        if (el.length  && this.state.filter_fee_annual) {
            let min = el[0].innerHTML
            let max = el[1].innerHTML
            min = min.split('')
            min = min.filter(val => Number(val) || val == 0)
            min = min.join('')
            max = max.split('')
            max = max.filter(val => Number(val) || val == 0)
            max = max.join('')

            const annualFees = [min, max]
            const filters = { ...this.state.filters, annualFees }
            this.setState({ ...this.state, filters }, () => {
                this.onCloseFilter()
            })
            return
        }

        this.onCloseFilter()
        // console.log(this.state.filters)
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
        this.setState({ checkboxes: updatedCheckboxes }, () => {
            console.log(this.state.checkboxes)
        })
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
                            {this.state.checkboxes && this.state.checkboxes.length ? <>
                                {this.state.checkboxes.map(checkboxes => {
                                    return (
                                        <div className="content-one" key={checkboxes.id}>
                                            <h5>{checkboxes.name}</h5>
                                            <div className="fields-wrapper">
                                                {checkboxes.values.map((checkbox, i) => {
                                                    if (i + 1 <= checkboxes.showCheckboxes) {
                                                        return (
                                                            <div className="checkbox-container" key={checkbox.id}>
                                                                <div className="checkbox">
                                                                    <input type="checkbox" id={`f-checkbox-${i}`} name={checkbox.tag} onChange={e => this.handleCheckbox(e, checkboxes.type)} />
                                                                    <label htmlFor={`f-checkbox-${i}`}><span>{checkbox.checkbox_name}</span></label>
                                                                </div>
                                                            </div>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}

                                                {checkboxes.veiwAll ? <div className="view-all">
                                                    <button onClick={() => this.onClickViewAll(checkboxes.type)}>{'View All'}
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                                                                fill="white" />
                                                        </svg>
                                                    </button>
                                                </div> : null}
                                            </div>
                                        </div>
                                    )
                                })}
                            </> : null}

                            {filter_fee_annual ? <div className="content-one">
                                <h5>{filter_fee_annual.heading}</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="slider-range"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <input type="hidden" name="min-value" value="" readOnly />
                                                    <input type="hidden" name="max-value" value="" readOnly />
                                                </div>
                                            </div>
                                            <span className="min-max left">₹{filter_fee_annual.min_annual_fee}</span>
                                            <span className="min-max right">₹{filter_fee_annual.max_annual_fee}+</span>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_emi ? <div className="content-one">
                                <h5>{filter_emi.heading}</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="slider-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" readOnly />
                                                <input type="hidden" name="max-value" value="" readOnly />
                                            </div>
                                        </div>
                                        <span className="min-max left">₹500</span>
                                        <span className="min-max right">₹5,000+</span>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_tenure ? <div className="content-one">
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
                                        <span className="min-max left">1 yr</span>
                                        <span className="min-max right">10 yr+</span>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_roi ? <div className="content-one">
                                <h5>Return On Investment</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="return-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </div>
                                        </div>
                                        <span className="min-max left">₹500</span>
                                        <span className="min-max right">₹5,000+</span>
                                    </div>
                                </div>
                            </div> : null}

                            {filter_max_loan_amount ? <div className="content-one">
                                <h5>Maximum Loan Amount</h5>
                                <div className="range__slider">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div id="loan-range"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </div>
                                        </div>
                                        <span className="min-max left">1 yr</span>
                                        <span className="min-max right">10 yr+</span>
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