import { properties } from '../api/apiConfig'

export const generateInputs = (component, updateField,
    checkInputValidity, handleInputDropdownChange) => {

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

    const onSelect = (input_id, type, name, id, selectedItem) => {
        const item = { name, id, selectedItem }
        handleInputDropdownChange(input_id, type, item)
    }

    const onChangeDate = (name, type) => {
        setTimeout(() => {
            const datepicker = $(`#${input_id}`).datepicker()
            const value = datepicker.val()
            const field = { name, value, type }
            updateField(field)
        }, 100);
    }

    const onUploadAttachment = async (name, type, inputFileId, attach) => {
        const files = await document.getElementById(inputFileId).files
        let value = null
        if (attach && files.length) {
            value = files
        } else {
            document.getElementById(inputFileId).value = ''
        }
        const field = { name, value, type }
        updateField(field)
    }


    let { type, input_id, placeholder, mandatory, label, value, id,
        checkbox, radio, question, error, errorMsg, list, listType,
        upload_text } = component

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
                        onBlur={e => validate(e, type, 'blur')}
                        onChange={e => handleChange(e, type)}
                    />
                    {error ? <div className='input-error'>
                        <p>{errorMsg}</p>
                    </div> : null}

                </div>
            </>
        )
    }

    if (type === 'upload_button') {
        const inputFileId = `input_file_${input_id}`

        return (
            <>
                <div className="form__group field file-type">
                    <input id={inputFileId} type="file" accept="application/pdf, image/*" multiple onChange={() => onUploadAttachment(input_id, type, inputFileId, true)} />
                    {!value ? <img src="/assets/images/icons/Upload.svg" onClick={() => document.getElementById(inputFileId).click()} style={{ background: 'red' }} /> : null}
                    {value ? <img src="/assets/images/icons/Attach.svg" onClick={() => document.getElementById(inputFileId).click()} style={{ background: 'red' }} /> : null}
                    {value ? <img src="/assets/images/icons/Cross.svg" onClick={() => onUploadAttachment(input_id, type, inputFileId, false)} style={{ background: 'red' }} /> : null}

                    <h5>{upload_text} {!mandatory ? <b>(optional)</b> : null}</h5>
                </div>
                {error ? <div className='input-error'>
                    <p>{errorMsg}</p>
                </div> : null}
            </>
        )
    }

    if (type === 'input_with_dropdown') {
        const { input_type } = component

        const { listName, id, name } = properties(listType)
        // console.log('propertToDisplay: ', property)
        return (
            <>
                <div className="form__group field" key={id} style={borderStyles}>
                    <label className="form__label">{label}</label>
                    <input className="form__field"
                        name={input_id}
                        type={input_type}
                        value={value}
                        placeholder={placeholder}
                        autoComplete='off'
                        required={mandatory}
                        onBlur={e => validate(e, type)}
                        onChange={e => handleChange(e, type)}
                    />

                    {error ? <div className='input-error'>
                        <p>{errorMsg}</p>
                    </div> : null}

                    {list && list[listName] && list[listName].length ? <div className="dropdown-content" style={{ display: 'block' }}>
                        <div className="dropdown-content-links">
                            {list.cityList.map(item => {
                                return (
                                    <a key={item[id]} onClick={() => onSelect(input_id, type, item[name], item[id], item)}>{item[name]}</a>
                                )
                            })}
                        </div>
                    </div> : null}
                </div>
            </>
        )
    }

    if (type === 'input_with_calendar') {
        const datepicker = $(`#${input_id}`).datepicker()
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
                        autoComplete='off'
                        required={mandatory}
                        onFocus={() => datepicker.open()}
                        onBlur={() => onChangeDate(input_id, type)}
                        onChange={e => e.preventDefault()}
                        onKeyDown={e => e.preventDefault()}
                    />
                    {error ? <div className='input-error'>
                        <p>{errorMsg}</p>
                    </div> : null}
                </div>
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