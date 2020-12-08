import { allowedOtpKeys } from '../Utils/allowedOtpKeys';
import { useEffect, useRef } from 'react';

const Otp = props => {

    const inpRef = useRef()

    useEffect(() => {
        inpRef.current.focus()
    })

    const onInputChange = (event, val) => {
        const keyCode = event.keyCode
        event.persist()
        let inputs = document.getElementsByClassName('input_otp')
        let tempVal = inputs[val].value
        inputs[val].value = '';
        if (!allowedOtpKeys.includes(keyCode)) {
            setTimeout(() => {
                if (tempVal) {
                    inputs[val].value = tempVal
                } else {
                    inputs[val].value = ''
                }
                tempVal = null
            }, 10);
            return
        }
        setTimeout(() => {
            if (val < 3 && keyCode !== 8) {
                inputs[val].value = event.target.value
                inputs[val + 1].focus()
            }
            if (val > 0 && keyCode === 8) {
                inputs[val].value = ''
                inputs[val - 1].focus()
            }
        }, 50)

    }

    // const device = getDevice()
    let type = 'number'

    // if (device === 'mobile') {
    //     type = 'tel';
    // } else {
    //     type = 'number';
    // }

    return (
        <>
            <input type={type} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" disabled={props.submitting} className="input_otp" onKeyDown={event => onInputChange(event, 0)} ref={inpRef} />
            <input type={type} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" disabled={props.submitting} className="input_otp" onKeyDown={event => onInputChange(event, 1)} />
            <input type={type} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" disabled={props.submitting} className="input_otp" onKeyDown={event => onInputChange(event, 2)} />
            <input type={type} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" disabled={props.submitting} className="input_otp" onKeyDown={event => onInputChange(event, 3)} />

            <style jsx>{`
            .input_otp {
                height: 40px;
                width: 40px;
                margin: auto 10px;
                text-align: center;
                border: none;
                background-color: transparent;
                border-bottom: 2px solid grey;
                outline: none;
                font-size: 18px;
                font-weight: 900;
                color: var(--main-color);
                border-radius: 0;
                -webkit-border-radius: 0;
                -moz--border-radius: 0;
            }
            
            .input_otp:focus {
                border-bottom: 2px solid lightblue;
            }
            
            input[type=number]::-webkit-inner-spin-button, 
            input[type=number]::-webkit-outer-spin-button { 
              -webkit-appearance: none; 
              margin: 0; 
            }
        `}</style>

        </>
    )
}

export default Otp;