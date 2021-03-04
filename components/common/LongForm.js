import Modal from "../../components/Modal/Modal"
import Otp from "../Otp/Otp"
import { withRouter } from "next/router"
import { uniq, debounce } from "lodash"
import { generateInputs } from "../../utils/inputGenerator"
import { getDropdownList } from "../../services/formService"
import { generateLead, sendNotification, submitOtp, getOtp } from "../../services/formService"
import { setLeadId, getLeadId, setLeadBank } from "../../utils/localAccess"
import { getWholeNumberFromCurrency } from "../../utils/formattedCurrency"
import ImageComponent from '../../components/ImageComponent/ImageComponent'
import { lf } from '../../utils/types'
import {
  textTypeInputs,
  updateFormInputs,
  handleChangeInputs,
  updateInputsValidity,
  updateDropdownList,
  updateSelectionFromDropdown,
  resetDropdowns,
  scrollToErrorInput,
  submitDocument
} from "../../utils/formHandle"

class LongForm extends React.Component {

  state = {
    longFormSections: [],
    submitButtonDisabled: false,
    submissionError: '',
    errorMsgs: {
      mandatory: "Required Field",
    },
    noOfMandatoryInputs: 0,
    verifiedInputs: [],
    leadId: '',
    enableCheckboxes: [],
    openOtpModal: false,
    cardType: '',
    submissionError: '',
    skipOtp: false
  }

  getBankData = async () => {
    if (!this.props.productData) {
      return null
    }
    const productData = this.props.productData
    const { bank_id: bankId, bank_name: bankName, bank_image: bankImage } = productData.bank
    const leadBank = { bankId, bankName, bankImage }
    return leadBank
  }

  async componentDidMount() {
    const primaryPath = this.props.primaryPath
    const leadBank = await this.getBankData()
    const { long_form_version_2, always_ask_for_otp } = this.props.data
    const longFormSections = long_form_version_2.long_form[0].long_form_sections
    
    let noOfMandatoryInputs = 0
    let enableCheckboxes = []
    let leadId = getLeadId(primaryPath)

    for (let i = 0; i < longFormSections.length; i++) {
      const long_form_blocks = longFormSections[i].sections[0].long_form_blocks
      long_form_blocks.forEach((long_form_block) => {
        const inputs = long_form_block.blocks
        const { updatedNoOfMandatoryInputs, updatedEnableCheckboxes } = updateFormInputs(inputs)
        noOfMandatoryInputs = noOfMandatoryInputs + updatedNoOfMandatoryInputs
        enableCheckboxes = [...enableCheckboxes, ...updatedEnableCheckboxes]
      })
    }

    this.setState({
      longFormSections,
      noOfMandatoryInputs,
      enableCheckboxes,
      primaryPath,
      leadBank,
      salaryBank: null,
      existingFacilityBank: null,
      leadId,
      cardTypeCC: this.props.productData && this.props.productData.product ? this.props.productData.product.cardType : null,
      submitButtonDisabled: enableCheckboxes.length !== 0,
      askForOtp: always_ask_for_otp,
      fulfillTnc: primaryPath !== 'rkpl' && (!leadId || always_ask_for_otp)
    }, () => {
      const newLongFormSections = this.state.longFormSections
      for (let i = 0; i < newLongFormSections.length; i++) {
        const long_form_blocks = newLongFormSections[i].sections[0].long_form_blocks
        for (let j = 0; j < long_form_blocks.length; j++) {
          const inputs = long_form_blocks[j].blocks
          for (let k = 0; k < inputs.length; k++) {
            if (inputs[k].type === 'checkbox' && inputs[k].tnc && !this.state.fulfillTnc) {
              newLongFormSections.splice(i, 1)
              this.setState({ enableCheckboxes: [], submitButtonDisabled: false })
            }
          }
        }

      }
      this.handlePercentage()
    })
  }

