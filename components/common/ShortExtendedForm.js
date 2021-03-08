import OnBoardForm from '../ShortForm/OnBoardForm/OnBoardForm'
import OtpSlide from '../ShortForm/OtpForm/OtpSlide'
import SFSlides from '../ShortForm/SFSlides/SFSlides'
import Modal from '../../components/Modal/Modal'
import TermsAndConditions from '../Tnc'
import ExperianTnc from '../ExperianTnc'
import { debounce } from 'lodash'
import { withRouter } from 'next/router'
import { getDropdownList } from '../../services/formService'
import { getOtp, submitOtp, sendNotification } from '../../services/formService'
import { getDevice } from '../../utils/getDevice'
import { setLeadId } from '../../utils/sessionAccess'
import { sf } from '../../utils/types'
import {
    textTypeInputs,
    updateFormInputs,
    getCurrentSlideInputs,
    handleChangeInputs,
    getUserMobileNumber,
    updateInputsValidity,
    incrementSlideId,
    decrementSlideId,
    setRadioBreakpoints,
    updateDropdownList,
    updateSelectionFromDropdown,
    resetDropdowns,
    loadLetsFindForm,
    letsFindFormToOtpForm,
    goToSlides,
    showSlides,
    loadOtpForm,
    submitShortForm
} from '../../utils/formHandle'
import { setItem,keys } from '../../utils/storage'

class ShortExtendedForm extends React.Component {
    otpInterval = null;
    state = {
        slideIndex: 0,
        currentSlide: 'onboard',
        submitButtonDisabled: true,
        submissionError: '',
        slides: [],
        defaultOtpTime: 10,
        otpTimeLeft: 0,
        errorMsgs: {
            mandatory: 'Required Field'
        },
        slideButtonText: 'Next',
        enableCheckboxes: [],
        showTncModal: false,
        showExperianTncModal: false
    }

