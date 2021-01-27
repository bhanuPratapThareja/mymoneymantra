

class BlogFilterOptions extends React.Component {
    state = {
        filters: {
            categories: [],
            subCategories: []
        },
        checkboxes: []
    }


    componentDidMount() {

        const { filters } = this.props
        const { checkboxes } = filters[0]
        this.setState({ checkboxes })
    }
    closeFilter = () => {
        $(".filter-cross").closest(".mm-modal").slideToggle(300);
        $('body', "html").css("overflow", "scroll")
    }
    applyFilters = () => {
        this.props.applyFilter(this.state.filters)
        this.closeFilter()
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
    render() {
        let { checkboxes } = this.state
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

                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </> : null}


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