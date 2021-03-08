import Layout from "../../components/Layout";
import { getClassesForPage } from "../../utils/classesForPage";
import WelcomeHeader from "../../components/signup/header";
import MobileWelcomeHeader from "../../components/signup/mobile-header";
import CustomButtons from "../../components/signup/custom-buttons";
import PhoneNumberCustom from "../../components/signup/phone";
import Otp from "../../components/signup/Otp";
import Thanks from "../../components/signup/thanks";
import { useEffect, useState } from "react";
import CustomName from "../../components/signup/name";
import CustomEmail from "../../components/signup/email";
import CustomLastName from "../../components/signup/lastname";
import { sendSignUpOtp, sendSignUpData, verifyOtp } from "../../utils/otp";
import { messgaes } from "../../utils/messages";
import SubHeader from "../../components/signup/subheader";
import CustomImage from "../../components/signup/image";
import { keys, setItem } from "../../utils/storage";
import Link from "next/link";
const signUp = (props) => {
  const [counter, setcounter] = useState(0);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [pan, setpan] = useState("");
  const [otp, setotp] = useState("");
  const [isPartner, setisPartner] = useState(false);
  const [type, settype] = useState("sign up");
  const [isChecked, setisChecked] = useState(false);
  const [otpId, setOtpId] = useState("");
  
  const [token, settoken] = useState('')
  const [otpError, setOtpError] = useState(false)
  const counterStep = (i) => {
    if ((i == -1 && counter !== 0)) {
      setcounter(counter + i);
    } else if (i == 1 && counter == 0) {
      console.log("here");
      signUpUser();
    } else if (i == 1 && counter == 1) {
      verifyOTP();
    }
    console.log(counter);
  };
  const validNext = () => {
    switch (counter) {
      case 0:
        return name.length > 2 && phone.length == 10 && email.length > 4
          ? false
          : true;
      default:
        return false;
    }
  };
  const verifyOTP = () => {
    
    verifyOtp(phone, otp, otpId)
      .then((res) => {
        sendSignUpData(name, email, phone, token, null)
          .then((res) => {
            const { customerId, message } = res;
            if (res.message == "OTP Verification Failed") {
              setOtpError(true);
              return;
            }
            else{
              setItem(keys.customerId,customerId);
            setcounter(counter + 1);
          }
          })
          .catch((err) => {
            // alert(err.message);
          })
          .finally(() => {
            
          });

      })
      .catch((err) => {
        // alert(err.message);
      })
      
  };
  const signUpUser = (resend = null) => {
    
    sendSignUpOtp(phone)
      .then((res) => {
        const { otpId } = res;
        setOtpId(otpId);
        if (!resend) {
          setcounter(counter + 1);
        }
      })
      .catch((err) => {
        // alert(err.message);
      })
      .finally(() => {
        
      });
  };

  return (
    <div className='credit-card-flow thankyou-page b2c-thank-you b2c-flow'>
      <Layout>
        {counter != 2 ? <WelcomeHeader></WelcomeHeader> : null}
        <section
          data-aos="fade-up"
          className="container lets-find-container aos-init"
          style={{ display: counter == 2 ? "none" : "block" }}
        >
          <MobileWelcomeHeader></MobileWelcomeHeader>
          <div className="all-form-wrapper">
            <div
              className="lets-find-forms-container"
              style={{ display: "block" }}
            >
              <div className="lets-find-stepper-wrapper">
                <form className="short-forms-wrapper">
                  <div
                    className="sf-forms opacity-in"
                    id="sf-1"
                    style={{ display: counter == 0 ? "block" : "none" }}
                  >
                    <div className="lets-find-content">
                      {counter == 0 ? (
                        <>
                          <SubHeader type={type}></SubHeader>
                          <CustomImage></CustomImage>
                        </>
                      ) : (
                          <></>
                        )}
                      <CustomName
                        setName={(val) => setname(val)}
                        name={name}
                        type={type}
                      ></CustomName>
                      <CustomEmail
                        setEmail={(val) => setemail(val)}
                        email={email}
                        type={type}
                      ></CustomEmail>

                      <PhoneNumberCustom
                        setNumber={(val) => setphone(val)}
                        phone={phone}
                        type={type}
                        isChecked={isChecked}

                        setChecked={() => setisChecked(!isChecked)}
                      ></PhoneNumberCustom>
                      <div>
                        <p>Already registered? Please <Link href="/login"><b className="click-here">click here</b></Link></p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="sf-forms mobile-otp opacity-in"
                    id="sf-2"
                    style={{ display: counter == 1 ? "block" : "none" }}
                  >
                    <div className="lets-find-content">
                      <h2>
                        Verify your mobile
                          <br />
                          number
                        </h2>
                      <CustomImage></CustomImage>
                      <Otp
                        setotp={(val) => setotp(val)}
                        otp={otp}
                        error={otpError}
                        resend={() => signUpUser("val")}
                      ></Otp>
                    </div>
                  </div>

                </form>

                {counter < 6 ? (
                  <CustomButtons
                    nextValid={validNext()}
                    counterStep={(i) => counterStep(i)}
                  ></CustomButtons>
                ) : (
                    <></>
                  )}
              </div>
            </div>
          </div>
        </section>
        <div
          className="sf-forms mobile-otp opacity-in"
          id="sf-2"
          style={{ display: counter == 2 ? "block" : "none" }}
        >
          <Thanks></Thanks>
        </div>
      </Layout>
      
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const primaryPath = "sign-up";
  const pageClasses = getClassesForPage(primaryPath);
  return { props: { pageClasses } };
}
export default signUp;
