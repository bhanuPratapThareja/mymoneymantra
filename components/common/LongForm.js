import Modal from "../../components/Modal/Modal";
import Otp from "../Otp/Otp";
import { withRouter } from "next/router";
import { uniq, debounce } from "lodash";
import { generateInputs } from "../../utils/inputGenerator";
import { getDropdownList } from "../../services/formService";
import {
  generateLead,
  sendNotification,
  submitOtp,
  getOtp,
} from "../../services/formService";
import { setLeadId } from "../../utils/localAccess";
import { getLeadId } from "../../utils/localAccess";
import {
  getFormattedCurrency,
  getWholeNumberFromCurrency,
} from "../../utils/formattedCurrency";
import {
  textTypeInputs,
  handleChangeInputs,
  updateInputsValidity,
  updateDropdownList,
  updateSelectionFromDropdown,
  resetDropdowns,
} from "../../utils/formHandle";

class LongForm extends React.Component {
  state = {
    longFormSections: [],
    submitButtonDisabled: true,
    errorMsgs: {
      mandatory: "Required Field",
    },
    noOfMandatoryInputs: 0,
    verifiedInputs: [],
    leadId: "",
    enableCheckboxes: [],
    openOtpModal: false,
  };

  componentDidMount() {
    const { primaryPath } = this.props.router.query;
    const bankName = this.props.bank.bank_name;
    const { long_form_version_2, always_ask_for_otp, invalid_form_error_message } = this.props.data
 
    const longFormSections = long_form_version_2.long_form[0].long_form_sections;
    const formData = JSON.parse(localStorage.getItem("formData"));
    let sfData = null;
    let noOfMandatoryInputs = 0;
    let leadId = getLeadId(primaryPath);
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

    this.setState(
      {
        longFormSections,
        noOfMandatoryInputs,
        enableCheckboxes,
        primaryPath,
        bankName,
        leadId,
        invalidFormError: invalid_form_error_message,
        askForOtp: always_ask_for_otp,
      },
      () => {
        this.handlePercentage();
      }
    );
  }

  handleChange = (field) => {
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;

        const inputDropdown = handleChangeInputs(inputs, field);
        if (inputDropdown) {
          const { listType, masterName, inp, prefferedList } = inputDropdown
          if (prefferedList) {
            inp.listType = listType
            inp.list = prefferedList
            inp.error = false
            setTimeout(() => {
              this.handleInputDropdownChange(listType, prefferedList, inp.input_id, field.focusDropdown)
            }, 300)
          } else {
            if (!field.focusDropdown) {
              const debouncedSearch = debounce(() => getDropdownList(listType, inp.value, masterName)
                .then(list => {
                  inp.listType = listType
                  inp.list = list
                  this.handleInputDropdownChange(listType, list, inp.input_id)
                }), 500)
              debouncedSearch(listType, inp.value, masterName)
            }
          }
        }
      });
    });
    this.setState({ longFormSections: newLongFormSections, errors: false }, () => {
      if (textTypeInputs.includes(field.type) || field.type === "radio") {
<<<<<<< HEAD
        this.checkInputValidity(field);
=======
        this.checkInputValidity(field, field.focusDropdown)
>>>>>>> origin/master
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
  };

  handleInputDropdownChange = (listType, list, input_id) => {
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        updateDropdownList(inputs, listType, list, input_id);
      });
    });
    this.updateState(newLongFormSections);
  };

  handleInputDropdownSelection = (name, type, item) => {
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        updateSelectionFromDropdown(inputs, name, item);
      });
    });
    this.updateState(newLongFormSections);
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
  };

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
    const verifiedInputsArray = this.state.verifiedInputs;
    if (input.verified) {
      verifiedInputsArray.push(input.input_id);
    } else {
      if (verifiedInputsArray.includes(input.input_id)) {
        const index = verifiedInputsArray.indexOf(input.input_id);
        verifiedInputsArray.splice(index, 1);
      }
    }
    const uniqueVerifiedInputsArray = uniq(verifiedInputsArray);
    this.setState({ verifiedInputs: uniqueVerifiedInputsArray }, () => {
      const percentage =
        (this.state.verifiedInputs.length / this.state.noOfMandatoryInputs) *
        100;
      const event = new CustomEvent("percentageCalulated", {
        detail: { percentage },
      });
      document.dispatchEvent(event);
    });
  };

  onSubmitLongForm = () => {
    let errors = false;
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;
        const errorsPresent = updateInputsValidity(
          inputs,
          null,
          this.state.errorMsgs
        );
        if (errorsPresent) {
          errors = true
          this.setState({ errors: true })
        }
      });
    });

    this.updateState(newLongFormSections).then(() => {
      if (!errors) {
        if (!this.state.leadId || this.state.askForOtp) {
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
          this.setState({ mobileNo });
          getOtp(mobileNo);
          this.setState({ openOtpModal: true });
        } else {
          this.retrieveDataAndSubmit();
        }
       }
    });
  };

  onSubmitOtp = async () => {
    try {
      await submitOtp(this.state.mobileNo);
      this.closeOtpModal();
      this.setState({ submitButtonDisabled: true });
      this.retrieveDataAndSubmit();
    } catch (err) {
      alert(err.message);
    }
  };

  retrieveDataAndSubmit = () => {
    let data = {};
    const newLongFormSections = [...this.state.longFormSections];
    newLongFormSections.forEach((longFormSection) => {
      const long_form_blocks = longFormSection.sections[0].long_form_blocks;
      long_form_blocks.forEach(async (long_form_block) => {
        const inputs = long_form_block.blocks;

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
      });
    });

    console.log("data", data);

    const { primaryPath, bankName, leadId } = this.state;

    generateLead(data, primaryPath)
      .then((res) => {
        if (!leadId) {
          const leadIdSendNotification = res.data.response.payload.leadId;
          sendNotification(leadIdSendNotification);
        }
        setLeadId(primaryPath, res.data.response.payload.leadId);
        const pathname = `/${primaryPath}/thank-you`;
        const query = { bankName };
        this.props.router.push({ pathname, query });
      })
      .catch((err) => {
        this.setState({ submitButtonDisabled: false });
      });
  };

  openOtpModal = () => {
    this.setState({ openOtpModal: true });
  };

  closeOtpModal = () => {
    this.setState({ openOtpModal: false });
  };

  render() {
    let index = 0;
    if (!this.state.longFormSections) {
      return null;
    }

    return (
      <div className="form-wrapper" id="longForm">
        <form onClick={this.handleClickOnSlideBackground}>
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
                              {generateInputs(
                                component,
                                this.handleChange,
                                this.checkInputValidity,
                                null,
                                this.handleInputDropdownSelection
                              )}
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
          {this.state.errors ?<p className="form-invalid-text">{this.state.invalidFormError}</p> : null}
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
          <Modal
            openModal={this.state.openOtpModal}
            closeOtpModal={this.closeOtpModal}
          >
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
                      <Otp />
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
