import { properties } from '../api/dropdownApiConfig'
import { getDevice } from './getDevice'

export const generateInputs = (component, updateField,
    checkInputValidity, handleInputDropdownChange) => {

    const handleChange = (e, type) => {
        const { name, value, checked } = e.target
        let field = {}
        if (type === 'checkbox') {
            field = { name, checked, type }
        } else {
            field = { name, value, type }
            if (type === 'input_with_dropdown') {
                setTimeout(() => {
                    document.getElementById(name).focus()
                }, 100)
            }
        }
        updateField(field)
    }

    const validate = (e, type) => {
        const { name, value } = e.target
        const field = { name, value, type, blur: true, currentActiveInput: name }
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
        }, 250);
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

    const borderInputInvalid = { border: '1px solid var(--error-color)' }
    const borderInputValid = null
    const borderStyles = error ? borderInputInvalid : borderInputValid

    if (type === 'text' || type === 'email' || type === 'number' || type === 'tel') {
        if (!value) value = ''
        return (
            <>
                <div className="form__group field" key={id} style={borderStyles}>
                    <input className="form__field"
                        name={input_id}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        autoComplete='off'
                        required={mandatory}
                        onBlur={e => validate(e, type)}
                        onChange={e => handleChange(e, type)}
                    />
                    <label className="form__label">{label}</label>
                    {error ? <div className='input-error'>
                        <p>{errorMsg}</p>
                    </div> : null}

                </div>
            </>
        )
    }

    if (type === 'phone_no') {
        if (!value) value = ''
        return (
            <>
                <div className="form__group field" key={id} style={borderStyles}>
                    <input className="form__field"
                        name={input_id}
                        type={getDevice() === 'desktop' ? 'number' : 'tel'}
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
                    <label className="form__label">{label}</label>
                </div>
            </>
        )
    }

    if (type === 'upload_button') {
        const inputFileId = `input_file_${input_id}`
        let uploadText = value ? value.length === 1 ? value[0].name : value.length + ' files' : upload_text
        return (
            <>
                <div className="form__group field file-type" >
                    <input id={inputFileId} type="file" accept="application/pdf, image/*" multiple onChange={() => onUploadAttachment(input_id, type, inputFileId, true)} />
                    {!value ? <img src="/assets/images/icons/Upload.svg" onClick={() => document.getElementById(inputFileId).click()} /> : null}
                    {value ? <img src="/assets/images/icons/Attach.svg" onClick={() => document.getElementById(inputFileId).click()} /> : null}
                    {value ? <img src="/assets/images/icons/cross.svg" onClick={() => onUploadAttachment(input_id, type, inputFileId, false)} /> : null}

                    <h5 onClick={() => document.getElementById(inputFileId).click()}>{uploadText} {!mandatory ? <b>(optional)</b> : null}</h5>
                </div>
                {error ? <div className='input-error'>
                    <p>{errorMsg}</p>
                </div> : null}
            </>
        )
    }

    if (type === 'input_with_dropdown') {
        if (!value) value = ''
        const { input_type } = component

        const { listName, id, name } = properties(listType)
        return (
            <>
                <div className="form__group field" key={id} style={borderStyles}>
                    <input className="form__field"
                        name={input_id}
                        id={input_id}
                        type={input_type}
                        value={value}
                        placeholder={placeholder}
                        autoComplete='off'
                        required={mandatory}
                        onBlur={e => validate(e, type)}
                        onChange={e => handleChange(e, type)}
                    />
                    <label className="form__label">{label}</label>

                    {error ? <div className='input-error'>
                        <p>{errorMsg}</p>
                    </div> : null}

                    {list && list[listName] && list[listName].length ? <div className="dropdown-content" style={{ display: 'block' }}>
                        <div className="dropdown-content-links">
                            {list[listName].map(item => {
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
        if (!value) value = ''
        const datepicker = $(`#${input_id}`).datepicker()
        return (
            <>
                <h2>{question}</h2>
                <div className="cstm-cal">
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
                </div>
            </>

        )
    }

    if (type === 'checkbox') {
        const { checkbox_input } = checkbox
        return (
            <div className="agree">
                <div className="checkbox-container" key={id}>
                    {checkbox_input.map(box => {
                        return (
                            <div key={box.id} className="checkbox">
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
            </div>
        )
    }

    if (type === 'radio') {
        const { radio_buttons } = radio
        return (
            <>
                {radio_buttons ? <>
                    <div className="shortforms-container" key={id} name={input_id} required={mandatory}>
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
                </> : null}
            </>
        )
    }

}