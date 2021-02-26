import $ from "jquery"
import { isInputValid, isMonetaryValid } from "./formValidations"
import { getBase64, documentUpload, generateLead } from "../services/formService"
import { getFormattedName } from "./formatDataForApi"
import { getWholeNumberFromCurrency, getFormattedCurrency } from "./formattedCurrency"
import { setFormData, getFormData } from "./localAccess"

export const textTypeInputs = [
  "text",
  "number",
  "email",
  "tel",
  "phone_no",
  "input_with_calendar"
]

export const getCurrentSlideInputs = (state) => {
  const newSlides = [...state.slides]
  const slide = newSlides.filter(
    (slide) => slide.slideId === state.currentSlide
  )
  const inputs = slide[0].inputs
  return { newSlides, inputs }
}

export const handleChangeInputs = (inputs, field, preferredSelectionLists, selectedBank) => {
  let inputDropdown = null
  let propertyValue = 0
  if (field.type === "checkbox") {
    inputs.forEach((inp) => {
      if (inp.type === "checkbox") {
        inp.checkbox.checkbox_input.forEach((box) => {
          if (box.input_id === field.name) {
            box.value = field.checked
          }
        })
      }
    })
  } else if (field.type === "input_with_dropdown") {
    inputs.forEach(async inp => {
      if (inp.input_id === field.name) {
        const listType = inp.list_type
        const masterName = inp.master_name
        if (field.focusDropdown && inp.list_preference && preferredSelectionLists) {
          let prefferedList = []
          let isPrioritized = false

          let preferredListDataArray = preferredSelectionLists.filter(listItem => inp.list_preference.name === listItem.name)


          if (preferredListDataArray.length) {
            let preferredListData = preferredListDataArray[0]


            preferredListData[preferredListData.extract_list].forEach(item => {
              if (item.priority) {
                isPrioritized = true
              }

              const preferredItem = {
                [inp.select_id]: item[preferredListData.extract_id],
                [inp.select_name]: item[preferredListData.extract_name],
                priority: item.priority,
                cardTypeBankId: item.cardTypeBankId,
                designationBankId: item.designationBankId
              }
              prefferedList.push(preferredItem)
            })

            if (isPrioritized) {
              prefferedList.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
            }
          }

          if (inp.list_preference.extract_list === 'card_types') {
            if (selectedBank && selectedBank.bankId) {
              prefferedList = prefferedList.filter(listItem => listItem.cardTypeBankId === selectedBank.bankId)
            }
          }

          if (inp.list_preference.extract_list === 'designations') {
            if (selectedBank && selectedBank.bankId) {
              prefferedList = prefferedList.filter(listItem => listItem.designationBankId === selectedBank.bankId)
            }
          }

          inputDropdown = { listType, masterName, inp, prefferedList }

        } else if (!field.value) {
          inp.value = field.value
          inp.selectedItem = null
          inp.selectedId = null
          inp.list = []

          inputDropdown = { listType, masterName, inp }

        } else {
          inp.error = false
          inp.value = field.value
          inputDropdown = { listType, masterName, inp }

        }

      } else {

        inp.list = []
      }
    })
  } else if (field.type === "input_with_calendar") {
    inputs.forEach((inp) => {
      if (inp.input_id === field.name) {
        inp.value = field.value
      }
    })
  } else if (field.type === "upload_button") {
    let noOfUploadsError = false
    inputs.forEach((inp) => {
      if (inp.input_id === field.name) {
        const testFiles = { ...field }

        if (
          testFiles.value &&
          inp.number_of_uploads &&
          testFiles.value.length > inp.number_of_uploads
        ) {
          field.value = null
          field.error = true
          noOfUploadsError = true
          field.errorMsg = inp.maximum_uploads_error
        }

        if (
          !noOfUploadsError &&
          testFiles.value &&
          testFiles.value.length &&
          inp.max_upload_size_in_mb
        ) {
          for (let i = 0; i < testFiles.value.length; i++) {
            const file = testFiles.value[i]
            const size = file.size / 1024 / 1024
            if (size > inp.max_upload_size_in_mb) {
              field.value = null
              field.error = true
              field.errorMsg = inp.upload_size_error
            }
          }
        }

        inp.value = field.value
        inp.attachment = field.attachment
        inp.error = field.error
        inp.errorMsg = field.errorMsg
        inp.verified = false
      }
    })
  } else if (field.type === "radio") {
    inputs.forEach((inp) => {
      if (inp.input_id === field.name) {
        inp.value = field.value
        inp.verified = true
        inp.error = false

        // special case for radio to disable another input

        if (inp.radio.disable_input_with_end_point_name) {
          inputs.forEach((secondary) => {
            if (secondary.end_point_name === inp.radio.disable_input_with_end_point_name) {
              if (inp.value === inp.radio.disable_when_value) {
                secondary.value = ""
                secondary.list = []
                secondary.selectedId = "*"
                secondary.selectedItem = null
                secondary.mandatory = false
                secondary.error = false
                secondary.errorMsg = ""
                secondary.verified = false
              } else {
                secondary.mandatory = true
                secondary.verified = false
                if (secondary.selectedId === '*') {
                  secondary.selectedId = null
                }
              }
            }
          })
        }
      }
    })
  } else {
    inputs.forEach((inp) => {
      if (inp.input_id === field.name) {
        inp.value = field.value
        if (inp.type === "pan_card" && inp.value) {
          inp.value = inp.value.toUpperCase()
          inp.error = false
          inp.errorMsg = ""
          inp.verified = false
        }
        if(inp.end_point_name === 'propertyValue' && inp.value) {
          propertyValue = Number(getWholeNumberFromCurrency(inp.value))
        }
      }
    })
  }

  return {inputDropdown, propertyValue}
}

