import { getDevice } from './getDevice'
import { getFormattedCurrency, getWholeNumberFromCurrency } from './formattedCurrency'

export const generateInputs = (component, updateField,
    checkInputValidity, handleInputDropdownChange, handleInputDropdownSelection) => {

    const handleChange = (e, type) => {
        let { name, value, checked } = e.target
        let field = {}

        if(type === 'money')  {
            const numString = getWholeNumberFromCurrency(value)
            if(isNaN(numString)) {
                return
            }
            value = getFormattedCurrency(value)
        }

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

    const onSelect = (input_id, type, selectedItem) => {
        handleInputDropdownSelection(input_id, type, selectedItem)
    }

    const openDatePicker = () => {
        const datepicker = $(`#${'dob'}`).datepicker()
        datepicker.open()
    }

    const onChangeDate = (name, type) => {
        setTimeout(() => {
            const datepicker = $(`#${'dob'}`).datepicker()
            const value = datepicker.val()
            const field = { name, value, type, blur: true, currentActiveInput: name }
            if (value) {
                updateField(field)
            }
        }, 250);
    }

    const onUploadAttachment = async (name, type, inputFileId, attach) => {
        const files = await document.getElementById(inputFileId).files
        if (files) {
            let value = null
            let attachment = false

            if (attach && !files.length) {
                return
            }

            if (attach) {
                value = files
                attachment = true
            } else {
                document.getElementById(inputFileId).value = ''
                value = null
                attachment = false
            }
            const field = { name, value, type, attachment }
            updateField(field)
        }
    }


    let { type, input_id, placeholder, mandatory, label, value, id,
        checkbox, radio, question, error, errorMsg, verified, list, listType,
        upload_text, monetary_input, heading, input_class } = component
    if (!value) value = ''

    const borderInputInvalid = { border: 'none', boxShadow: '0 0 0 2px var(--error-color)' }
    const borderInputValid = null
    const borderStyles = error ? borderInputInvalid : borderInputValid

    let fieldClasses = ['form__group', 'field']
    if (error) {
        fieldClasses.push('error-input')
    } else {
        const index = fieldClasses.indexOf('error-input')
        if (index != -1) {
            fieldClasses.splice(index)
        }
        const filledInputIndex = fieldClasses.indexOf('filled-input')
        if (filledInputIndex != -1) {
            fieldClasses.splice(index)
        }
    }

    if (verified) {
        fieldClasses.push('verified-input')
        fieldClasses.push('filled-input')
    } else {
        const index = fieldClasses.indexOf('verified-input')
        if (index != -1) {
            fieldClasses.splice(index)
        }
        const filledInputIndex = fieldClasses.indexOf('filled-input')
        if (filledInputIndex != -1) {
            fieldClasses.splice(index)
        }
    }

    if (type === 'section_headiing') {
        return (
            <div>
                <h3>{heading}</h3>
            </div>
        )
    }

    if (type === 'text' || type === 'email' || type === 'number' || type === 'pan_card' || type === 'money') {
        const fieldId = `${input_id}_${type}`
        const inputType = type === 'number' ? getDevice() === 'desktop' ? 'number' : 'tel' : type
        return (
            <div className={fieldClasses.join(' ')} type={type} id={fieldId} key={id}>
                <input className="form__field"
                    name={input_id}
                    type={inputType}
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
        )
    }

    if (type === 'phone_no') {
        const fieldId = `${input_id}_${type}`
        return (
            <div className={fieldClasses.join(' ')} key={id} id={fieldId}>
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
                <label className="form__label">{label}</label>
                {error ? <div className='input-error'>
                    <p>{errorMsg}</p>
                </div> : null}
            </div>
        )
    }

    if (type === 'upload_button') {
        const { attachment } = component
        const inputFileId = `input_file_${input_id}`
        const fieldId = `${input_id}_${type}`
        let uploadText = value ? value.length === 1 ? value[0].name : value.length + ' files' : upload_text
        const uploadButtonBorderStyles = attachment && !error && !verified ? null : borderStyles
        fieldClasses.push(type)
        fieldClasses.push('file-type')

        if (attachment && !error && !verified) {
            fieldClasses.push('file-type-border')
            fieldClasses.push('file-type-back')
        }

        return (
            <>
                <div className={fieldClasses.join(' ')} id={fieldId} style={uploadButtonBorderStyles}>
                    <input id={inputFileId} type="file" accept="application/pdf, image/*" multiple onChange={() => onUploadAttachment(input_id, type, inputFileId, true)} />
                    {!value ? <img src="/assets/images/icons/Upload.svg" onClick={() => document.getElementById(inputFileId).click()} style={{ background: 'red' }} /> : null}
                    {value ? <img src="/assets/images/icons/Attach.svg" onClick={() => document.getElementById(inputFileId).click()} style={{ background: 'red' }} /> : null}
                    {value ? <img src="/assets/images/icons/cross.svg" onClick={() => onUploadAttachment(input_id, type, inputFileId, false)} style={{ background: 'red' }} /> : null}
                    <h5 onClick={() => document.getElementById(inputFileId).click()}>{uploadText} {!mandatory && !value ? <b>(optional)</b> : null}</h5>

                    {error ? <div >
                        <p>{errorMsg}</p>
                    </div> : null}

                </div>

            </>
        )
    }


    if (type === 'input_with_dropdown') {
        const { input_type, selectedId, dependent, select_name } = component

        const fieldId = `${input_id}_${type}`
        const listStyles = list && list.length ? { display: 'block' } : { display: 'none' }
        const dropDownClass = selectedId === '*' || dependent ? 'disabled_input' : 'dropdown_enabled'
        fieldClasses.push(dropDownClass)
        fieldClasses.push(input_class)
        if (list && list.length && getDevice() !== 'desktop') {
            const listEl = document.getElementById(fieldId)
            if (listEl) {
                const listElOffset = listEl.offsetTop + 60
                window.scrollTo({ top: listElOffset, behavior: 'smooth' })
            }
        }
        return (
            <div className={fieldClasses.join(' ')} id={fieldId} key={id}>
                <input className="form__field"
                    name={input_id}
                    id={input_id}
                    type={input_type}
                    value={value}
                    placeholder={placeholder}
                    autoComplete='off'
                    disabled={selectedId === '*' || dependent}
                    required={mandatory}
                    onBlur={e => validate(e, type)}
                    onChange={e => handleChange(e, type)}
                />
                <label className="form__label">{label}</label>

                {error ? <div className='input-error'>
                    <p>{errorMsg}</p>
                </div> : null}

                {list ? <div className="dropdown-content" style={listStyles}>
                    <div className="dropdown-content-links">
                        {list.map((item, i) => {
                            return (
                                <a key={i} onClick={() => onSelect(input_id, type, item)}>{item[select_name]}</a>
                            )
                        })}
                    </div>
                </div> : null}
            </div>
        )
    }

    if (type === 'input_with_calendar') {
        const fieldId = `${input_id}_${type}`
        return (
            <div className="cstm-cal" id={fieldId}>
                <div className={fieldClasses.join(' ')} key={id}>
                    <label className="form__label">{label}</label>
                    <input
                        className="form__field phone-grid-span"
                        id={'dob'}
                        placeholder={placeholder}
                        name={input_id}
                        type='text'
                        value={value}
                        autoComplete='off'
                        required={mandatory}
                        onFocus={() => openDatePicker()}
                        onBlur={() => onChangeDate(input_id, type)}
                        onChange={e => e.preventDefault()}
                        onKeyDown={e => e.preventDefault()}
                    />
                    {error ? <div className='input-error'>
                        <p>{errorMsg}</p>
                    </div> : null}
                </div>
            </div>
        )
    }

    if (type === 'checkbox') {
        const { checkbox_input, checkboxes_for } = checkbox
        const fieldId = `${checkboxes_for}_${type}_container`
        return (
            // <div className="agree" id={fieldId}>
            <div id={fieldId} className="agree">
                <div className="checkbox-container" key={id}>
                    {checkbox_input.map(box => {
                        const boxId = `${box.input_id}_${type}`
                        return (
                            <div key={box.id} className="checkbox" id={boxId}>
                                <input
                                    type={type}
                                    name={box.input_id}
                                    value={box.checked}
                                    onChange={e => handleChange(e, type)}
                                />
                                <label htmlFor={box.input_id}></label>
                                <span dangerouslySetInnerHTML={{ __html: box.label }}></span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    if (type === 'radio') {
        const { radio_buttons } = radio
        const radioParentId = `${input_id}_radio_container`
        return (
            <>
                {radio_buttons ? <>
                    <div className="radio-container" key={id} name={input_id} id={radioParentId} required={mandatory}>
                        {radio_buttons.map(button => {
                            const labelStyles = value === button.value ? { border: 'none', boxShadow: '0 0 0 2px #89C142', color: '#89C142' } : null
                            const radioId = `${input_id}_${type}`
                            return (
                                <div key={button.id} id={radioId}>
                                    <label style={labelStyles} htmlFor={input_id}>{button.label}</label>
                                    <input
                                        type="radio"
                                        name={input_id}
                                        id={button.value}
                                        value={button.value}
                                        onChange={e => handleChange(e, type)}
                                    />
                                </div>
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