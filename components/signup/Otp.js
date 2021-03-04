import CustomImage from "./image";

// import * as greenUnderline from '../../public/assets/images/credit-card-flow/green-underline.png'
const Otp = (props) => {
  return (
    <div className="otp-wrapper login-options">
      <div className="form__group field">
        <input
        autoComplete={"off"}
          className="form__field"
          type="tel"
          id="otp"
          placeholder="otp"
          pattern="/^[0-9]{4}$/"
          required=""
          val={props.otp}
          onChange={(e) => /^[0-9]{0,4}$/.test(e.target.value) ? props.setotp(e.target.value) : e.preventDefault()}
        />
        {props.error ? <p style={{ color: 'red' }}>OTP Invalid</p> : null}
        <label className="form__label" htmlFor="phone">
          One time password
        </label>
      </div>
      <span>Haven’t received the OTP yet?</span>
      <button onClick={(e)=>{e.preventDefault();props.resend()}}>
        <h6>Resend</h6>
      </button>
    </div>

  )
}

export default Otp;