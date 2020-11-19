export const generateInputs = (component, updateField) => {

    let { type, name, placeholder, mandatory, label, value, id, } = component

    if (type === 'text' || type === 'number' || type === 'email') {
        return (
            <div className="form__group field" key={id}>
                <label className="form__label" htmlFor={name}>{label}</label>
                <input className="form__field" onChange={e => updateField(e.target.value, name)} type={type} value={value} id={name} placeholder={placeholder} required={mandatory == 'true'} />
            </div>
        )
    }

    if (type === 'checkbox') {
        return (
            <React.Fragment key={id}>
                <input type={type} id={name} name={name} checked={value} onChange={e => updateField(e.target.checked, name)} />
                <label htmlFor={type}><span>{label}</span></label>
            </React.Fragment>
        )
    }

}