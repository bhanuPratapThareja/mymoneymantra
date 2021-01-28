import DownChevron from '../../public/assets/images/icons/down-chevron.svg'

class BlogFilterOptions extends React.Component {
    state = {
        filters: {
            categories: [],
            subCategories: []
        },
        checkboxes: [],
        showCheckboxes: 4,
    }


    componentDidMount() {
        const { filters } = this.props
        const { checkboxes } = filters[0]
        const updatedCheckboxes = this.props.filters[0].checkboxes

        if (updatedCheckboxes.length) {
            updatedCheckboxes.forEach((block, i) => {
                let blockValues = [...block.values]

                updatedCheckboxes[i].values = blockValues

                block.showCheckboxes = this.state.showCheckboxes
                block.totalCheckboxes = block.values.length
                block.veiwAll = block.values.length > this.state.showCheckboxes
            })

            this.setState({ checkboxes: updatedCheckboxes })
        }
        console.log("all filters", filters)

    }
    closeFilter = () => {
        $(".filter-cross").closest(".mm-modal").slideToggle(300);
        $('body', "html").css("overflow", "scroll")
    }
    applyFilters = () => {
        this.props.applyFilter(this.state.filters)
        this.closeFilter()
    }
    handleDateChange = (e) => {
        console.log(e.target.value)
        const filters = { ...this.state.filters, date: e.target.value }
        this.setState({ ...this.state, filters })
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
        let { checkboxes, showCheckboxes } = this.state
        return (
            <section className="listing-modal mm-modal" id="listing-filter-show">
                <div className="overlay"></div>
                <div className="mm-modal-wrapper">
                    <div className="head">
                        <h3>Filters</h3>
                        <img src="/assets/images/icons/cross.svg" className="filter-cross" onClick={this.closeFilter} />
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
                                                                    <input type="checkbox" id={checkbox.tag} name={checkbox.checkbox_name} onChange={e => this.handleCheckbox(e, checkboxGroup.type)} />
                                                                    <label htmlFor={checkbox.tag}>
                                                                        <span>{checkbox.checkbox_name}</span>
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

                            <div className="content-one">
                                <h5>By Published Date</h5>
                                <input onChange={this.handleDateChange} type="date" />
                            </div>
                            <div className="apply-filter">
                                <button type="button" onClick={this.applyFilters}>Apply Filters</button>
                            </div>

                        </form>

                    </div>
                </div>
            </section>
        );
    }

}

export default BlogFilterOptions;