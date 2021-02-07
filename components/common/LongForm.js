import Modal from "../../components/Modal/Modal"
import Otp from "../Otp/Otp"
import { withRouter } from "next/router"
import { uniq, debounce } from "lodash"
import { generateInputs } from "../../utils/inputGenerator"
import { getDropdownList } from "../../services/formService"
import { generateLead, sendNotification, submitOtp, getOtp } from "../../services/formService"
import { setPrimaryPath, setLeadId, getLeadId, setLeadBank } from "../../utils/localAccess"
import { getFormattedCurrency, getWholeNumberFromCurrency } from "../../utils/formattedCurrency"
import {
  textTypeInputs,
  handleChangeInputs,
  updateInputsValidity,
  updateDropdownList,
  updateSelectionFromDropdown,
  resetDropdowns,
  submitDocument,
} from "../../utils/formHandle"

class LongForm extends React.Component {

  state = {
    longFormSections: [],
    submitButtonDisabled: true,
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
    submissionError: ''
  }

  getBankData = async () => {
    if (!this.props.productData) {
      return null
    }
    const productData = this.props.productData
    const { bank_id: bankId, bank_name: bankName } = productData.bank
    const leadBank = { bankId, bankName }
    return leadBank
  }

  async componentDidMount() {
    const primaryPath = this.props.primaryPath
    const leadBank = await this.getBankData()
    const { long_form_version_2, always_ask_for_otp } = this.props.data
    const longFormSections = long_form_version_2.long_form[0].long_form_sections;
    const formData = JSON.parse(localStorage.getItem("formData"));
    let sfData = null;
    let noOfMandatoryInputs = 0;
    let leadId = getLeadId();
    let enableCheckboxes = [];

    if (formData && formData[primaryPath]) {
      sfData = formData[primaryPath];
    }

    longFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach((long_form_block) => {
        const inputs = long_form_block.blocks;
        inputs.forEach((item) => {
          item.error = false;
          item.verified = false;

          if (item.mandatory) {
            noOfMandatoryInputs++;
          }

          if (item.type === "checkbox") {
            item.checkbox.checkbox_input.forEach((box) => {
              if (box.enable_submit) {
                enableCheckboxes.push(box);
              }
            });
          }

          if (sfData) {
            loop: for (let key in sfData) {
              if (!sfData[key]) {
                continue loop;
              }

              if (
                typeof sfData[key] === "object" &&
                key === item.end_point_name
              ) {
                item.value = sfData[key][item.select_name];
                item.selectedId = sfData[key][item.select_id];
                item.selectedItem = sfData[key];
                item.verified = true;
                item.error = false;
                continue loop;
              }

              if (
                typeof sfData[key] === "string" &&
                key === item.end_point_name
              ) {
                item.value = sfData[key];
                item.verified = true;
                item.error = false;
                if (item.type === "money") {
                  item.value = getFormattedCurrency(sfData[key]);
                }
              }
            }
          }
        });
      });
    });

    this.setState({
      longFormSections,
      noOfMandatoryInputs,
      enableCheckboxes,
      primaryPath,
      leadBank,
      salaryBank: null,
      existingFacilityBank: null,
      leadId,
      submitButtonDisabled: enableCheckboxes.length !== 0,
      askForOtp: always_ask_for_otp,
      formType: 'lf'
    }, () => {
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

        const inputDropdown = handleChangeInputs(inputs, field, this.props.preferredSelectionLists, this.state.leadBank)
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
      const { enableCheckboxes } = this.state;
      let trueEnableCheckboxes = [];
      if (enableCheckboxes.length) {
        enableCheckboxes.forEach((box) => {
          if (box.value) {
            trueEnableCheckboxes.push(true);
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
            if (list && list.length && field && field.value) {
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
    this.updateState(newLongFormSections);
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
    this.updateState(newLongFormSections);
  };

  updateState = (longFormSections) => {
    return new Promise((resolve) => {
      this.setState({ longFormSections }, () => {
        this.handlePercentage();
        resolve(true);
      });
    });
  };

  handlePercentage = () => {
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        inputs.forEach((input) => {
          if (input.mandatory) {
            this.handleVerifiedInputsArray(input);
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
        const index = verifiedInputsArray.indexOf(input.input_id);
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
    let errors = false;
    const newLongFormSections = [...this.state.longFormSections]
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
        if (errorsPresent) {
          errors = true
          this.setState({ errors: true })
        }
      })
    })

    this.updateState(newLongFormSections).then(() => {
      if (!errors) {
        if (this.state.primaryPath !== 'rkpl' && (!this.state.leadId || this.state.askForOtp)) {
          let mobileNo = "";
          const newLongFormSections = [...this.state.longFormSections];
          newLongFormSections.forEach((longFormSection) => {
            const long_form_blocks =
              longFormSection.sections[0].long_form_blocks;
            long_form_blocks.forEach(async (long_form_block) => {
              const inputs = long_form_block.blocks;
              inputs.forEach((inp) => {
                if (inp.end_point_name === "mobile") {
                  mobileNo = inp.value;
                }
              });
            });
          });
          this.setState({ mobileNo })
          getOtp(mobileNo)
          this.setState({ openOtpModal: true })
        } else {
          this.retrieveDataAndSubmit()
        }
      } else {
        this.setState({ submissionError: 'Please correct the fields marked in red' })
      }
    })
  }

  onSubmitOtp = async () => {
    try {
      await submitOtp(this.state.mobileNo);
      this.closeOtpModal()
      this.setState({ submitButtonDisabled: true });
      this.retrieveDataAndSubmit();
    } catch (err) {
      this.setState({ submissionError: err.message })
    }
  }

  removeSubmissionErrorMsg = () => {
    this.setState({ submissionError: '' })
  }

  retrieveDataAndSubmit = () => {
    this.setState({ submitButtonDisabled: true, submissionError: '' })
    let data = {};
    const newLongFormSections = [...this.state.longFormSections]
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks

        inputs.forEach(input => {
          if (input.attachment && input.value && input.value.length) {
            submitDocument(input.end_point_name, input.value)
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

    let { primaryPath, leadBank } = this.state

    generateLead(data, primaryPath, 'lf')
      .then((res) => {
        const leadId = res.data.leadId
        let actionName = this.state.primaryPath === 'rkpl' ? 'RKPL-CC' : 'Short Form Submit'
        sendNotification(leadId, actionName)
        
        
        let primaryPath = this.state.primaryPath
        if (primaryPath === 'rkpl') {
          primaryPath = 'credit-cards'
          setPrimaryPath('credit-cards')
        }  
        if (primaryPath === 'talent-edge-form') {
          primaryPath = 'personal-loans'
          setPrimaryPath('personal-loans')
        }

        setLeadId(leadId)
        setLeadBank(leadBank)
        const pathname = `/thank-you`
        const query = { primaryPath }
        this.props.router.push({ pathname, query }, pathname, { shallow: true })
        this.setState({ submitButtonDisabled: false })
      })
      .catch((err) => {
        this.setState({ submitButtonDisabled: false, submissionError: 'Something went wrong. Please try again.' })
      })
  };

  closeOtpModal = () => {
    this.setState({ openOtpModal: false, submissionError: '' })
  };

  render() {
    let index = 0;
    if (!this.state.longFormSections) {
      return null;
    }
    const { bank, product } = this.props


    return (
      <div className="form-wrapper" id="longForm">
        <form onClick={this.handleClickOnSlideBackground} id='long-form_id' noValidate autoComplete="off">
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
                  const blockClasses = ["shortforms-container"];
                  blockClasses.push(long_form_block.block_class);
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
                                this.state.formType, null)}
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
            <button
              id="long-submit"
              disabled={this.state.submitButtonDisabled}
              type="button"
              onClick={this.onSubmitLongForm}
            >
              Submit Application
            </button>
          </div>
        </form>

        {this.state.openOtpModal ? (
          <Modal openModal={this.state.openOtpModal} closeOtpModal={this.closeOtpModal} >
            <button onClick={this.closeOtpModal} className="close-btn">Close</button>
            <form className="otp-modal-form short-forms-wrapper">
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
                <button type="button" onClick={this.onSubmitOtp}>
                  Submit OTP
                </button>
              </div>
            </form>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default withRouter(LongForm);