export const updateInputsValidity = (inputs, field, errorMsgs, propertyValue) => {
  let errors = false

  // check on input
  if (field) {

    inputs.forEach((inp) => {
      if (inp.input_id === field.name) {
        if (inp.value && inp.mandatory) {
          inp.error = false
          inp.errorMsg = ''
          inp.verified = false
        }
      }

      // check on blur

      if (field.blur) {
        if(inp.end_point_name === 'requestedLoanamount' && inp.value && inp.input_id === field.currentActiveInput && propertyValue){

          errors = true
          inp.error = true
          inp.verified = false
          if(!inp.value) {
            inp.errorMsg = errorMsgs.mandatory
          } else if(Number(getWholeNumberFromCurrency(inp.value)) > propertyValue) {
            inp.errorMsg = `The value cannot be more than Property Value of ${getFormattedCurrency(propertyValue.toString())}`
          } else if(!isMonetaryValid(inp)) {
            inp.errorMsg = inp.validation_error
          } else {
            inp.error = false
            inp.errorMsg = ""
            inp.verified = true
          }
        }
        else if (inp.type === "email" && inp.input_id === field.currentActiveInput) {
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
            inp.errorMsg = ""
            inp.verified = true
          }
        } else if (
          inp.type === "money" &&
          inp.input_id === field.currentActiveInput
        ) {
          if (!isMonetaryValid(inp)) {
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
            inp.errorMsg = ""
            inp.verified = true
          }
        } else if (
          inp.type === "phone_no" &&
          inp.input_id === field.currentActiveInput
        ) {
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
            inp.errorMsg = ""
            inp.verified = true
          }
        } else if (
          inp.type === "pan_card" &&
          inp.input_id === field.currentActiveInput
        ) {
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
            inp.errorMsg = ""
            inp.verified = true
          }
        } else if (inp.type === "input_with_dropdown" && inp.input_id === field.currentActiveInput && inp.mandatory) {
          if (!inp.selectedId) {
            errors = true
            inp.error = true
            inp.errorMsg = errorMsgs.mandatory
            inp.verified = false
          } else {
            inp.error = false
            inp.errorMsg = ""
            inp.verified = true
          }

        } else if (inp.type === "upload_button") {
          if (inp.mandatory && !inp.value) {
            inp.error = true
            inp.errorMsg = errorMsgs.mandatory
            errors = true
          } else {
            inp.error = false
            inp.errorMsg = ""     
          }

        } else if (
          textTypeInputs.includes(inp.type) &&
          inp.input_id === field.currentActiveInput &&
          inp.mandatory
        ) {
          if (!inp.value || !isInputValid(inp)) {
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
            inp.errorMsg = ""
            inp.verified = true
          }
        }
      }
    })

    // check on slide or form submit
  } else {
    inputs.forEach((inp) => {
      if(inp.end_point_name === 'requestedLoanamount' && inp.value && propertyValue){
        if(!inp.value) {
          errors = true
          inp.error = true
          inp.errorMsg = errorMsgs.mandatory
        }else if(!isMonetaryValid(inp)) {
          errors = true
          inp.error = true         
          inp.errorMsg = inp.validation_error
        } else if(Number(getWholeNumberFromCurrency(inp.value)) > propertyValue) {
          errors = true
          inp.error = true
          inp.errorMsg = `The value cannot be more than Property Value of ${getFormattedCurrency(propertyValue.toString())}`
        }

      }
      else if (inp.selectedId && inp.selectedId === "*" || !inp.mandatory) {
        inp.verified = false
      } else if ((textTypeInputs.includes(inp.type) || inp.type === "radio")) {
        if ((inp.mandatory && !inp.value) || !isInputValid(inp)) {
          errors = true
          inp.error = true
          if (!inp.value) {
            inp.errorMsg = errorMsgs.mandatory
          } else {
            inp.errorMsg = inp.validation_error
          }
        }
      } else if (inp.type === "email" && !isInputValid(inp)) {
        inp.errorMsg = inp.validation_error
        inp.error = true
        errors = true
      } else if (inp.type === "phone_no" && !isInputValid(inp)) {
        inp.errorMsg = inp.validation_error
        inp.error = true
        errors = true
      } else if (inp.type === "pan_card" && !isInputValid(inp)) {
        inp.errorMsg = inp.validation_error
        inp.error = true
        errors = true
      } else if (inp.type === "money" && !isMonetaryValid(inp)) {
        inp.error = true
        inp.errorMsg = inp.validation_error
        errors = true
      } else if (inp.type === "upload_button" && inp.mandatory && !inp.value) {
        inp.error = true
        inp.errorMsg = errorMsgs.mandatory
        errors = true
      } else if (inp.type === "input_with_dropdown" && (!inp.value || (inp.value && !inp.selectedId) || (inp.selectedItem && inp.selectedItem[inp.select_name] !== inp.value))) {
        inp.error = true
        inp.errorMsg = inp.validation_error
        errors = true
      } else {
        inp.error = false
        inp.errorMsg = ""
        inp.verified = true
      }
    })
  }

  return errors
}

