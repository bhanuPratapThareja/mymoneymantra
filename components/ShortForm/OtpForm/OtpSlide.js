import Otp from '../../Otp/Otp'
import SFButtons from '../SFButtons/SFButtons'
import { getOtp } from '../../../services/formService'

const OtpSlide = props => {
    return (
        <form className="short-forms-wrapper" onSubmit={props.onSubmitOtp} noValidate>
            <div className="mobile-otp">
                <div className="lets-find-content otp-card_custom">
                    <h2>Verify your mobile<br />number</h2>
                    <img className="green-underline" src="/assets/images/credit-card-flow/green-underline.png" />
                    <div className="otp-wrapper login-options">
                        <div className="form__group field">
                            <Otp removeSubmissionErrorMsg={props.removeSubmissionErrorMsg} />
                            <label className="form__label" htmlFor="phone">One time password</label>
                        </div>
                        <div className="cstm-opt-txt">
                            <span>Haven’t received the OTP yet?</span>
                            <span
                                className="resend_otp"
                                onClick={() => getOtp(props.mobileNo)}
                                disabled={props.otpTimeLeft}>Resend
                                </span>{props.otpTimeLeft ? <span>{props.otpTimeLeft}</span> : null}
                        </div>
                        {props.submissionError ? <p className="form-invalid-text">{props.submissionError}</p> : null}
                    </div>
                </div>
            </div>
            <SFButtons
                onClickPrevious={props.onGoToLetFindForm}
                slideButtonText={props.slideButtonText}
            />
        </form>
    )
}

export default OtpSlide