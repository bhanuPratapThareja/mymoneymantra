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

                {props.slides.length ?
                    <form onSubmit={props.onClickLetsGo} noValidate>
                        {props.slides[0].inputs.map(component => {
                            return <React.Fragment key={component.id}>
                                {generateInputs(component, props.handleChange, props.checkInputValidity,
                                    null, 'sf', props.checkboxAnchorClick)}
                            </React.Fragment>
                        })}
                        <div className='lets-go-button'>
                            <button
                                type="submit"
                                disabled={props.submitButtonDisabled}
                            >{props.data.button_text}</button>
                        </div>
                    </form> : null}
            </div>
        </div>
    )
}

export default OnBoardForm