export const getUserMobileNumber = (slide) => {
  let mobileNo = ""
  slide.inputs.forEach((inp) => {
    if (inp.end_point_name === "mobile") {
      mobileNo = inp.value
    }
  })
  return mobileNo
}

export const incrementSlideId = (slideId) => {
  let [slide, id] = slideId.split("-")
  slideId = `${slide}-${++id}`
  return slideId
}

export const decrementSlideId = (slideId) => {
  let [slide, id] = slideId.split("-")
  slideId = `${slide}-${--id}`
  return slideId
}

export const updateDropdownList = (inputs, listType, list, input_id) => {
  inputs.forEach((inp) => {
    if (inp.input_id === input_id) {
      inp.listType = listType
      inp.list = list
      inp.error = false
    }
  })
}

export const updateSelectionFromDropdown = (inputs, input_id, item) => {
  let bankItem
  let bankType
  let update_field_with_end_point_name = ""
  inputs.forEach((inp) => {
    if (inp.input_id === input_id && item) {
      update_field_with_end_point_name = inp.update_field_with_end_point_name
      inp.list = []
      inp.value = item[inp.select_name]
      inp.selectedId = item[inp.select_id]
      inp.selectedItem = item
      inp.error = false
      inp.verified = true
      if (inp.listType === 'bank' && inp.selectedItem) {
        bankItem = inp.selectedItem
        bankType = inp.end_point_name
      }
    }

    if (inp.end_point_name === update_field_with_end_point_name) {
      inputs.forEach((dependentInput) => {
        if (dependentInput.end_point_name == update_field_with_end_point_name) {
          dependentInput.verified = false
          dependentInput.selectedItem = item
          dependentInput.value = item[dependentInput.select_name]
          dependentInput.selectedId = item[dependentInput.select_id]
          dependentInput.error = false
          update_field_with_end_point_name = dependentInput.update_field_with_end_point_name
          if(dependentInput.value) {
            dependentInput.verified = true
          }
          if(!dependentInput.mandatory) {
            dependentInput.verified = false
          }
        }
      })
    }
  })
  return { bankItem, bankType }
}

