import { withRouter } from 'next/router'
import { uniq, debounce } from 'lodash'
import { generateInputs } from '../../utils/inputGenerator'
import { getDropdownList } from '../../services/formService'
import { generateLead } from '../../services/formService'
import {
    textTypeInputs,
    handleChangeInputs,
    updateInputsValidity,
    updateDropdownList,
    updateSelectionFromDropdown,
    resetDropdowns
} from '../../utils/formHandle'

class LongForm extends React.Component {

    state = {
        formInputs: [],
        submitButtonDisabled: false,
        errorMsgs: {
            mandatory: 'Required Field'
        },
        blocksIds: []
    }

    componentDidMount() {
        const { primaryPath } = this.props.router.query
        const { long_form_fields } = this.props.data.long_form
        const { bank_name: bankName } = this.props.bank

        this.setState({ primaryPath, bankName })
        let blocksIds = []
        const formData = JSON.parse(localStorage.getItem('formData'))
        let sfData = null

        if (formData && formData[primaryPath]) {
            sfData = formData[primaryPath]
        }

        // console.log(long_form_fields)
        // console.log(sfData)

        long_form_fields.forEach(item => {
            item.error = false
            item.verified = false
            if (item.type === 'input_with_dropdown') {
                item.list = []
            }
            blocksIds.push(item.block_id)

            if (sfData) {

                loop: for (let key in sfData) {
                    if (!sfData[key]) {
                        continue loop
                    }

                    if (key === item.end_point_name && key === 'city') {
                        item.value = sfData[key].cityName
                        item.selectedId = sfData[key].cityId
                        item.selectedItem = sfData[key]
                        item.verified = true
                        item.error = false
                        continue loop
                    }

                    if (key === item.end_point_name && key === 'pincode') {
                        item.value = sfData[key].pincode
                        item.selectedId = sfData[key].pincode
                        item.selectedItem = sfData[key]
                        item.verified = true
                        item.error = false
                        continue loop
                    }

                    if (typeof sfData[key] === 'object' && key === item.end_point_name) {
                        // item.value = sfData[key].pincode
                        // item.selectedItem = sfData[key]
                        // item.verified = true
                        // item.error = false
                        continue loop
                    }

                    if (typeof sfData[key] === 'string' && key === item.end_point_name) {
                        item.value = sfData[key]
                        item.verified = true
                        item.error = false
                    }
                }
            }

        })
        this.setState({ longFormInputs: long_form_fields, blocksIds: uniq(blocksIds) }, () => {
            // console.log(this.state)
        })
    }

    handleChange = async field => {
        const newFormInputs = [...this.state.longFormInputs]
        const { newstate: { letsGoButtonDisabled, inputDropdown } } = await handleChangeInputs(newFormInputs, field)
        if (inputDropdown) {
            const { listType, masterName, inp } = inputDropdown
            const debouncedSearch = debounce(() => getDropdownList(listType, inp.value, masterName)
                .then(list => {
                    inp.listType = listType
                    inp.list = list
                    this.handleInputDropdownChange(listType, list, inp.input_id)
                }), 500)
            debouncedSearch(listType, inp.value, masterName)
        }
        this.setState({ formInputs: newFormInputs }, () => {
            if (textTypeInputs.includes(field.type) || field.type === 'radio') {
                this.checkInputValidity(field)
            }
        })
    }

    handleInputDropdownChange = (listType, list, input_id) => {
        const newFormInputs = [...this.state.longFormInputs]
        updateDropdownList(newFormInputs, listType, list, input_id)
        this.setState({ formInputs: newFormInputs })
    }

    handleInputDropdownSelection = (name, type, item) => {
        const newFormInputs = [...this.state.longFormInputs]
        updateSelectionFromDropdown(newFormInputs, name, item)
        this.setState({ formInputs: newFormInputs })
    }

    handleClickOnSlideBackground = () => {
        const newFormInputs = [...this.state.longFormInputs]
        resetDropdowns(newFormInputs, this.state.errorMsgs)
        this.setState({ formInputs: newFormInputs })
    }

    checkInputValidity = field => {
        const newFormInputs = [...this.state.longFormInputs]
        updateInputsValidity(newFormInputs, field, this.state.errorMsgs)
        this.setState({ formInputs: newFormInputs })
    }

    onSubmitLongForm = () => {
        const newFormInputs = [...this.state.longFormInputs]
        const errorsPresent = updateInputsValidity(newFormInputs, null, this.state.errorMsgs)
        this.setState({ formInputs: newFormInputs }, () => {
            // if (!errorsPresent) {
            // console.log(this.state.longFormInputs)
            let data = {}
            const longFormInputs = JSON.parse(JSON.stringify(this.state.longFormInputs))

            for (let i = 0; i < longFormInputs.length; i++) {
                const input = longFormInputs[i]
                if (input.type === 'section_headiing') {
                    continue
                }

                if (input.type === 'upload_button') {
                    continue
                }

                if (input.type === 'checkbox') {
                    input.checkbox.checkbox_input.forEach(box => {
                        data[box.end_point_name] = box.value
                    })
                } else {
                    data[input.end_point_name] = input.value
                }

            }

            let { firstName, lastName } = data
            if (!lastName) {
                lastName = ''
            }
            const fullName = firstName + ' ' + lastName
            data.fullName = fullName


            for (let key in data) {
                if (data[key] === undefined) {
                    data[key] = ''
                }
            }


            console.log(data)
            const { primaryPath, bankName } = this.state

            generateLead(data, primaryPath)
                .then((res) => {
                    console.log('long form submitted: ', res)
                    const pathname = `/${primaryPath}/thank-you`
                    const query = { bankName }
                    this.props.router.push({ pathname, query }, pathname, { shallow: true })
                })
                .catch(err => {
                    console.log('long form submission error: ', err)
                })

        })
    }

    shouldApplyShortFormClass = component => {
        if (component.type !== 'radio') {
            return 'shortforms-container'
        }
    }

    getPositionNumber = blockId => {
        const { blocksIds } = this.state
        if (blocksIds.includes(blockId)) {
            return blocksIds.indexOf(blockId)
        }
        return null
    }

    render() {
        return (
            <section className="long-form-wrapper">
                <div className="form-wrapper">
                    {this.state.longFormInputs ? <form onClick={this.handleClickOnSlideBackground}>
                        {this.state.longFormInputs.map((component, i) => {
                            return (
                                <div className="long-forms-wrapper" key={component.id}>
                                    {component.block_name ? <h5><b>{this.getPositionNumber(component.block_id)}. </b>{`${component.block_name}`}</h5> : null}
                                    <div className={this.shouldApplyShortFormClass(component)}>
                                        {generateInputs(component, this.handleChange,
                                            this.checkInputValidity, null, this.handleInputDropdownSelection)}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="long-form-submit">
                            <button id="long-submit" type="button" onClick={this.onSubmitLongForm}>Submit Application</button>
                        </div>
                    </form> : null}
                </div>
            </section>
        )
    }
}

export default withRouter(LongForm)