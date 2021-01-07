import { withRouter } from 'next/router'
import { debounce } from 'lodash'
import OnBoardForm from '../ShortForm/OnBoardForm/OnBoardForm'
import OtpSlide from '../ShortForm/OtpForm/OtpSlide'
import SFSlides from '../ShortForm/SFSlides/SFSlides'
import { getDropdownList } from '../../services/formService'
import { getOtp, submitOtp } from '../../services/formService'
import { getDevice } from '../../utils/getDevice'
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
        letsGoButtonDisabled: true,
        slides: [],
        defaultOtpTime: 10,
        otpTimeLeft: 0,
        errorMsgs: {
            mandatory: 'Required Field'
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
        this.setState({ ...this.state, slides: [...upDatedSlides] })
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

    onGoToLetFindForm = () => {
        this.setState({ slideIndex: 0, currentSlide: 'onboard' }, () => {
            loadLetsFindForm()
            if (this.otpInterval) {
                clearInterval(this.otpInterval)
            }
        })
    }

    onClickLetsGo = async () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const errorsPresent = updateInputsValidity(inputs, null, this.state.errorMsgs)
        this.setState({ ...this.state, slides: newSlides }, async () => {
            if (!errorsPresent) {
                try {
                    const mobileNo = getUserMobileNumber(this.state.slides[0])
                    this.setState({ mobileNo })
                    getOtp(mobileNo)
                    // const { otpId } = await getOtp(mobileNo)
                    // this.setState({ otpId })
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
                this.onSubmitLetGoSlide()
            })
        } catch (err) {
            alert(err.message)
        }
    }

    onSubmitLetGoSlide = async () => {
        const primaryPath = this.state.primaryPath
        try {
            const res = await submitShortForm([...this.state.slides], this.state.currentSlide, primaryPath)
            const leadIdData = JSON.parse(localStorage.getItem('leadId'))
            const leadId = { ...leadIdData, [primaryPath]: res.data.response.payload.leadId }
            localStorage.setItem('leadId', JSON.stringify(leadId))
            goToSlides()
        } catch (err) {
            alert(err)
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
                    if (this.state.slideIndex < this.state.slides.length - 1) {
                        this.setState({ slideIndex: this.state.slideIndex + 1, currentSlide: newSlideId }, () => {
                            showSlides(n, this.state.slideIndex)
                        })
                    } else {
                        this.onSubmitShortForm('submit')
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
        resetDropdowns(inputs, this.state.errorMsgs)
        this.setState({ slides: newSlides })
    }

    onSubmitShortForm = submit => {
        // console.log(submit)
        const primaryPath = this.state.primaryPath
        submitShortForm([...this.state.slides], this.state.currentSlide, primaryPath)
        if (submit) {
            // console.log(submit)
            this.props.router.push(`/${primaryPath}/listings`)
        }
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
        )
    }

}

export default withRouter(ShortExtendedForm)