import Router from 'next/router'
import $ from 'jquery'
import {  } from '../Utils/shortFormHandle'
import { generateInputs } from '../Utils/inputGenerator'
import {
    textTypeInputs,
    getCurrentSlideInputs,
    handleChangeInputs,
    updateInputsValidity,
    incrementSlideId,
    decrementSlideId,
    updateSelectionFromDropdown,
    resetDropdowns,
    loadLetsFindForm,
    submitLetsFindForm
} from '../Utils/shortFormHandle'

class ShortExtendedForm extends React.Component {
    state = {
        slideIndex: 0,
        currentSlide: 'onboard',
        slides: [],
        letsGoButtonDisabled: true,
        mandatoryErrorMsg: 'Required Field',
        emailErrorMsg: 'Invalid Email ID',
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


        this.showSlides(this.state.slideIndex)
        $(".shortforms-container-buttons #previous").click(() => {
            this.onGoToPrevious()
        })

        $(".shortforms-container-buttons #next").click(() => {
            this.onSubmitSlide()
        })
    }

    onGoToPrevious = () => {
        if (this.state.slideIndex === 1) {
            this.onGoToLetFindForm()
            return
        }
        this.plusSlides(-1)
    }

    onSubmitSlide = () => {
        this.plusSlides(1)
    }

