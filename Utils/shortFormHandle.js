import $ from 'jquery'
import { isEmailValid, isNumberValid, isPanValid } from './formValidations'
import { getDropdownList } from '../services/formService'
import { getApiToHit } from '../api/apiConfig'

export const textTypeInputs = ['text', 'number', 'email', 'tel',
    'input_with_dropdown', 'input_with_calendar', 'upload_button']

export const getCurrentSlideInputs = state => {
    const newSlides = [...state.slides]
    const slide = newSlides.filter(slide => slide.slideId === state.currentSlide)
    const inputs = slide[0].inputs
    return { newSlides, inputs }
}

export const handleChangeInputs = (inputs, field, letsGoButtonDisabled) => {
    if (field.type === 'checkbox') {
        inputs.forEach(inp => {
            if (inp.type === 'checkbox') {
                inp.checkbox.checkbox_input.forEach(box => {
                    if (box.input_id === field.name) {
                        box.value = field.checked
                        if (box.input_id === 'tnc') {
                            letsGoButtonDisabled = !field.checked
                        }
                    }
                })
            }
        })
    } else if (field.type === 'input_with_dropdown') {

        inputs.forEach(inp => {

            if (inp.input_id === field.name) {
                inp.selectedId = null
                if (!field.value) {
                    inp.value = field.value
                    inp.selectedItem = null
                    inp.selectedId = null
                    inp.list = []
                    return
                }
                inp.value = field.value
                
                let listType = getApiToHit(inp.input_id)
                getDropdownList(listType)
                    .then(list => {
                        inp.listType = listType
                        inp.list = list
                    })

            } else {
                inp.list = []
            }
        })
    } else if (field.type === 'input_with_calendar') {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                inp.value = field.value
            }
        })
    } else if (field.type === 'upload_button') {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                inp.value = field.value
            }
        })

    } else if (field.type === 'radio') {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                inp.value = field.value
            }
        })
    } else {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                inp.value = field.value
                if (inp.input_id === 'pan' && inp.value) {
                    inp.value = inp.value.toUpperCase()
                }
            }
        })
    }

    return { newstate: { letsGoButtonDisabled } }
}


export const updateInputsValidity = (inputs, field, mandatoryErrorMsg, emailErrorMsg) => {
    let errors = false
    // for check while input and blur
    if (field) {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                if (inp.mandatory && !inp.value) {
                    inp.error = true
                    inp.errorMsg = mandatoryErrorMsg

                } else {
                    inp.error = false
                    inp.errorMsg = ''
                }
            }
        })

        // on slide or form submit
    } else {
        inputs.forEach(inp => {
            if ((textTypeInputs.includes(inp.type) || inp.type === 'radio') && !inp.value && inp.mandatory) {
                inp.error = true
                inp.errorMsg = mandatoryErrorMsg
                errors = true
            }
            else if (inp.type === 'email' && !isEmailValid(inp.value)) {
                inp.error = true
                inp.errorMsg = emailErrorMsg
                errors = true
            }
            else if ((inp.type === 'tel' || inp.type === 'number') && inp.input_id === 'phone_no' && !isNumberValid(inp.value)) {
                inp.error = true
                inp.errorMsg = 'Invalid Mobile No.'
                errors = true
            }
            else if ((inp.type === 'text' && inp.input_id === 'pan') && !isPanValid(inp.value)) {
                inp.error = true
                inp.errorMsg = 'Invalid Pan Card No.'
                errors = true
            }
            else if (inp.type === 'input_with_dropdown' && !inp.selectedId) {
                inp.error = true
                inp.errorMsg = 'Invalid Selection'
                errors = true
            }

        })
    }

    return errors

}

export const incrementSlideId = slideId => {
    let [slide, id] = slideId.split('-')
    slideId = `${slide}-${++id}`
    return slideId
}

export const decrementSlideId = slideId => {
    let [slide, id] = slideId.split('-')
    slideId = `${slide}-${--id}`
    return slideId
}

export const updateSelectionFromDropdown = (inputs, name, item) => {
    inputs.forEach(inp => {
        if (inp.input_id === name) {
            inp.list = []
            inp.value = item.name
            inp.selectedId = item.id
            inp.selectedItem = item.selectedItem
            inp.error = false
        }
    })
}

export const resetDropdowns = inputs => {
    inputs.forEach(inp => {
        if (inp.type === 'input_with_dropdown') {
            inp.list = []
        }
    })
}

export const submitLetsFindForm = () => {
    $(".lets-find-forms-container").removeClass("moving-in-rev")
    $(".lets-find").removeClass("moving-out-rev")
    $(".lets-find-forms-container").addClass("moving-in")
    $(".lets-find").addClass("moving-out")
}

export const loadLetsFindForm = () => {
    $(".lets-find-forms-container").removeClass("moving-in")
    $(".lets-find").removeClass("moving-out")
    $(".lets-find-forms-container").addClass("moving-in-rev")
    $(".lets-find").addClass("moving-out-rev")
}