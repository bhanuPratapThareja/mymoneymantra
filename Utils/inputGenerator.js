export const generateInputs = (component, updateField) => {

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


    let { type, input_id, placeholder, mandatory, label, value, id, checkbox } = component

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
                    onChange={e => handleChange(e, type)}
                />
                {/* <p>Required</p> */}
            </div>
        )
    }

    if (type === 'checkbox') {
        const { checkbox_input } = checkbox
        return (
            <div key={id}>
                {checkbox_input.map(box => {
                    return(
                        <div key={box.id}>
                        <input
                            type={type}
                            name={box.input_id}
                            checked={box.checked}
                            onChange={e => handleChange(e, type)} />
                        <label><span dangerouslySetInnerHTML={{ __html: box.label }}></span></label>
                    </div>
                    )
                })}
            </div>
        )
    }

}