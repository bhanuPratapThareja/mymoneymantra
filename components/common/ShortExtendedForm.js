import OnBoardForm from '../ShortForm/OnBoardForm/OnBoardForm'
import OtpSlide from '../ShortForm/OtpForm/OtpSlide'
import SFSlides from '../ShortForm/SFSlides/SFSlides'
import { debounce } from 'lodash'
import { withRouter } from 'next/router'
import { getDropdownList } from '../../services/formService'
import { getOtp, submitOtp, sendNotification } from '../../services/formService'
import { getDevice } from '../../utils/getDevice'
import { setLeadId } from '../../utils/localAccess'
import {
    textTypeInputs,
    getCurrentSlideInputs,
    handleChangeInputs,
    getUserMobileNumber,
    updateInputsValidity,
    incrementSlideId,
    decrementSlideId,
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
        enableCheckboxes: []
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
            const letsFindContaiiner = document.getElementsByClassName('lets-find-container')[0]
            const uspCardsContainer = document.getElementsByClassName('banner-features-container')[0]
            if (letsFindContaiiner) {
                letsFindContaiiner.classList.add('lets-find-container-top')
                if (uspCardsContainer) {
                    uspCardsContainer.classList.add('banner-features-container-switch')
                }
            }
        }

        let formInputs = []
        let enableCheckboxes = []
        let slides = [...this.state.slides]
        inputsArray.forEach(item => {
            item.error = false
            item.verified = false
            if (item.type === 'input_with_dropdown') {
                item.list = []
            }
            if (item.type === 'checkbox') {
                item.checkbox.checkbox_input.forEach(box => {
                    if (box.enable_submit) {
                        enableCheckboxes.push(box)
                    }
                })
            }
            formInputs.push(item)
        })

        let upDatedSlides = [...slides, { slideId, inputs: formInputs, heading, slideClass }]
        this.setState({ ...this.state, slides: [...upDatedSlides], enableCheckboxes: [...this.state.enableCheckboxes, ...enableCheckboxes] })
    }

    componentDidMount() {
        const primaryPath = this.props.router.query.primaryPath
        this.setState({ primaryPath })
        let slideNo = 1
        const { side_form, form_slide } = this.props.data.onboard_short_form
        this.setInputsInState(side_form, 'onboard')
        form_slide.forEach(slide => {
            setTimeout(() => {
                let slideId = `sf-${slideNo}`
                const fields = slide.onboard_form_slide.fields
                const heading = slide.onboard_form_slide.heading
                const slideClass = slide.onboard_form_slide.slide_class
                this.setInputsInState(fields, slideId, heading, slideClass)
                slideNo++
            }, 500)
        })
    }

    onShowTnc = on_click_anchor => {
        console.log('show TNC!: ', on_click_anchor)
    }

    onGoToLetFindForm = () => {
        this.setState({ slideIndex: 0, currentSlide: 'onboard' }, () => {
            this.scrollToTopOfSlide()
            setTimeout(() => {
                loadLetsFindForm()
            }, 500);
        })
    }

    onClickLetsGo = async () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
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

    onSubmitOtp = async () => {
        try {
            await submitOtp(this.state.mobileNo)
            this.onSubmitLetGoSlide()
        } catch (err) {
            this.setState({ submissionError: err.message })
        } finally {
            this.scrollToTopOfSlide()
        }
    }

    onSubmitLetGoSlide = async () => {
        try {
            const res = await this.onSubmitShortForm()
            const leadId = res.data.leadId
            setLeadId(leadId)
            sendNotification(leadId)
            this.setState({ currentSlide: 'sf-1', slideIndex: 1, slideButtonText: 'Next' }, () => {
                goToSlides()
            })
        } catch (err) {
            this.setState({ submissionError: 'Something Went wrong. Please try again.' })
        }
    }

    removeSubmissionErrorMsg = () => {
        this.setState({ submissionError: '' })
    }

    onSubmitSlide = () => {
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
            const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
            this.setState({ ...this.state, slides: newSlides }, async () => {
                if (!errorsPresent) {
                    this.onSubmitShortForm()
                    const newSlideId = incrementSlideId(this.state.currentSlide)
                    if (this.state.slideIndex < this.state.slides.length - 1) {
                        this.setState({ slideIndex: this.state.slideIndex + 1, currentSlide: newSlideId }, () => {
                            if (this.state.slideIndex === this.state.slides.length - 1) {
                                this.setState({ slideButtonText: 'Submit and view offers' })
                            }
                            showSlides(n, this.state.slideIndex)
                        })
                    } else {
                        this.onSubmitShortForm()
                        this.props.router.push(`/${this.state.primaryPath}/listings`)
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
            submitShortForm([...this.state.slides], this.state.currentSlide, this.state.primaryPath, 'sf')
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
        const inputDropdown = await handleChangeInputs(inputs, field, this.props.preferredSelectionLists)

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
            if(input.input_id === input_id) {
                if(list && list.length && field && field.value){
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
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateInputsValidity(inputs, field, this.state.errorMsgs)
        this.setState({ ...this.state, slides: newSlides }, () => {
            if (field.type === 'radio') {
                let mandatoryInputsHaveValues = true
                inputs.forEach(input => {
                    if (input.mandatory && !input.value) {
                        mandatoryInputsHaveValues = false
                    }
                })
                if (mandatoryInputsHaveValues) {
                    setTimeout(() => {
                        this.plusSlides(1)
                    }, 125)
                }
            }
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
            <section data-aos="fade-up" className="container lets-find-container aos-init">

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
                            checkboxAnchorClick={this.onShowTnc}
                        />
                    </div>
                </div>
            </section>
        )
    }

}

export default withRouter(ShortExtendedForm)