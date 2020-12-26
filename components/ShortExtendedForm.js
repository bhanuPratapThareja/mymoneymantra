import Router from 'next/router'
import { debounce } from 'lodash'
import OnBoardForm from './ShortForm/OnBoardForm/OnBoardForm'
import OtpSlide from './ShortForm/OtpForm/OtpSlide'
import SFSlides from './ShortForm/SFSlides/SFSlides'
import { getDropdownList } from '../services/formService'
import { getOtp, submitOtp } from '../services/formService'
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
} from '../Utils/shortFormHandle'

class ShortExtendedForm extends React.Component {
    otpInterval = null;
    state = {
        slideIndex: 0,
        currentSlide: 'onboard',
        letsGoButtonDisabled: true,
        slides: [],
        showOtpForm: false,
        defaultOtpTime: 10,
        otpTimeLeft: 0,
        errorMsgs: {
            mandatory: 'Required Field',
            email: 'Email is not valid',
            mobile: 'Invalid Mobile No',
            pancard: 'Please enter a valid PAN number',
            dropdown: 'Invalid Selection'
        }
    }

    decrementOtpTime = () => {
        // this.setState({ otpTimeLeft: this.state.defaultOtpTime }, () => {
        //     this.otpInterval = setInterval(() => {
        //         this.setState({ otpTimeLeft: --this.state.otpTimeLeft })
        //         if (this.state.otpTimeLeft == 0 && this.otpInterval) {
        //             clearInterval(this.otpInterval)
        //         }
        //     }, 1000)
        // })
    }

    setInputsInState = (inputsArray, slideId, heading) => {
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
        let upDatedSlides = [...slides, { slideId, inputs: formInputs, heading }]
        this.setState({ ...this.state, slides: [...upDatedSlides] })
    }

    componentDidMount() {
        let slideNo = 1
        const { side_form, form_slide } = this.props.data.onboard_short_form
        this.setInputsInState(side_form, 'onboard')
        form_slide.forEach(slide => {
            setTimeout(() => {
                let slideId = `sf-${slideNo}`
                const fields = slide.onboard_form_slide.fields
                const heading = slide.onboard_form_slide.heading
                this.setInputsInState(fields, slideId, heading)
                slideNo++
            }, 500)
        })
    }

    onGoToLetFindForm = () => {
        this.setState({ slideIndex: 0, currentSlide: 'onboard' }, () => {
            loadLetsFindForm()
            if (this.otpInterval) {
                clearInterval(this.otpInterval)
            }
            setTimeout(() => {
                this.setState({ showOtpForm: false })
            }, 1000);
        })
    }

    onClickLetsGo = async () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
        this.setState({ ...this.state, slides: newSlides }, async () => {
            if (!errorsPresent) {
                try {
                    const mobileNo = getUserMobileNumber(this.state.slides[0])
                    this.setState({ mobileNo, showOtpForm: true })
                    getOtp(mobileNo)
                    letsFindFormToOtpForm()
                    setTimeout(() => {
                        this.decrementOtpTime()
                    }, 2000)
                } catch (err) {
                    alert(err.message)
                }
            }
        })
    }

    onSubmitOtp = async () => {
        try {
            await submitOtp(this.state.mobileNo)
            this.setState({ currentSlide: 'sf-1', slideIndex: 1 }, () => {
                goToSlides()
            })
        } catch (err) {
            alert(err.message)
        }
    }

    onSubmitSlide = () => {
        this.plusSlides(1)
    }

    onGoToPrevious = () => {
        if (this.state.slideIndex === 1) {
            this.setState({ showOtpForm: true }, () => {
                loadOtpForm()
            })
            return
        }
        this.plusSlides(-1)
    }

    plusSlides = (n) => {
        if (n >= 1) {
            const { newSlides, inputs } = getCurrentSlideInputs(this.state)
            const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
            this.setState({ ...this.state, slides: newSlides }, () => {
                if (!errorsPresent) {
                    const newSlideId = incrementSlideId(this.state.currentSlide)
                    if (!(this.state.slideIndex == this.state.slides.length - 1)) {
                        this.setState({ slideIndex: this.state.slideIndex + 1, currentSlide: newSlideId }, () => {
                            showSlides(n, this.state.slideIndex)
                        })
                    }
                }
            })
        } else {
            const newSlideId = decrementSlideId(this.state.currentSlide)
            this.setState({ slideIndex: this.state.slideIndex - 1, currentSlide: newSlideId }, () => {
                showSlides(n, this.state.slideIndex)
            })
        }

    }

    handleChange = async field => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const { newstate: { letsGoButtonDisabled, inputDropdown } } = await handleChangeInputs(inputs, field, this.state.letsGoButtonDisabled)
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
        this.setState({ ...this.state, slides: newSlides, letsGoButtonDisabled }, () => {
            if (textTypeInputs.includes(field.type) || field.type === 'radio') {
                this.checkInputValidity(field)
            }
        })


    }

    handleInputDropdownChange = (listType, list, input_id) => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateDropdownList(inputs, listType, list, input_id)
        this.setState({ ...this.state, slides: newSlides })
    }

    handleInputDropdownSelection = (name, type, item) => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateSelectionFromDropdown(inputs, name, item)
        this.setState({ ...this.state, slides: newSlides })
    }

    checkInputValidity = field => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateInputsValidity(inputs, field, this.state.errorMsgs)
        this.setState({ ...this.state, slides: newSlides })
    }

    handleClickOnSlideBackground = () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        resetDropdowns(inputs)
        this.setState({ slides: newSlides })
    }

    onSubmitShortForm = () => {
        submitShortForm([...this.state.slides], this.state.currentSlide)
        if (this.state.slideIndex == this.state.slides.length - 1) {
            const path = Router.query.path[0]
            Router.push(`${path}/loan-listing`)
        }
    }

    render() {
        return (
            <div className="combined-wrapper">
                <section data-aos="fade-up" className="container lets-find-container aos-init">

                    <div className="mobile-background"></div>
                    <div className="mobile-content">
                        <h1>Credit cards for<br />all your needs.</h1>
                    </div>

                    <div className="all-form-wrapper">
                        <OnBoardForm
                            data={this.props.data.onboard_short_form}
                            slides={this.state.slides}
                            handleChange={this.handleChange}
                            checkInputValidity={this.checkInputValidity}
                            onClickLetsGo={this.onClickLetsGo}
                            letsGoButtonDisabled={this.state.letsGoButtonDisabled}
                        />

                        <div className="lets-find-forms-container sms-otp" id="sms-otp">
                            <div className="lets-find-stepper-wrapper">
                                <OtpSlide
                                    onGoToLetFindForm={this.onGoToLetFindForm}
                                    onSubmitOtp={this.onSubmitOtp}
                                    decrementOtpTime={this.decrementOtpTime}
                                    otpTimeLeft={this.state.otpTimeLeft}
                                    mobileNo={this.state.mobileNo}
                                    disableOtpSubmitButton={this.state.disableOtpSubmitButton}
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
                                handleInputDropdownChange={this.handleInputDropdownChange}
                                handleClickOnSlideBackground={this.handleClickOnSlideBackground}
                                onGoToPrevious={this.onGoToPrevious}
                                onSubmitSlide={this.onSubmitSlide}
                                onSubmitShortForm={this.onSubmitShortForm}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default ShortExtendedForm