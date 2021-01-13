import $ from 'jquery'
import { getApiToHit } from '../api/dropdownApiConfig'
import { isInputValid } from './formValidations'
import { getBase64, documentUpload, generateLead } from '../services/formService'
import { getFormattedName } from './formatDataForApi'

export const textTypeInputs = ['text', 'number', 'email', 'tel', 'phone_no',
    'input_with_dropdown', 'input_with_calendar',]

export const getCurrentSlideInputs = state => {
    const newSlides = [...state.slides]
    const slide = newSlides.filter(slide => slide.slideId === state.currentSlide)
    const inputs = slide[0].inputs
    return { newSlides, inputs }
}

export const handleChangeInputs = (inputs, field, submitButtonDisabled) => {
    let inputDropdown = null
    return new Promise((resolve) => {
        if (field.type === 'checkbox') {
            inputs.forEach(inp => {
                if (inp.type === 'checkbox') {
                    inp.checkbox.checkbox_input.forEach(box => {
                        if (box.input_id === field.name) {
                            box.value = field.checked
                            if (box.end_point_name === 'tnc') {
                                submitButtonDisabled = !field.checked
                            }
                        }
                    })
                }
            })
        } else if (field.type === 'input_with_dropdown') {
            inputs.forEach(inp => {
                if (inp.input_id === field.name) {
                    let { listType, masterName } = getApiToHit(inp.search_for)
                    if (!field.value) {
                        inp.value = field.value
                        inp.selectedItem = null
                        inp.selectedId = null
                        inp.list = []
                        inputDropdown = { listType, masterName, inp }
                        return
                    }
                    inp.value = field.value
                    inputDropdown = { listType, masterName, inp }
                    // console.log('inputDropdown: ', inputDropdown)

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
            let error = false
            let errorMsg = ''
            inputs.forEach(inp => {
                if (inp.input_id === field.name) {
                   
                    if (field.value && inp.number_of_uploads && field.value.length > inp.number_of_uploads) {
                        field.value = null
                        field.error = true
                        field.errorMsg = `Number of attachments allowed: ${inp.number_of_uploads}`
                    }

                    // if (field.value && field.value.length && inp.max_upload_size_in_mb) {
                    //     console.log(field.value)
                    //     console.log(field.value.length)
                    //     for (let i = 0; i < field.value.length; i++) {
                    //         const file = field.value[i]
                    //         const size = file.size / 1024 / 1024
                    //         if (size > inp.max_upload_size_in_mb) {
                    //             field.value = null
                    //             field.error = true
                    //             field.errorMsg = `Maximum file size: ${inp.max_upload_size_in_mb} Mb`
                    //         }
                    //     }
                    // }

                    inp.value = field.value
                    inp.attachment = field.attachment
                    inp.error = field.error
                    inp.errorMsg = field.errorMsg

                    // if(inp.error) {
                        inp.verified = false
                    // }

                }
            })

        } else if (field.type === 'radio') {
            inputs.forEach(inp => {
                if (inp.input_id === field.name) {
                    inp.value = field.value
                    inp.verified = true

                    // special case

                    if (inp.end_point_name === 'cc_holder') {
                        inputs.forEach(secondary => {
                            if (secondary.end_point_name === 'bankId') {
                                if (inp.value === 'no') {
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
                    if (inp.type === 'pan_card' && inp.value) {
                        inp.value = inp.value.toUpperCase()
                    }
                }
            })
        }
        resolve({ newstate: { submitButtonDisabled, inputDropdown } })
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
                    inp.verified = false
                } else {
                    inp.error = false
                    inp.errorMsg = ''
                }
            }

            // check on blur

            if (field.blur) {
                if (inp.type === 'email' && inp.input_id === field.currentActiveInput) {
                    if (!isInputValid(inp)) {
                        errors = true
                        inp.error = true
                        inp.verified = false
                        if (!inp.value) {
                            inp.errorMsg = errorMsgs.mandatory
                        } else {
                            inp.errorMsg = inp.validation_error
                        }
                    } else {
                        inp.error = false
                        inp.errorMsg = ''
                        inp.verified = true
                    }
                } else if (inp.type === 'phone_no' && inp.input_id === field.currentActiveInput) {
                    if (!isInputValid(inp)) {
                        errors = true
                        inp.error = true
                        inp.verified = false
                        if (!inp.value) {
                            inp.errorMsg = errorMsgs.mandatory
                        } else {
                            inp.errorMsg = inp.validation_error
                        }
                    } else {
                        inp.error = false
                        inp.errorMsg = ''
                        inp.verified = true
                    }

                } else if (inp.type === 'pan_card' && inp.input_id === field.currentActiveInput) {
                    if (!isInputValid(inp)) {
                        errors = true
                        inp.error = true
                        inp.verified = false
                        if (!inp.value) {
                            inp.errorMsg = errorMsgs.mandatory
                        } else {
                            inp.errorMsg = inp.validation_error
                        }
                    } else {
                        inp.error = false
                        inp.errorMsg = ''
                        inp.verified = true
                    }

                } else if (inp.type === 'input_with_dropdown' && inp.input_id === field.currentActiveInput) {
                    if (!inp.selectedId) {
                        errors = true
                        inp.error = true
                        inp.errorMsg = errorMsgs.mandatory
                        inp.verified = false
                    } else {
                        inp.error = false
                        inp.errorMsg = ''
                        inp.verified = true
                    }
                } else if (textTypeInputs.includes(inp.type) && inp.input_id === field.currentActiveInput && inp.mandatory) {
                    // console.log('inp:: ', inp)
                    if (!inp.value) {
                        errors = true
                        inp.error = true
                        inp.errorMsg = errorMsgs.mandatory
                        inp.verified = false
                    } else {
                        inp.error = false
                        inp.errorMsg = ''
                        inp.verified = true
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
            else if (inp.type === 'email' && !isInputValid(inp)) {
                inp.errorMsg = inp.validation_error
                inp.error = true
                errors = true
            }
            else if (inp.type === 'phone_no' && !isInputValid(inp)) {
                inp.errorMsg = inp.validation_error
                inp.error = true
                errors = true
            }
            else if (inp.type === 'pan_card' && !isInputValid(inp)) {
                inp.errorMsg = inp.validation_error
                inp.error = true
                errors = true
            }
            else if (inp.type === 'input_with_dropdown' && !inp.selectedId) {
                inp.error = true
                inp.errorMsg = inp.validation_error
                errors = true
            } else {
                inp.error = false
                inp.errorMsg = ''
                inp.verified = true

            }

        })
    }

    return errors
}

export const getUserMobileNumber = slide => {
    let mobileNo = ''
    slide.inputs.forEach(inp => {
        if (inp.end_point_name === 'mobile') {
            mobileNo = inp.value
        }
    })
    return mobileNo
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

export const updateDropdownList = (inputs, listType, list, input_id) => {
    inputs.forEach(inp => {
        if (inp.input_id === input_id) {
            inp.listType = listType
            inp.list = list
        }
    })
}

export const updateSelectionFromDropdown = (inputs, name, item) => {
    let update_field_with_input_id = ''

    inputs.forEach(inp => {
        if (inp.input_id === name) {
            update_field_with_input_id = inp.update_field_with_input_id
            inp.list = []
            inp.value = item.name
            inp.selectedId = item.id
            inp.selectedItem = item.selectedItem
            inp.error = false
            inp.verified = true
        }

        if (inp.end_point_name === update_field_with_input_id && inp.end_point_name === 'city' ||
            inp.end_point_name === update_field_with_input_id && inp.end_point_name === 'officeCity') {
            inp.value = item.selectedItem.cityName
            inp.selectedId = item.selectedItem.cityId
            inp.selectedItem = item.selectedItem
            inp.error = false
            inp.verified = true
        }
    })
}

export const resetDropdowns = (inputs, errorMsgs) => {
    inputs.forEach(inp => {
        if (inp.type === 'input_with_dropdown') {
            inp.list = []
            if (inp.value && !inp.selectedId) {
                inp.error = true
                inp.errorMsg = errorMsgs.mandatory
            }
        }
    })
}

export const getSfData = slides => {
    let data = {}
    slides.forEach(slide => {
        slide.inputs.forEach(input => {
            switch (input.type) {
                case 'input_with_dropdown':
                    // console.log('data: ', data)
                    data[input.end_point_name] = input.selectedItem
                    break

                case 'checkbox':
                    input.checkbox.checkbox_input.forEach(box => {
                        data[box.end_point_name] = box.value
                    })
                    break

                default:
                    if (input.end_point_name === 'fullName' && input.value) {
                        const { fullName, firstName, lastName } = getFormattedName(input.value)
                        data[input.end_point_name] = fullName
                        data['firstName'] = firstName
                        data['lastName'] = lastName
                    } else {
                        data[input.end_point_name] = input.value
                    }
            }
        })
    })
    return data
}

export const submitDocument = async document => {
    const base64 = await getBase64(document)
    const { type, name } = document
    documentUpload(base64, type, name)
}

export const submitShortForm = (slides, currentSlide, primaryPath) => {
    return new Promise((resolve, reject) => {
        slides.forEach(slide => {
            if (slide.slideId === currentSlide) {
                slide.inputs.forEach(input => {
                    if (input.attachment && inpput.value && input.value.length) {
                        for (let i = 0; i < input.value.length; i++) {
                            const file = input.value[i]
                            submitDocument(file)
                        }
                    }
                })
            }
        })

        const data = getSfData(slides)
        for (let key in data) {
            if (data[key] === undefined) {
                data[key] = ''
            }
        }
        const previouslySavedData = JSON.parse(localStorage.getItem('formData'))
        const formData = { ...previouslySavedData, [primaryPath]: data }
        localStorage.setItem('formData', JSON.stringify(formData))
        generateLead(data, primaryPath)
            .then(res => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject('Error while Submitting. Please try again.')
            })
    })
}

export const letsFindFormToOtpForm = () => {
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

export const showSlides = (n, slideIndex) => {
    var slides = document.getElementsByClassName("sf-forms")
    if (slideIndex > slides.length) {
        return true
    }

    // if (slideIndex === slides.length) {
    //     $("#button-text").text("Submit and view offers").css("color", "#89C142");
    //     $("#next").addClass("submit-short-form");

    // } else {
    //     $("#button-text").text("Next").css("color", "#221F1F");
    //     $("#next").removeClass("submit-short-form");
    // }

    if (n < 1) {
        if (slideIndex) {
            slides[slideIndex - 1].style.display = "block"
            slides[slideIndex - 1].classList.add("opacity-in")
        }
        $("#button-text").text("Next")
        $("#next").removeClass("submit-short-form");
    }
}