  handleChange = field => {
    this.setState({ submissionError: '' })
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(long_form_block => {
        const inputs = long_form_block.blocks;

        const { inputDropdown } = handleChangeInputs(inputs, field, this.props.preferredSelectionLists, this.state.leadBank)
        if (inputDropdown && field.type === 'input_with_dropdown') {
          const { listType, masterName, inp, prefferedList } = inputDropdown
          if (field.focusDropdown && prefferedList) {
            inp.listType = listType
            inp.list = prefferedList
            inp.error = false
            setTimeout(() => {
              this.handleInputDropdownChange(listType, prefferedList, inp.input_id)
            }, 500)

          } else if (!field.focusDropdown && listType && listType !== 'null') {
            const debouncedSearch = debounce(() => getDropdownList(listType, inp.value, masterName)
              .then(list => {
                inp.listType = listType
                inp.list = list
                this.handleInputDropdownChange(listType, list, inp.input_id, field)
              }), 500)
            debouncedSearch(listType, inp.value, masterName)
          }
        }
      })
    })

    this.setState({ longFormSections: newLongFormSections, errors: false }, () => {
      if (textTypeInputs.includes(field.type) || field.type === 'input_with_dropdown' || field.type === 'money') {
        this.checkInputValidity(field, field.focusDropdown)
      }

      if (!this.state.fulfillTnc) {
        this.setState({ submitButtonDisabled: false })
        this.updateState(newLongFormSections)
        return
      }
      const { enableCheckboxes } = this.state;
      let trueEnableCheckboxes = [];
      if (enableCheckboxes.length) {
        enableCheckboxes.forEach((box) => {
          if (box.value) {
            trueEnableCheckboxes.push(true)
          }
        });
      }

      if (enableCheckboxes.length === trueEnableCheckboxes.length) {
        this.setState({ submitButtonDisabled: false });
      } else {
        this.setState({ submitButtonDisabled: true });
      }
    });
    this.updateState(newLongFormSections)
  };

  handleInputDropdownChange = (listType, list, input_id, field) => {
    const newLongFormSections = [...this.state.longFormSections]
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        updateDropdownList(inputs, listType, list, input_id)
        inputs.forEach(input => {
          if (input.input_id === input_id) {
            if (list && list.length && field && field.value && input.auto_select) {
              let filteredItemList = list.filter(item => item[input.select_name] === field.value.toUpperCase())
              let filteredItem = filteredItemList.length ? filteredItemList[0] : null
              this.handleInputDropdownSelection(input_id, filteredItem)
            }
          }
        })
      });
    });
    this.updateState(newLongFormSections)
  };

  handleInputDropdownSelection = (input_id, item) => {
    const newLongFormSections = [...this.state.longFormSections]
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach((long_form_block) => {
        const inputs = long_form_block.blocks;
        const { bankItem, bankType } = updateSelectionFromDropdown(inputs, input_id, item)
        if (bankItem && bankItem.bankId) {
          this.setState({ [bankType]: bankItem }, () => {
            newLongFormSections.forEach((longFormSectionRkpl) => {
              const rkplBlocks = longFormSectionRkpl.sections[0].long_form_blocks
              rkplBlocks.forEach(rkplBlocks => {
                const rkplInputs = rkplBlocks.blocks
                rkplInputs.forEach(rkplInput => {
                  if ((rkplInput.end_point_name === 'cardType' && rkplInput.selectedItem && rkplInput.selectedItem.cardTypeBankId !== bankItem.bankId) ||
                    (rkplInput.end_point_name === 'designationId' && rkplInput.selectedItem && rkplInput.selectedItem.designationBankId !== bankItem.bankId)) {
                    rkplInput.selectedId = null
                    rkplInput.selectedItem = null
                    rkplInput.error = false
                    rkplInput.errorMsg = ''
                    rkplInput.verified = false
                    rkplInput.list = []
                    rkplInput.value = ''
                  }
                })
              })
            })
          })
        }
      });
    });
    this.updateState(newLongFormSections)
  };

  handleClickOnSlideBackground = () => {
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        resetDropdowns(inputs, this.state.errorMsgs);
      });
    });
    this.updateState(newLongFormSections)
  }

  checkInputValidity = (field) => {
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        updateInputsValidity(inputs, field, this.state.errorMsgs);
      });
    });
    this.updateState(newLongFormSections)
  };

  updateState = (longFormSections) => {
    return new Promise((resolve) => {
      this.setState({ longFormSections }, () => {
        this.handlePercentage()
        resolve(true)
      });
    });
  };

  handlePercentage = () => {
    const newLongFormSections = [...this.state.longFormSections]
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks
        inputs.forEach((input) => {
          if (input.mandatory) {
            this.handleVerifiedInputsArray(input)
          }
        });
      });
    });
  };

  handleVerifiedInputsArray = (input) => {
    const verifiedInputsArray = this.state.verifiedInputs
    if (input.verified) {
      verifiedInputsArray.push(input.input_id)
    } else {
      if (verifiedInputsArray.includes(input.input_id)) {
        const index = verifiedInputsArray.indexOf(input.input_id)
        verifiedInputsArray.splice(index, 1)
      }
    }
    const uniqueVerifiedInputsArray = uniq(verifiedInputsArray);
    this.setState({ verifiedInputs: uniqueVerifiedInputsArray }, () => {
      const percentage = (this.state.verifiedInputs.length / this.state.noOfMandatoryInputs) * 100
      const event = new CustomEvent('percentageCalulated', {
        detail: { percentage },
      })
      document.dispatchEvent(event)
    });
  };

  onSubmitLongForm = e => {
    e.preventDefault()
    let errors = false
    let inputWithError = null
    const newLongFormSections = [...this.state.longFormSections]
    newLongFormSections.forEach(longFormSection => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(long_form_block => {
        const inputs = long_form_block.blocks
        const { errorsPresent } = updateInputsValidity(inputs, null, this.state.errorMsgs)
        if (errorsPresent) {
          errors = true
          this.setState({ errors: true })
        }
      })
    })

    newLongFormSections.forEach(longFormSection => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(long_form_block => {
        const inputs = long_form_block.blocks
        inputs.forEach(inp => {
          if (errors && inp.error && !inputWithError) {
            inputWithError = inp
          }
        })
      })
    })

    this.updateState(newLongFormSections).then(() => {
      if (!errors) {
        if (this.state.fulfillTnc) {
          let mobileNo = "";
          const newLongFormSections = [...this.state.longFormSections]
          newLongFormSections.forEach((longFormSection) => {
            const long_form_blocks =
              longFormSection.sections[0].long_form_blocks;
            long_form_blocks.forEach(async (long_form_block) => {
              const inputs = long_form_block.blocks
              inputs.forEach((inp) => {
                if (inp.end_point_name === "mobile") {
                  mobileNo = inp.value;
                }
              })
            })
          })
          this.setState({ openOtpModal: true, mobileNo, submissionError: '' })
          getOtp(mobileNo)
        } else {
          this.retrieveDataAndSubmit()
        }
      } else {
        this.setState({ submissionError: 'Please correct the fields marked in red' })
        scrollToErrorInput(inputWithError)
      }
    })
  }

  onSubmitOtp = e => {
    e.preventDefault()
    const inputs = document.getElementsByClassName('input_otp')
    for (let inp of inputs) {
      inp.blur()
    }
    this.removeSubmissionErrorMsg()
    setTimeout(async () => {
      try {
        await submitOtp(this.state.mobileNo)
        this.closeOtpModal()
        this.setState({ submitButtonDisabled: true });
        this.retrieveDataAndSubmit()
      } catch (err) {
        this.setState({ submissionError: err.message })
      }
    }, 300)
  }

  removeSubmissionErrorMsg = () => {
    this.setState({ submissionError: '' })
  }

  retrieveDataAndSubmit = () => {
    let documentsArray = []
    this.setState({ submitButtonDisabled: true, submissionError: '' })
    let data = {};
    const newLongFormSections = [...this.state.longFormSections]
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks

        inputs.forEach(input => {
          if (input.attachment && input.value && input.value.length) {
            documentsArray.push(input)
          }
        })

        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];

          if (input.type === "checkbox") {
            input.checkbox.checkbox_input.forEach((box) => {
              data[box.end_point_name] = box.value;
            });
          } else if (input.type === "input_with_dropdown") {
            data[input.end_point_name] = input.selectedItem;
          } else if (input.type === "money") {
            data[input.end_point_name] = getWholeNumberFromCurrency(
              input.value
            );
          } else {
            data[input.end_point_name] = input.value;
          }
        }

        let { firstName, lastName } = data;
        if (!lastName) {
          lastName = "";
        }
        const fullName = firstName + " " + lastName;
        data.fullName = fullName;

        for (let key in data) {
          if (data[key] === undefined) {
            data[key] = "";
          }
        }
      })
    })


    const { utm_campaign: utmCampaign, utm_medium: utmMedium,
      utm_source: utmSource, utm_remark: utmRemark } = this.props.router.query
    data.utmCampaign = utmCampaign
    data.utmMedium = utmMedium
    data.utmSource = utmSource
    data.utmRemark = utmRemark

    data.leadBank = this.state.leadBank
    data.salaryBank = this.state.salaryBank
    data.existingFacilityBank = this.state.existingFacilityBank
    data.cardTypeCC = this.state.cardTypeCC

    let { primaryPath, leadBank } = this.state


    generateLead(data, primaryPath, lf, this.props.productType)
      .then((res) => {
        const leadId = res.data.leadId
        let actionName = this.state.primaryPath === 'rkpl' ? 'RKPL-CC' : 'Short Form Submit'
        sendNotification(leadId, actionName)

        documentsArray.forEach(input => {
          submitDocument(input.end_point_name, input.value)
        })

        let primaryPath = this.state.primaryPath
        if (primaryPath === 'rkpl') {
          primaryPath = 'credit-cards'
        }
        if (primaryPath === 'talent-edge-form') {
          primaryPath = 'personal-loans'
        }

        setLeadId(leadId, primaryPath)
        setLeadBank(leadBank)
        const pathname = `/thank-you`
        const query = { primaryPath }
        this.props.router.push({ pathname, query }, pathname, { shallow: true })
      })
      .catch(err => {
        this.setState({ submitButtonDisabled: false, submissionError: 'Something went wrong. Please try again.' })
      })
  };

  closeOtpModal = () => {
    this.setState({ openOtpModal: false, submissionError: '' })
  };

  render() {
    let index = 0;
    if (!this.state.longFormSections) {
      return null
    }

    const bank = this.props.productData && this.props.productData.bank ? this.props.productData.bank : null;

    return (
      <div className="form-wrapper" id="longForm">

        <div className="cstm-lf-img">
          {this.props.primaryPath === 'credit-cards' || !bank ?
            null : <ImageComponent image={bank.bank_image}
            />}
        </div>

        <form onClick={this.handleClickOnSlideBackground} onSubmit={this.onSubmitLongForm} id='long-form_id' noValidate autoComplete="off">
          {this.state.longFormSections.map((longFormSection) => {
            const long_form_blocks =
              longFormSection.sections[0].long_form_blocks;

            return (
              <React.Fragment key={longFormSection.id}>
                <h3 onClick={this.openOtpModal}>
                  {longFormSection.section_display_name}
                </h3>

                {long_form_blocks.map((long_form_block) => {
                  const inputs = long_form_block.blocks;
                  ++index;
                  const blockClasses = ["shortforms-container"]
                  blockClasses.push(long_form_block.block_class)
                  return (
                    <div
                      className="long-forms-wrapper"
                      key={long_form_block.id}
                    >
                      <h5>
                        <b>{`${index}. `}</b> {long_form_block.block_label}
                      </h5>

                      <div className={blockClasses.join(" ")}>
                        {inputs.map((component) => {
                          return (
                            <React.Fragment key={component.id}>
                              {generateInputs(component, this.handleChange,
                                this.checkInputValidity, this.handleInputDropdownSelection,
                                lf, null)}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
          {this.state.submissionError ? <p className="form-invalid-text">{this.state.submissionError}</p> : null}
          <div className="long-form-submit">
            <button type="submit" id="long-submit" disabled={this.state.submitButtonDisabled}>
              Submit Application
            </button>
          </div>
        </form>

        {this.state.openOtpModal ? (
          <Modal openModal={this.state.openOtpModal} closeOtpModal={this.closeOtpModal}>
            <button onClick={this.closeOtpModal} className="close-btn">Close</button>
            <form className="otp-modal-form short-forms-wrapper" onSubmit={this.onSubmitOtp} noValidate>
              <div className="mobile-otp">
                <div className="lets-find-content otp-card_custom">
                  <h2>
                    Verify your mobile
                    <br />
                    number
                  </h2>
                  <img
                    className="green-underline"
                    src="/assets/images/credit-card-flow/green-underline.png"
                  />
                  <div className="otp-wrapper login-options">
                    <div className="form__group field">
                      <Otp removeSubmissionErrorMsg={this.removeSubmissionErrorMsg} />
                      <label className="form__label" htmlFor="phone">
                        One time password
                      </label>
                    </div>
                    <div className="cstm-opt-txt">
                      <span>Haven’t received the OTP yet?</span>
                      <span
                        className="resend_otp"
                        onClick={() => getOtp(this.state.mobileNo)}
                      >
                        Resend
                      </span>
                    </div>
                  </div>
                </div>
                {this.state.submissionError ? <p className="form-invalid-text">{this.state.submissionError}</p> : null}
                <button type="submit">Submit OTP</button>
              </div>
            </form>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default withRouter(LongForm)
