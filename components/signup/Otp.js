import CustomImage from "./image";

// import * as greenUnderline from '../../public/assets/images/credit-card-flow/green-underline.png'
const Otp=(props)=>{
    return(  <div className="lets-find-content">
    <h2>
      Verify your mobile
      <br />
      number
    </h2>
    <CustomImage></CustomImage>
    <div className="otp-wrapper login-options">
      <div className="form__group field">
        <input
          className="form__field"
          type="text"
          id="otp"
          placeholder="otp"
          required=""
          val={props.otp}
          onChange={(e)=>props.setotp(e.target.value)}
        />
        <label className="form__label" htmlFor="phone">
          One time password
        </label>
      </div>
      <span>Haven’t received the OTP yet?</span>
      {/* <button onC>
        <h6>Resend</h6>
      </button> */}
    </div>
  </div>
)
}

export default Otp;