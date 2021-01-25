import Otp from '../../Otp/Otp'
import SFButtons from '../SFButtons/SFButtons'
import { getOtp } from '../../../services/formService'

const OtpSlide = props => {

    const resendClass = props.otpTimeLeft ? 'resend_disabled' : 'resend_enabled'

    return (
        <>
            <form className="short-forms-wrapper">
                <div className="mobile-otp">
                    <div className="lets-find-content otp-card_custom">
                        <h2>Verify your mobile<br />number</h2>
                        <img className="green-underline" src="/assets/images/credit-card-flow/green-underline.png" />
                        <div className="otp-wrapper login-options">
                            <div className="form__group field">
                                <Otp />
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
                        </div>
                    </div>
                </div>
                <SFButtons
                onClickPrevious={props.onGoToLetFindForm}
                onClickNext={props.onSubmitOtp}
                slideButtonText={props.slideButtonText}
            />
            </form>
        </>
    )
}

export default OtpSlide