    onClickLetsGo = () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const errorsPresent = updateInputsValidity(inputs, null, this.state.mandatoryErrorMsg, this.state.emailErrorMsg)
        this.setState({ ...this.state, slides: newSlides }, () => {
            if (!errorsPresent) {
                this.setState({ currentSlide: 'sf-1', slideIndex: 1 }, () => {
                    submitLetsFindForm()
                    this.showSlides()
                })
            }
        })
    }

    plusSlides = (n) => {
        if (n >= 1) {
            const { newSlides, inputs } = getCurrentSlideInputs(this.state)
            const errorsPresent = updateInputsValidity(inputs, null, this.state.mandatoryErrorMsg, this.state.emailErrorMsg)
            this.setState({ ...this.state, slides: newSlides }, () => {
                if (!errorsPresent) {
                    const newSlideId = incrementSlideId(this.state.currentSlide)
                    this.setState({ slideIndex: this.state.slideIndex + 1, currentSlide: newSlideId }, () => {
                        this.showSlides(n)
                    })
                }
            })
        } else {
            const newSlideId = decrementSlideId(this.state.currentSlide)
            this.setState({ slideIndex: this.state.slideIndex - 1, currentSlide: newSlideId }, () => {
                this.showSlides(n)
            })
        }

    }

    showSlides = (n) => {
        var slides = document.getElementsByClassName("sf-forms")
        if (this.state.slideIndex > slides.length) {
            this.onSubmitShortForm()
            return
        }

        if (this.state.slideIndex == slides.length) {
            $("#button-text").text("Submit and view offers").css("color", "#89C142");
            $("#next").addClass("submit-short-form");
        } else {
            $("#button-text").text("Next").css("color", "#221F1F");
            $("#next").removeClass("submit-short-form");
        }

        var width = (this.state.slideIndex * (100 / slides.length)) + "%";
        $("#pages-count").text(this.state.slideIndex + " of " + slides.length);
        $(".progress-blue").width(width)

        if (n < 1) {
            if (this.state.slidesIndex) {
                slides[this.state.slideIndex].style.display = "block"
                slides[this.state.slideIndex].classList.add("opacity-in")
            }
            $("#button-text").text("Next")
            $("#next").removeClass("submit-short-form");
        }
    }

    onGoToLetFindForm = () => {
        loadLetsFindForm()
    }

    onSubmitShortForm = () => {
        Router.push(`${this.props.path}/loan-listing`)
    }

    handleInputDropdownChange = (name, type, item) => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateSelectionFromDropdown(inputs, name, item)
        this.setState({...this.state, slides: newSlides }, () => {
            console.log(this.state.slides)
        })
    }

    handleChange = field => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        const { newstate: { letsGoButtonDisabled } } = handleChangeInputs(inputs, field, this.state.letsGoButtonDisabled)

        this.setState({ ...this.state, slides: newSlides, letsGoButtonDisabled }, () => {
            if (textTypeInputs.includes(field.type) || field.type === 'radio') {
                this.checkInputValidity(field)
            }
            console.log(this.state.slides)
        })
    }

    checkInputValidity = field => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        updateInputsValidity(inputs, field, this.state.mandatoryErrorMsg, this.state.emailErrorMsg)
        this.setState({ ...this.state, slides: newSlides })
    }

    handleClickOnSlideBackground = () => {
        const { newSlides, inputs } = getCurrentSlideInputs(this.state)
        resetDropdowns(inputs)
        this.setState({ slides: newSlides })
    }

    render() {
        const { heading, description, button_text } = this.props.data.onboard_short_form
        const sfSlides = this.state.slides.slice(1)

        return (
            <section data-aos="fade-up" className="container lets-find-container aos-init">

                <div className="mobile-background"></div>
                <div className="mobile-content">
                    <h1>Credit cards for<br />all your needs.</h1>
                </div>

                <div className="all-form-wrapper">
                    <div className="lets-find">
                        <div className="lets-find-content">
                            <h2>{heading}</h2>
                            <img className="green-underline" src="/assets/images/credit-card-flow/green-underline.png" />
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>
                        </div>

                        <div className="lets-find-form">

                            {this.state.slides.length ? <form>
                                {this.state.slides[0].inputs.map(component => {
                                    return <React.Fragment key={component.id}>
                                        {generateInputs(component, this.handleChange, this.checkInputValidity)}
                                    </React.Fragment>
                                })}
                            </form> : null}

                            <div className='lets-go-button'>
                                <button
                                    onClick={this.onClickLetsGo}
                                    disabled={this.state.letsGoButtonDisabled}
                                >{button_text}</button>
                            </div>
                        </div>
                    </div>

                    <div className="lets-find-forms-container">
                        <div className="lets-find-stepper-wrapper">
                            <div className="progress-grey">
                                <div className="progress-blue" style={{ width: '12.5%' }}></div>
                            </div>
                            <h5 className="pages"><span id="pages-count">1 of 8</span></h5>

                            {sfSlides && sfSlides.length ? <form className="short-forms-wrapper" onClick={this.handleClickOnSlideBackground}>
                                {sfSlides.map(slide => {
                                    return (
                                        <div className="sf-forms opacity-in" id={slide.slideId} style={slide.slideId === this.state.currentSlide ? { display: 'block' } : { display: 'none' }} key={slide.slideId}>
                                            <div className="shortforms-container">
                                                <div className="form__group-wrapper grid-span">
                                                    <h2>{slide.heading}</h2>
                                                    {slide.inputs.map(component => {
                                                        return (
                                                            <React.Fragment key={component.id}>
                                                                {generateInputs(component, this.handleChange,
                                                                    this.checkInputValidity, this.handleInputDropdownChange
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </form> : null}


                            {/* <!--next and prev buttons--> */}
                            <div className="shortforms-container-buttons">
                                <button className="to-main" id="previous">
                                    <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.893 15.493a1.332 1.332 0 00-.28-.44l-6.666-6.666a1.34 1.34 0 00-1.894 1.893l4.4 4.387H9.333a1.334 1.334 0 000 2.666h10.12l-4.4 4.387a1.335 1.335 0 000 1.893 1.336 1.336 0 001.894 0l6.666-6.666c.122-.127.217-.277.28-.44a1.333 1.333 0 000-1.014z" fill="#fff"></path>
                                    </svg>
                                </button>
                                <div>
                                    <h4 id="button-text" style={{ color: 'rgb(34, 31, 31)' }}>Next</h4>
                                    <button type="button" id="next">
                                        <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.893 15.493a1.332 1.332 0 00-.28-.44l-6.666-6.666a1.34 1.34 0 00-1.894 1.893l4.4 4.387H9.333a1.334 1.334 0 000 2.666h10.12l-4.4 4.387a1.335 1.335 0 000 1.893 1.336 1.336 0 001.894 0l6.666-6.666c.122-.127.217-.277.28-.44a1.333 1.333 0 000-1.014z" fill="#fff"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default ShortExtendedForm