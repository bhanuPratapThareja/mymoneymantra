import SFButtons from '../SFButtons/SFButtons'
import { generateInputs } from '../../../Utils/inputGenerator'

const SFSlides = props => {
    const totalSlides = props.slides.length
    const slideNumber = props.slideIndex
    const progressWidth = `${slideNumber / totalSlides * 100}%`
    const sfSlides = props.slides

    return (
        <div className="lets-find-stepper-wrapper">
            <div className="progress-grey">
                <div className="progress-blue" style={{ width: progressWidth }}></div>
            </div>

            <h5 className="pages"><span id="pages-count">{slideNumber} of {totalSlides}</span></h5>

            {sfSlides && sfSlides.length ? <form className="short-forms-wrapper" onClick={props.handleClickOnSlideBackground}>
                {sfSlides.map(slide => {
                    const slideStyles = props.currentSlide == slide.slideId ? { display: 'block' } : { display: 'none' }
                    return (
                        <div className="sf-forms opacity-in" id={slide.slideId} style={slideStyles} key={slide.slideId}>
                            <div className="shortforms-container">
                                <div className="form__group-wrapper grid-span">
                                    <h2>{slide.heading}</h2>
                                    {slide.inputs.map(component => {
                                        return (
                                            <React.Fragment key={component.id}>
                                                {generateInputs(component, props.handleChange,
                                                    props.checkInputValidity, props.handleInputDropdownChange
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

            <SFButtons
                onClickPrevious={props.onGoToPrevious}
                onClickNext={props.onSubmitSlide}
            />

        </div>
    )
}

export default SFSlides