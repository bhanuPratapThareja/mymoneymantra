import Router from 'next/router'
import OnBoardForm from './ShortForm/OnBoardForm/OnBoardForm'
import OtpSlide from './ShortForm/OtpForm/OtpSlide'
import SFSlides from './ShortForm/SFSlides/SFSlides'
import { getOtp, submitOtp } from '../services/formService'
import {
    textTypeInputs,
    getCurrentSlideInputs,
    handleChangeInputs,
    getUserMobileNumber,
    updateInputsValidity,
    incrementSlideId,
    decrementSlideId,
    updateSelectionFromDropdown,
    resetDropdowns,
    loadLetsFindForm,
    letsFindFormToOtpForm,
    goToSlides,
    showSlides,
    loadOtpForm
} from '../Utils/shortFormHandle'

class ShortExtendedForm extends React.Component {
    otpInterval = null;
    state = {
        slideIndex: 0,
        currentSlide: 'onboard',
        slides: [],
        defaultOtpTime: 10,
        otpTimeLeft: 10,
        errorMsgs: {
            mandatory: 'Required Field',
            email: 'Email is not Valid',
            mobile: 'Invalid Mobile No',
            pancard: 'Please enter a valid PAN number',
            dropdown: 'Invalid selection'
        }
    }

    setInputsInState = (inputsArray, slideId, heading) => {
        let formInputs = []
        let slides = [...this.state.slides]
        inputsArray.forEach(item => {
            item.error = false
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
            if(this.otpInterval) {
                clearInterval(this.otpInterval)
            }
            loadLetsFindForm()
        })
    }
    
    decrementOtpTime = () => {
        this.setState({ otpTimeLeft: this.state.defaultOtpTime }, () => {
            this.otpInterval = setInterval(() => {
                this.setState({ otpTimeLeft: --this.state.otpTimeLeft })
                if (this.state.otpTimeLeft == 0) {
                    if(this.otpInterval) {
                        clearInterval(this.otpInterval)
                    }
                }
            }, 1000)
        })
    }


    onClickLetsGo = async () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
        this.setState({ ...this.state, slides: newSlides }, async () => {
            if (!errorsPresent) {
                try {
                    const mobileNo = getUserMobileNumber(this.state.slides[0])
                    this.setState({ letsGoButtonDisabled: true, mobileNo })
                    // const mobileNo = ''
                    letsFindFormToOtpForm()
                    this.decrementOtpTime()
                    await getOtp(mobileNo)
                    this.setState({ letsGoButtonDisabled: false })
                } catch (err) {
                    this.setState({ letsGoButtonDisabled: false })
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
            loadOtpForm()
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
                    this.setState({ slideIndex: this.state.slideIndex + 1, currentSlide: newSlideId }, () => {
                        const submitForm = showSlides(n, this.state.slideIndex)
                        if (submitForm) {
                            this.onSubmitShortForm()
                        }
                    })
                }
            })
        } else {
            const newSlideId = decrementSlideId(this.state.currentSlide)
            this.setState({ slideIndex: this.state.slideIndex - 1, currentSlide: newSlideId }, () => {
                showSlides(n, this.state.slideIndex)
            })
        }

    }

    onSubmitShortForm = () => {
        Router.push(`${this.props.path}/loan-listing`)
    }

    handleInputDropdownChange = (name, type, item) => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateSelectionFromDropdown(inputs, name, item)
        this.setState({ ...this.state, slides: newSlides })
    }

    handleChange = async field => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const { newstate: { letsGoButtonDisabled } } = await handleChangeInputs(inputs, field, this.state.letsGoButtonDisabled)
        this.setState({ ...this.state, slides: newSlides, letsGoButtonDisabled }, () => {
            if (textTypeInputs.includes(field.type) || field.type === 'radio') {
                this.checkInputValidity(field)
            }
        })

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

    render() {
        return (
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
                        <div className="lets-find-stepper-wrapper" >
                            <OtpSlide
                                onGoToLetFindForm={this.onGoToLetFindForm}
                                onSubmitOtp={this.onSubmitOtp}
                                decrementOtpTime={this.decrementOtpTime}
                                otpTimeLeft={this.state.otpTimeLeft}
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
                            handleInputDropdownChange={this.handleInputDropdownChange}
                            handleClickOnSlideBackground={this.handleClickOnSlideBackground}
                            onGoToPrevious={this.onGoToPrevious}
                            onSubmitSlide={this.onSubmitSlide}
                        />
                    </div>
                </div>
            </section>
        )
    }

}

export default ShortExtendedForm