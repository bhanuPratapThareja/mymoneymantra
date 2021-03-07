import CustomImage from "./image";
import SubHeader from "./subheader";

const PhoneNumberCustom = (props) => {
  const validatePhone = (e) => {
    
    if (/^[6-9]{1}[0-9]{0,9}$/gi.test(e.target.value) || e.target.value === '') {
      props.setNumber(e.target.value);
    }
  }
  return (

    <div className="login-options">
      <div className="login-options-wrapper"  onClick={()=>{document.getElementById('phone').focus();}}>
        <div className="form__group field">
          <input
            className="form__field"
            type="tel"
            id="phone"
            placeholder="+91"
            required=""
            value={props.phone}
            onChange={(e) => validatePhone(e)}
          />
          <label className="form__label" htmlFor="phone">
            Phone number
                </label>
        </div>
        {props.error ? <p style={{ color: 'red' }}>{props.errorMsg}</p> : null}
      </div>
      <div className="login-terms">
        <div className="checkbox-container">
          <div className="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              name=""
              value={props.isChecked}
              onChange={(e) => { props.setChecked() }}
            />
            <label htmlFor="checkbox">
              <span>
                I allow and authorize MyMoneyMantra and its
                partners to override the DND registry and
                contact me by phone, e-mail or SMS about their
                products and services. I further accept and
                      agree to their{" "}
                <a href="#" target="_blank">
                  Terms of Use
                      </a>{" "}
                      and{" "}
                <a href="#" target="_blank">
                  Privacy Policy
                      </a>
                      .
                    </span>
            </label>
          </div>
        </div>
      </div>
    </div>


  )
}


export default PhoneNumberCustom;