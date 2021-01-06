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
        longFormSections: [],
        submitButtonDisabled: false,
        errorMsgs: {
            mandatory: 'Required Field'
        },
        noOfMandatoryInputs: 0,
        verifiedInputs: []
    }

    componentDidMount() {
        const { primaryPath } = this.props.router.query
        const { bank_name: bankName } = this.props.bank
        const longFormSections = this.props.data.long_form_version_2.long_form[0].long_form_sections
        const formData = JSON.parse(localStorage.getItem('formData'))
        let sfData = null
        let noOfMandatoryInputs = 0

        this.setState({ primaryPath, bankName })

        if (formData && formData[primaryPath]) {
            sfData = formData[primaryPath]
        }

        longFormSections.forEach(longFormSection => {

            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(long_form_block => {
                const inputs = long_form_block.blocks
                inputs.forEach(item => {
                    item.error = false
                    item.verified = false

                    if (item.mandatory) {
                        noOfMandatoryInputs++
                    }

                    if (sfData) {

                        loop: for (let key in sfData) {
                            if (!sfData[key]) {
                                continue loop
                            }

                            if (key === item.end_point_name && key === 'city') {
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
                                // item.value = sfData[key].cityId
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
            })
        })

        this.setState({ longFormSections, noOfMandatoryInputs }, () => {
            this.handlePercentage()
        })
    }

    handleChange = field => {
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks

                const { newstate: { inputDropdown } } = await handleChangeInputs(inputs, field)
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
            })
        })
        this.setState({ longFormSections: newLongFormSections }, () => {
            if (textTypeInputs.includes(field.type) || field.type === 'radio') {
                this.checkInputValidity(field)
            }
        })
    }

    handleInputDropdownChange = (listType, list, input_id) => {
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks
                updateDropdownList(inputs, listType, list, input_id)

            })
        })
        this.updateState(newLongFormSections)
    }

    handleInputDropdownSelection = (name, type, item) => {
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks
                updateSelectionFromDropdown(inputs, name, item)
            })
        })
        this.updateState(newLongFormSections)
    }

    handleClickOnSlideBackground = () => {
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks
                resetDropdowns(inputs, this.state.errorMsgs)
            })
        })
        this.updateState(newLongFormSections)
    }

    checkInputValidity = field => {
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks
                updateInputsValidity(inputs, field, this.state.errorMsgs)
            })
        })
        this.updateState(newLongFormSections)
    }

    updateState = longFormSections => {
        return new Promise((resolve) => {
            this.setState({ longFormSections }, () => {
                console.log(longFormSections)
                this.handlePercentage()
                resolve(true)
            })
        })
    }

    handlePercentage = () => {
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks
                inputs.forEach(input => {
                    if (input.mandatory) {
                        
                        this.handleVerifiedInputsArray(input)
                    }
                })
            })
        })
    }

    handleVerifiedInputsArray = input => {
        const verifiedInputsArray = this.state.verifiedInputs
        if (input.verified) {
            // console.log(input)
            verifiedInputsArray.push(input.input_id)
        } else {
            if (verifiedInputsArray.includes(input.input_id)) {
                const index = verifiedInputsArray.indexOf(input.input_id)
                verifiedInputsArray.splice(index, 1)
            }
        }
        const uniqueVerifiedInputsArray = uniq(verifiedInputsArray)
        this.setState({ verifiedInputs: uniqueVerifiedInputsArray }, () => {
            const percentage = this.state.verifiedInputs.length / this.state.noOfMandatoryInputs * 100
            const event = new CustomEvent('percentageCalulated', { detail: { percentage } })
            document.dispatchEvent(event)
        })
    }

    onSubmitLongForm = () => {
        let errors = false
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks
                const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
                if (errorsPresent) {
                    errors = true
                }
            })
        })

        this.updateState(newLongFormSections)
            .then(() => {
                if (!errors) {
                    this.retrieveDataAndSubmit()
                }
            })
    }

    retrieveDataAndSubmit = () => {
        let data = {}
        const newLongFormSections = [...this.state.longFormSections]
        newLongFormSections.forEach(longFormSection => {
            const long_form_blocks = longFormSection.sections[0].long_form_blocks
            long_form_blocks.forEach(async long_form_block => {
                const inputs = long_form_block.blocks

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i]

                    if (input.type === 'checkbox') {

                        input.checkbox.checkbox_input.forEach(box => {
                            data[box.end_point_name] = box.value
                        })

                    } else if (input.type === 'input_with_dropdown' && input.mandatory) {

                        if (input.end_point_name === 'city') {
                            data[input.end_point_name] = input.selectedItem.cityId
                        } else {
                            data[input.end_point_name] = input.selectedItem[input.end_point_name]
                        }

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

            })
        })

        // console.log('data: ', data)

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
    }

    render() {
        let index = 0
        if (!this.state.longFormSections) {
            return null
        }

        return (
            <section className="long-form-wrapper" id="longForm">
                <div className="form-wrapper">
                    <form>
                        {this.state.longFormSections.map(longFormSection => {
                            const long_form_blocks = longFormSection.sections[0].long_form_blocks

                            return (
                                <React.Fragment key={longFormSection.id}>
                                    <h3>{longFormSection.section_display_name}</h3>

                                    {long_form_blocks.map(long_form_block => {
                                        const inputs = long_form_block.blocks
                                        ++index
                                        return (
                                            <div className="long-forms-wrapper" key={long_form_block.id}>
                                                <h5><b>{`${index}. `}</b> {long_form_block.block_name}</h5>
                                                <div className="shortforms-container">
                                                    {inputs.map(component => {
                                                        return (
                                                            <React.Fragment key={component.id}>
                                                                {generateInputs(component, this.handleChange,
                                                                    this.checkInputValidity, null, this.handleInputDropdownSelection)}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                        <div className="long-form-submit">
                            <button id="long-submit" type="button" onClick={this.onSubmitLongForm}>Submit Application</button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default withRouter(LongForm)