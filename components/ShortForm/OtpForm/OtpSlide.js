import Otp from '../../Otp/Otp';
import SFButtons from '../SFButtons/SFButtons'

const OtpSlide = props => {

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
                            <span>Haven’t received the OTP yet?</span>
                            <span>Resend </span>
                        </div>
                    </div>
                </div>
            </form>

            <SFButtons
                onClickPrevious={props.onGoToLetFindForm}
                onClickNext={props.onSubmitOtp}
                disableOtpSubmitButton={props.disableOtpSubmitButton}
            />
        </>
    )
}

export default OtpSlide