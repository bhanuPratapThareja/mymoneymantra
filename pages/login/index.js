import Layout from "../../components/Layout";
import { getClassesForPage } from "../../utils/classesForPage";
import WelcomeHeader from "../../components/signup/header";
import MobileWelcomeHeader from "../../components/signup/mobile-header";
import CustomButtons from "../../components/signup/custom-buttons";
import PhoneNumberCustom from "../../components/signup/phone";
import Otp from "../../components/signup/Otp";
import Thanks from "../../components/signup/thanks";
import { messgaes } from "../../utils/messages";
import { useEffect, useState } from "react";
import { sendLoginOtp, verifyOtp } from "../../utils/otp";
import Loader from "../../components/common/Loader";
const login = (props) => {
  const [counter, setcounter] = useState(0);
  const [phone, setphone] = useState("");
  const [otp, setotp] = useState("");
  const [otpId, setOtpId] = useState("");
  const [isPartner, setisPartner] = useState(false);
  const [type, settype] = useState("login");
  const [isChecked, setisChecked] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const counterStep = (i) => {
    if (i == 1 && counter == 0) {
      setisLoader(true);
      sendLoginOtp(phone)
        .then((res) => {
          const { otpId, customerId, message } = res;
          setOtpId(otpId);
          // localStorage.setItem("customerId", customerId);
          setcounter(counter + 1);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {setisLoader(false)});
    } else if (otp.length > 0 && counter == 1 && i == 1) {
      setisLoader(true);
      console.log('in opt');
      verifyOtp(phone, otp, otpId).then((res) => {
          console.log(res);
          setcounter(counter + 1);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => setisLoader(false));
    } else if (counter == 1 && i == -1) {
      setcounter(counter + i);
    }
  };
  return (
    <div className={props.pageClasses}>
      <Layout>
        <WelcomeHeader></WelcomeHeader>
        <section
          data-aos="fade-up"
          className="container lets-find-container aos-init aos-animate"
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
                    <PhoneNumberCustom
                      setNumber={(val) => setphone(val)}
                      phone={phone}
                      type={type}
                      isChecked={isChecked}
                      setChecked={() => setisChecked(!isChecked)}
                    ></PhoneNumberCustom>
                  </div>
                  <div
                    className="sf-forms mobile-otp opacity-in"
                    id="sf-2"
                    style={{ display: counter == 1 ? "block" : "none" }}
                  >
                    <Otp setotp={(val) => setotp(val)} otp={otp}></Otp>
                  </div>
                </form>
                <div
                  className="sf-forms mobile-otp opacity-in"
                  id="sf-2"
                  style={{ display: counter == 2 ? "block" : "none" }}
                >
                  <Thanks></Thanks>
                </div>
                {counter !== 2 ? (
                  <CustomButtons
                    nextValid={
                      (phone.length == 10 && isChecked) ||
                      (counter == 1 && otp.length > 0)
                        ? false
                        : true
                    }
                    prevValid={false}
                    counterStep={(i) => counterStep(i)}
                  ></CustomButtons>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <Loader
        msg={counter == 0 ? messgaes.otpSent : messgaes.validateOtp}
        isActive={isLoader}
      ></Loader>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const primaryPath = "sign-up";
  const pageClasses = getClassesForPage(primaryPath);
  return { props: { pageClasses } };
}
export default login;