    scrollToTopOfSlide = () => {
        const shortFormEl = document.getElementsByClassName('lets-find-container')
        if (shortFormEl.length) {
            if (getDevice() === 'desktop') {
                const shortFormElOffset = shortFormEl[0].offsetTop - 100
                window.scrollTo({ top: shortFormElOffset, behavior: 'smooth' })
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

    setInputsInState = (inputsArray, slideId, heading, slideClass) => {
        if (getDevice() !== 'desktop') {
            const letsFindContainer = document.getElementsByClassName('lets-find-container')[0]
            const uspCardsContainer = document.getElementsByClassName('banner-features-container')[0]
            if (letsFindContainer) {
                letsFindContainer.classList.add('lets-find-container-top')
                if (uspCardsContainer) {
                    uspCardsContainer.classList.add('banner-features-container-switch')
                }
            }
        }

        let formInputs = []
        let slides = [...this.state.slides]
        inputsArray.forEach(item => {
            item.error = false
            item.verified = false
            if (item.type === 'input_with_dropdown') {
                item.list = []
            }
            formInputs.push(item)
        })

        let upDatedSlides = [...slides, { slideId, inputs: formInputs, heading, slideClass }]
        this.setState({
            ...this.state, slides: [...upDatedSlides],
        }, () => {
            let enableCheckboxes = []
            this.state.slides.forEach(slide => {
                const inputs = slide.inputs
                const { updatedEnableCheckboxes } = updateFormInputs(inputs)
                enableCheckboxes = [...enableCheckboxes, ...updatedEnableCheckboxes]
            })
            this.setState({ ...this.state, enableCheckboxes }, () => {
                this.setState({ backUpSlides: JSON.parse(JSON.stringify(this.state.slides)) })
                if (this.props.formRedirection === sf) {
                    this.props.goToShortForm()
                }
            })
        })
    }

    componentDidMount() {
        let slideNo = 1
        const { side_form, form_slide } = this.props.data.onboard_short_form
        this.setInputsInState(side_form, 'onboard')
        form_slide.forEach(slide => {
            setTimeout(() => {
                let slideId = `${sf}-${slideNo}`
                const fields = slide.onboard_form_slide.fields
                const heading = slide.onboard_form_slide.heading
                const slideClass = slide.onboard_form_slide.slide_class
                this.setInputsInState(fields, slideId, heading, slideClass)
                slideNo++
            }, 500)
        })
    }

    onShowTncModal = on_click_anchor => {
        if (on_click_anchor === 'showTnc') {
            this.setState({ showTncModal: true})
        }
    }
   
    closShowTncModal = () => {
        this.setState({ showTncModal: false })
    }

    onShowExperianTncModal = on_click_anchor => {
        if (on_click_anchor === 'showExperiantnc') {
            this.setState({  showExperianTncModal: true })
        }
       
    }

    closeExperianTncModal = () => {
        this.setState({  showExperianTncModal: false })
    }

    onGoToLetFindForm = () => {
        this.setState({ slideIndex: 0, currentSlide: 'onboard', submitButtonDisabled: false }, () => {
            this.scrollToTopOfSlide()
            setTimeout(() => {
                loadLetsFindForm()
            }, 500);
        })
    }

    onClickLetsGo = async e => {
        e.preventDefault()
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const { errorsPresent } = updateInputsValidity(inputs, null, this.state.errorMsgs)
        this.setState({ ...this.state, slides: newSlides }, async () => {
            this.scrollToTopOfSlide()
            if (!errorsPresent) {
                const mobileNo = getUserMobileNumber(this.state.slides[0])
                this.setState({ mobileNo, slideButtonText: 'Verify' })
                getOtp(mobileNo)
                setTimeout(() => {
                    letsFindFormToOtpForm()
                }, 250)            
            }
          
        })
    }

    onSubmitOtp = async e => {
        e.preventDefault()
        this.setState({ submitButtonDisabled: true })
        const inputs = document.getElementsByClassName('input_otp')
        for (let inp of inputs) {
            inp.blur()
        }
        setTimeout(async () => {
            try {
                await submitOtp(this.state.mobileNo)
                this.onSubmitLetGoSlide()
            } catch (err) {
                this.setState({ submissionError: err.message, submitButtonDisabled: false })
            } finally {
                this.scrollToTopOfSlide()
            }
        }, 500)
    }

    onSubmitLetGoSlide = async () => {
        try {
            const res = await this.onSubmitShortForm();
            let cid = res.data.customerId;
            setItem(keys.customerId,cid)
            const leadId = res.data.leadId
            setLeadId(leadId)
            sendNotification(leadId)
            
            this.setState({ currentSlide: `${sf}-1`, slideIndex: 1, slideButtonText: 'Next', submitButtonDisabled: false }, () => {
                goToSlides()
            })
        } catch (err) {
            this.setState({ submissionError: 'Something Went wrong. Please try again.', submitButtonDisabled: false })
        }
    }

    removeSubmissionErrorMsg = () => {
        this.setState({ submissionError: '' })
    }

    onSubmitSlide = e => {
        e.preventDefault()
        this.plusSlides(1)
    }

    onGoToPrevious = () => {
        if (this.state.slideIndex === 1) {
            this.scrollToTopOfSlide()
            setTimeout(() => {
                loadOtpForm()
                this.setState({ slideButtonText: 'Verify' })
            }, 500)
            return
        }
        this.plusSlides(-1)
    }

    plusSlides = (n) => {
        if (n >= 1) {
            const { newSlides, inputs } = getCurrentSlideInputs(this.state)
            const { errorsPresent } = updateInputsValidity(inputs, null, this.state.errorMsgs, this.state.propertyValue)
            this.setState({ ...this.state, slides: newSlides }, async () => {
                if (!errorsPresent) {
                    const newSlideId = incrementSlideId(this.state.currentSlide)
                    if (this.state.slideIndex < this.state.slides.length - 1) {
                        this.onSubmitShortForm()
                        this.setState({ slideIndex: this.state.slideIndex + 1, currentSlide: newSlideId }, () => {
                            if (this.state.slideIndex === this.state.slides.length - 1) {
                                this.setState({ slideButtonText: 'Submit and view offers' })
                            }
                            showSlides(n, this.state.slideIndex)
                        })
                    } else {
                        this.setState({ submitButtonDisabled: true })
                        this.onSubmitShortForm()
                            .then(() => {
                                if(this.state.redirectionUrl) {
                                    this.props.router.push(this.state.redirectionUrl)
                                } else if (this.props.formRedirection === sf) {
                                    this.props.router.push(`/thank-you`)
                                } else {
                                    this.props.router.push(`/${this.props.primaryPath}/listings`)
                                }
                            })
                            .catch(() => {
                                this.setState({ submissionError: 'Something went wrong. Please try again.', submitButtonDisabled: false })
                            })
                    }
                }
            })
        } else {
            const newSlideId = decrementSlideId(this.state.currentSlide)
            this.setState({
                slideIndex: this.state.slideIndex - 1,
                currentSlide: newSlideId, slideButtonText: 'Next'
            }, () => {
                showSlides(n, this.state.slideIndex)
            })
        }


        this.scrollToTopOfSlide()
    }

    onSubmitShortForm = () => {
        return new Promise((resolve, reject) => {
        
            submitShortForm([...this.state.slides], this.state.currentSlide, this.props.primaryPath, sf, this.props.productType)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    handleChange = async field => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const { inputDropdown, propertyValue } = await handleChangeInputs(inputs, field, this.props.preferredSelectionLists, null)
        if (propertyValue) {
            this.setState({ propertyValue })
        }
        if (inputDropdown && field.type === 'input_with_dropdown') {
            const { listType, masterName, inp, prefferedList } = inputDropdown
            if (prefferedList) {
                inp.listType = listType
                inp.list = prefferedList
                inp.error = false
                setTimeout(() => {
                    this.handleInputDropdownChange(listType, prefferedList, inp.input_id)
                }, 500);
            } else {
                if (!field.focusDropdown && listType && listType !== 'null') {
                    const debouncedSearch = debounce(() => getDropdownList(listType, inp.value, masterName, field)
                        .then(list => {
                            inp.listType = listType
                            inp.list = list
                            this.handleInputDropdownChange(listType, list, inp.input_id, field)
                        }), 500)
                    debouncedSearch(listType, inp.value, masterName)
                }
            }
        }

        this.setState({ ...this.state, slides: newSlides }, () => {
            if (textTypeInputs.includes(field.type) || field.type === "radio" || field.type === 'input_with_dropdown' || field.type === 'money') {
                this.checkInputValidity(field)
            }
            const { enableCheckboxes } = this.state
            let trueEnableCheckboxes = []
            if (enableCheckboxes.length) {
                enableCheckboxes.forEach(box => {
                    if (box.value) {
                        trueEnableCheckboxes.push(true)
                    }
                })
            }
            if (enableCheckboxes.length === trueEnableCheckboxes.length) {
                this.setState({ submitButtonDisabled: false })
            } else {
                this.setState({ submitButtonDisabled: true })
            }


        })
    }

    handleInputDropdownChange = (listType, list, input_id, field) => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
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
        this.setState({ ...this.state, slides: newSlides })
    }

    handleInputDropdownSelection = (input_id, item) => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateSelectionFromDropdown(inputs, input_id, item)
        this.setState({ ...this.state, slides: newSlides })
    }

    checkInputValidity = field => {
        const { newSlides, inputs, slideIndex } = getCurrentSlideInputs(this.state)
        updateInputsValidity(inputs, field, this.state.errorMsgs, this.state.propertyValue)
        this.setState({ ...this.state, slides: newSlides }, () => {
            inputs.forEach(input => {
                if(input.type === 'radio' && input.value) {
                    if (input.radio.breakpoints.length) {
                        const breakpoints = input.radio.breakpoints
                        if (breakpoints.length) {
                            for (let i = 0; i < breakpoints.length; i++) {
                                if (breakpoints[i].breakpoint_value !== input.value) {
                                    continue
                                }
                                if (breakpoints[i].breakpoint_value === input.value && breakpoints[i].breakpoint_sequence) {
                                    let { currentSlideId, newSlides, redirectionUrl } = setRadioBreakpoints(slideIndex, breakpoints[i], this.state.slides, this.state.backUpSlides)
                                    this.setState({ ...this.state, slides: newSlides, currentSlide: currentSlideId, slideIndex, redirectionUrl }, () => {
                                        this.plusSlides(1)
                                    })
                                }
                            }
                        }
                    }
                    else if(input.radio.disable_input_with_end_point_name) {
                        if(input.radio.disable_when_value === input.value) {
                            this.plusSlides(1)
                        }
                    }  else {
                        this.plusSlides(1)
                    }
                }
            })
        })
    }

    handleClickOnSlideBackground = () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        resetDropdowns(inputs, this.state.errorMsgs)
        this.setState({ slides: newSlides })
    }

    render() {
        const { onboard_short_form_mobile_view_heading } = this.props.data.onboard_short_form
        return (
            <section data-aos="fade-up" className="container lets-find-container aos-init aos-animate">

                <div className="mobile-background"></div>
                <div className="mobile-content">
                    <div className="cstm-heading" dangerouslySetInnerHTML={{ __html: onboard_short_form_mobile_view_heading }}></div>
                </div>

                <div className="all-form-wrapper">
                    <OnBoardForm
                        data={this.props.data.onboard_short_form}
                        slides={this.state.slides}
                        handleChange={this.handleChange}
                        checkInputValidity={this.checkInputValidity}
                        onClickLetsGo={this.onClickLetsGo}
                        submitButtonDisabled={this.state.submitButtonDisabled}
                        checkboxAnchorClick={this.onShowTncModal}
                        checkboxTextClick={this.onShowExperianTncModal}
                    />

                    <div className="lets-find-forms-container sms-otp" id="sms-otp">
                        <div className="lets-find-stepper-wrapper">
                            <OtpSlide
                                onGoToLetFindForm={this.onGoToLetFindForm}
                                onSubmitOtp={this.onSubmitOtp}
                                otpTimeLeft={this.state.otpTimeLeft}
                                mobileNo={this.state.mobileNo}
                                slideButtonText={this.state.slideButtonText}
                                disableOtpSubmitButton={this.state.disableOtpSubmitButton}
                                submissionError={this.state.submissionError}
                                removeSubmissionErrorMsg={this.removeSubmissionErrorMsg}
                                submitButtonDisabled={this.state.submitButtonDisabled}
                            />
                        </div>
                    </div>

                    <div className="lets-find-forms-container" id="lets-form-slides">
                        <SFSlides
                            slides={this.state.slides.slice(1)}
                            slideIndex={this.state.slideIndex}
                            currentSlide={this.state.currentSlide}
                            handleChange={this.handleChange}
                            checkInputValidity={this.checkInputValidity}
                            handleInputDropdownSelection={this.handleInputDropdownSelection}
                            handleClickOnSlideBackground={this.handleClickOnSlideBackground}
                            onGoToPrevious={this.onGoToPrevious}
                            onSubmitSlide={this.onSubmitSlide}
                            slideButtonText={this.state.slideButtonText}
                            onSubmitShortForm={this.onSubmitShortForm}
                            submissionError={this.state.submissionError}
                            submitButtonDisabled={this.state.submitButtonDisabled}
                        />
                    </div>
                </div>

                {this.state.showTncModal && this.props.tncData ? (
                    <Modal openModal={this.state.showTncModal} closeOtpModal={this.closShowTncModal} className="tnc-modal">
                        <button onClick={this.closShowTncModal} className="close-btn">Close</button>
                        <TermsAndConditions tncData={this.props.tncData} />
                       
                    </Modal>
                ) : null}

                {this.state.showExperianTncModal && this.props.experianTncData ? (
                    <Modal openModal={this.state.showExperianTncModal} closeOtpModal={this.closeExperianTncModal} className="tnc-modal">
                        <button onClick={this.closeExperianTncModal} className="close-btn">Close</button>
                       
                        <ExperianTnc experianTncData={this.props.experianTncData} />
                    </Modal>
                ) : null}

            </section>
        )
    }
}

export default withRouter(ShortExtendedForm)