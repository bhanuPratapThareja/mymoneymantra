import $ from 'jquery'
import { isEmailValid, isNumberValid, isPanValid } from './formValidations'
import { getDropdownList, getBankList } from '../services/formService'
import { getApiToHit } from '../api/dropdownApiConfig'
import { debounce } from 'lodash'

export const textTypeInputs = ['text', 'number', 'email', 'tel', 'phone_no',
    'input_with_dropdown', 'input_with_calendar', 'upload_button']

export const getCurrentSlideInputs = state => {
    const newSlides = [...state.slides]
    const slide = newSlides.filter(slide => slide.slideId === state.currentSlide)
    const inputs = slide[0].inputs
    return { newSlides, inputs }
}

export const handleChangeInputs = (inputs, field, letsGoButtonDisabled) => {
    return new Promise((resolve) => {
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

                    if (inp.input_id === 'bank' || inp.input_id === 'bank_name') {
                        let listType = 'bank'
                       
                        getBankList(inp.value)
                            .then(list => {
                                inp.listType = listType
                                inp.list = list
                            })
                    } 
                    
                
                    else {
                        let listType = getApiToHit(inp.input_id)
                        getDropdownList(listType, inp.value)
                            .then(list => {
                                inp.listType = listType
                                inp.list = list
                            })

                    }
    
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

                    // special case

                    if(inp.input_id === 'cc_holder') {
                        inputs.forEach(secondary => {
                            if(secondary.input_id === 'bank') {
                                if(inp.value === 'no'){
                                    secondary.value = ''
                                    secondary.list = []
                                    secondary.selectedId = '*'
                                    secondary.selectedItem = null
                                    secondary.mandatory = false
                                    secondary.error = false
                                    secondary.errorMsg = ''
                                } else {
                                    secondary.selectedId = null
                                    secondary.mandatory = true
                                }
                            }
                        })
                    }

                }
            })
        } else {
            inputs.forEach(inp => {
                if (inp.input_id === field.name) {
                    inp.value = field.value
                    if (inp.input_id === 'pan_card' && inp.value) {
                        inp.value = inp.value.toUpperCase()
                    }
                }
            })
        }
        resolve ({ newstate: { letsGoButtonDisabled } })
    })
}

export const updateInputsValidity = (inputs, field, errorMsgs) => {
    let errors = false

    // check on input 
    if (field) {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                if (inp.mandatory && !inp.value) {
                    inp.error = true
                    inp.errorMsg = errorMsgs.mandatory
                } else {
                    inp.error = false
                    inp.errorMsg = ''
                }
            }

            // check on blur

            if (field.blur) {
               
                if (inp.type === 'email' && inp.input_id === field.currentActiveInput && !isEmailValid(inp.value)) {
                    inp.error = true
                    errors = true
                    if (!inp.value) {
                        inp.errorMsg = errorMsgs.mandatory
                    } else {
                        inp.errorMsg = errorMsgs.email
                    }
                } else if (inp.type === 'phone_no' && inp.input_id === field.currentActiveInput && !isNumberValid(inp.value)) {
                    inp.error = true
                    errors = true
                    if (!inp.value) {
                        inp.errorMsg = errorMsgs.mandatory
                    } else {
                        inp.errorMsg = errorMsgs.mobile
                    }
                } else if ((inp.type === 'text' && inp.input_id === 'pan_card') && inp.input_id === field.currentActiveInput && !isPanValid(inp.value)) {
                    inp.error = true
                    errors = true
                    if (!inp.value) {
                        inp.errorMsg = errorMsgs.mandatory
                    } else {
                        inp.errorMsg = errorMsgs.pancard
                    }
                } else if (inp.type === 'input_with_dropdown' && inp.input_id === field.currentActiveInput && !inp.selectedId) {
                    inp.error = true
                    errors = true
                    if(!inp.value){
                        inp.errorMsg = errorMsgs.mandatory
                    } else {
                        inp.errorMsg = errorMsgs.dropdown
                    }
                }
            }
        })

        // check on slide or form submit

    } else {
        inputs.forEach(inp => {
            if ((textTypeInputs.includes(inp.type) || inp.type === 'radio') && !inp.value && inp.mandatory) {
                inp.errorMsg = errorMsgs.mandatory
                inp.error = true
                errors = true
            }
            else if (inp.type === 'email' && !isEmailValid(inp.value)) {
                inp.errorMsg = errorMsgs.email
                inp.error = true
                errors = true
            }
            else if (inp.type === 'phone_no' && !isNumberValid(inp.value)) {
                inp.errorMsg = errorMsgs.mobile
                inp.error = true
                errors = true
            }
            else if ((inp.type === 'text' && inp.input_id === 'pan_card') && !isPanValid(inp.value)) {
                inp.errorMsg = errorMsgs.pancard
                inp.error = true
                errors = true
            }
            else if (inp.type === 'input_with_dropdown' && !inp.selectedId) {
                inp.error = true
                inp.errorMsg = errorMsgs.dropdown
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

export const LetsFindFormToOtpForm = () => {
    $(".lets-find").addClass("moving-out")
    $(".lets-find").removeClass("moving-out-rev")
    setTimeout(() => {
        $(".sms-otp").addClass("moving-in")
        $(".sms-otp").removeClass("moving-in-rev")
    }, 50)
    setTimeout(() => {
        document.getElementsByClassName('input_otp')[0].focus()
    }, 500)
}

export const goToSlides = () => {
    $(".sms-otp").addClass("moving-out")
    $(".sms-otp").removeClass("moving-in")
    $(".sms-otp").removeClass("moving-out-rev")
    $("#lets-form-slides").removeClass("moving-in-rev")
    $("#lets-form-slides").addClass("moving-in")
}

export const loadOtpForm = () => {
    $("#lets-form-slides").addClass("moving-in-rev")
    $("#lets-form-slides").removeClass("moving-in")

    setTimeout(() => {
        $(".sms-otp").removeClass("moving-out")
        $(".sms-otp").addClass("moving-out-rev")
        $(".sms-otp").addClass("moving-in")
        $(".sms-otp").css('margin-left', '-100%')
    }, 100);
}

export const loadLetsFindForm = () => {
    $(".sms-otp").addClass("moving-in-rev")
    $(".sms-otp").removeClass("moving-in")

    setTimeout(() => {
        $(".lets-find").removeClass("moving-out")
        $(".lets-find").addClass("moving-out-rev")
    }, 150);
}