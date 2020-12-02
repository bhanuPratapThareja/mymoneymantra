export const textTypeInputs = ['text', 'number', 'email', 'tel']

export const getCurrentSlideInputs = state => {
    const newSlides = [...state.slides]
    const slide = newSlides.filter(slide => slide.slideId === state.currentSlide)
    const inputs = slide[0].inputs
    return inputs
}

export const generateInputs = (component, updateField, checkInputValidity) => {

    const handleChange = (e, type) => {
        const { name, value, checked } = e.target
        let field = {}
        if (type === 'checkbox') {
            field = { name, checked, type }
        } else {
            field = { name, value, type }
        }
        updateField(field)
    }

    const validate = (e, type) => {
        const { name, value } = e.target
        const field = { name, value, type }
        checkInputValidity(field)
    }


    let { type, input_id, placeholder, mandatory, label, value, id, checkbox, radio, question, error, errorMsg } = component

    if (type === 'text' || type === 'email' || type === 'number' || type === 'tel') {
        return (
            <div className="form__group field" key={id}>
                <label className="form__label">{label}</label>
                <input className="form__field"
                    name={input_id}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    required={mandatory}
                    onBlur={e => validate(e, type)}
                    onChange={e => handleChange(e, type)}
                />
                {error ? <div className='input-error'>
                    <p>{errorMsg}</p>
                </div> : null}
                {/* <div>dropdown</div> */}
            </div>
        )
    }

    if (type === 'checkbox') {
        const { checkbox_input } = checkbox
        return (
            <div key={id}>
                {checkbox_input.map(box => {
                    return (
                        <div key={box.id}>
                            <input
                                type={type}
                                name={box.input_id}
                                value={box.checked}
                                onChange={e => handleChange(e, type)}
                            />
                            <label><span dangerouslySetInnerHTML={{ __html: box.label }}></span></label>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (type === 'radio') {
        const { radio_buttons } = radio
        return (
            <>
                <h2>{question}</h2>
                <div key={id} name={input_id} required={mandatory}>
                    {radio_buttons.map(button => {
                        const labelStyles = value === button.value ? { border: '1px solid green' } : null
                        return (
                            <React.Fragment key={button.id}>
                                <label htmlFor={button.value} style={labelStyles}>{button.label}</label>
                                <input
                                    className="lets-checkbox"
                                    type="radio"
                                    name={input_id}
                                    id={button.value}
                                    value={button.value}
                                    onChange={e => handleChange(e, type)}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
                {error ? <div className='input-error'>
                    <p>{errorMsg}</p>
                </div> : null}
            </>
        )
    }

}