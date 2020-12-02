export const textTypeInputs = ['text', 'number', 'email', 'tel', 'input_with_dropdown']

export const getCurrentSlideInputs = state => {
    const newSlides = [...state.slides]
    const slide = newSlides.filter(slide => slide.slideId === state.currentSlide)
    const inputs = slide[0].inputs
    return inputs
}

export const generateInputs = (component, updateField, checkInputValidity, handleInputDropdownChange) => {
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
        console.log(field)
        checkInputValidity(field)
    }

    const onSelect = (input_id, type, item) => {
        handleInputDropdownChange(input_id, type, item)
    }

    const handleDateInput = (input_id, value, type) => {
       setTimeout(() => {
        console.log(input_id)
        console.log(value)
     
        console.log(type)
       }, 1000)
       const v = document.getElementById(input_id).value
       console.log(v)

    }


    let { type, input_id, placeholder, mandatory, label, value, id,
        checkbox, radio, question, error, errorMsg, list } = component

    const borderInputInvalid = { border: '1px solid red' }
    const borderInputValid = null
    const borderStyles = error ? borderInputInvalid : borderInputValid

    if (type === 'text' || type === 'email' || type === 'number' || type === 'tel') {
        return (
            <>
                <div className="form__group field" key={id} style={borderStyles}>
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

                </div>
            </>
        )
    }

    if (type === 'input_with_dropdown') {
        return (
            <>
                <div className="form__group field" key={id} style={borderStyles}>
                    <label className="form__label">{label}</label>
                    <input className="form__field"
                        name={input_id}
                        type='text'
                        value={value}
                        placeholder={placeholder}
                        required={mandatory}
                        onBlur={e => validate(e, type)}
                        onChange={e => handleChange(e, type)}
                    />
                    {error ? <div className='input-error'>
                        <p>{errorMsg}</p>
                    </div> : null}

                    {list && list.length ? <div className="dropdown-content" style={{ display: 'block' }}>
                        <div className="dropdown-content-links">
                            {list.map(item => <a key={item.id} onClick={() => onSelect(input_id, type, item)}>{item.name}</a>)}
                        </div>
                    </div> : null}
                </div>
            </>
        )
    }

    if (type === 'input_with_calendar') {
        return (
            <>
            <h2>{question}</h2>
                <div className="form__group field" key={id} style={borderStyles}>
                    <label className="form__label">{label}</label>
                    <input
                        className="form__field phone-grid-span"
                        id={input_id}
                        placeholder={placeholder}
                        name={input_id}
                        type='text'
                        value={value}
                        required={mandatory}
                        onFocus={() => $(`#${input_id}`).datepicker()}
                        onBlur={() => handleDateInput(input_id, $(`#${input_id}`).datepicker().value(), type)}
                        onChange={e => handleDateInput(input_id, $(`#${input_id}`).datepicker().value(), type)}
                    />
                </div>
                {error ? <div className='input-error'>
                    <p>{errorMsg}</p>
                </div> : null}
            </>
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
                {/* <h2>{question}</h2> */}
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