export const resetDropdowns = (inputs, errorMsgs) => {
  inputs.forEach((inp) => {
    if (inp.type === "input_with_dropdown") {
      inp.list = []
      if ((inp.value && !inp.selectedId) || (inp.selectedItem && inp.selectedItem[inp.select_name] !== inp.value)) {
        inp.error = true
        inp.errorMsg = inp.validation_error
        inp.selectedId = null
        inp.selectedItem = null
        inp.verified = false
      }
    }
  })
}

export const getSfData = (slides) => {
  let data = {}
  slides.forEach((slide) => {
    slide.inputs.forEach((input) => {
      switch (input.type) {
        case "input_with_dropdown":
          data[input.end_point_name] = input.selectedItem
          break

        case "money":
          data[input.end_point_name] = getWholeNumberFromCurrency(input.value)
          break

        case "checkbox":
          input.checkbox.checkbox_input.forEach((box) => {
            data[box.end_point_name] = box.value
          })
          break

        default:
          if (input.end_point_name === "fullName" && input.value) {
            const { fullName, firstName, lastName } = getFormattedName(
              input.value
            )
            data[input.end_point_name] = fullName
            data["firstName"] = firstName
            data["lastName"] = lastName
          } else {
            data[input.end_point_name] = input.value
          }
      }
    })
  })
  return data
}

export const submitDocument = async (documentName, files, primaryPath) => {
  let docs = []
  for (let i = 0; i < files.length; i++) {
    const { type, name } = files[i]
    const base64 = await getBase64(files[i])
    docs.push({ name, base64, type })
  }
  documentUpload(docs, documentName, primaryPath)
}

export const submitShortForm = (slides, currentSlide, primaryPath, formType, productType) => {
  return new Promise((resolve, reject) => {
    slides.forEach((slide) => {
      if (slide.slideId === currentSlide) {
        slide.inputs.forEach((input) => {
          if (input.attachment && input.value && input.value.length) {
            submitDocument(input.end_point_name, input.value, primaryPath)
          }
        })
      }
    })

    const data = getSfData(slides)
    for (let key in data) {
      if (data[key] === undefined) {
        data[key] = ""
      }
    }
   
    setFormData(data, primaryPath)
    const latestFormData = getFormData(primaryPath)
    if(latestFormData) {
      generateLead(latestFormData, primaryPath, formType, productType)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject("Error while Submitting. Please try again.!!!")
      })
    }
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
    document.getElementsByClassName("input_otp")[0].focus()
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
    $(".sms-otp").css("margin-left", "-100%")
  }, 100)
}

export const loadLetsFindForm = () => {
  $(".sms-otp").addClass("moving-in-rev")
  $(".sms-otp").removeClass("moving-in")

  setTimeout(() => {
    $(".lets-find").removeClass("moving-out")
    $(".lets-find").addClass("moving-out-rev")
  }, 150)
}

export const showSlides = (n, slideIndex) => {
  var slides = document.getElementsByClassName("sf-forms")
  if (slideIndex > slides.length) {
    return true
  }

  // if (slideIndex === slides.length) {
  //     $("#button-text").text("Submit and view offers").css("color", "#89C142")
  //     $("#next").addClass("submit-short-form")

  // } else {
  //     $("#button-text").text("Next").css("color", "#221F1F")
  //     $("#next").removeClass("submit-short-form")
  // }

  if (n < 1) {
    if (slideIndex) {
      slides[slideIndex - 1].style.display = "block"
      slides[slideIndex - 1].classList.add("opacity-in")
    }
    $("#button-text").text("Next")
    $("#next").removeClass("submit-short-form")
  }
}
