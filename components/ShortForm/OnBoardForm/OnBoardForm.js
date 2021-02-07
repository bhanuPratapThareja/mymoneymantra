import { generateInputs } from '../../../utils/inputGenerator'

const OnBoardForm = props => {
    return (
        <div className="lets-find">
            <div className="lets-find-content">
                <h2>{props.data.heading}</h2>
                <img className="green-underline" src="/assets/images/credit-card-flow/green-underline.png" />
                <div dangerouslySetInnerHTML={{ __html: props.data.description }}></div>
            </div>

            <div className="lets-find-form">

                {props.slides.length ? <form>
                    {props.slides[0].inputs.map(component => {
                        return <React.Fragment key={component.id}>
                            {generateInputs(component, props.handleChange, props.checkInputValidity,
                                null, 'sf', props.checkboxAnchorClick)}
                        </React.Fragment>
                    })}
                </form> : null}

                <div className='lets-go-button'>
                    <button
                        onClick={props.onClickLetsGo}
                        disabled={props.submitButtonDisabled}
                    >{props.data.button_text}</button>
                </div>
            </div>
        </div>
    )
}

export default OnBoardForm