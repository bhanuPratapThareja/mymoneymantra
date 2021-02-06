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
import { sendSignUpOtp, verifyOtp } from "../../utils/otp";
import Loader from "../../components/common/Loader";
import { messgaes } from "../../utils/messages";

const signUp = (props) => {
  const [counter, setcounter] = useState(0);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [pan, setpan] = useState("");
  const [lastname, setlastname] = useState("");
  const [otp, setotp] = useState("");
  const [isPartner, setisPartner] = useState(false);
  const [type, settype] = useState("sign up");
  const [isChecked, setisChecked] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [isLoader, setisLoader] = useState(false);
  const counterStep = (i) => {
    if ((i == 1 && counter < 4) || (i == -1 && counter !== 0)) {
      setcounter(counter + i);
    } else if (i == 1 && counter == 3) {
      console.log("here");
      signUpUser();
    } else if (i == 1 && counter == 4) {
      verifyOTP();
    }
    console.log(counter);
  };
  const validNext = () => {
    switch (counter) {
      case 0:
        return name.length > 2 ? false : true;
      case 1:
        return lastname.length > 2 ? false : true;
      case 2:
        return email.length > 10 ? false : true;
      
      case 3:
        return phone.length == 10 && isChecked == true ? false : true;
      default:
        return false;
    }
  };
  const verifyOTP = () => {
    setisLoader(true);
    verifyOtp(phone, otp, otpId)
      .then((res) => {
        setcounter(counter + 1);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setisLoader(false));
  };
  const signUpUser = () => {
    setisLoader(true);
    sendSignUpOtp(name, lastname, email, pan, phone)
      .then((res) => {
        const { otpId, customerId, message } = res;
        setOtpId(otpId);
        // localStorage.setItem("customerId", customerId);
        setcounter(counter + 1);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setisLoader(false);
      });
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
                    <CustomName
                      setName={(val) => setname(val)}
                      name={name}
                      type={type}
                    ></CustomName>
                  </div>
                  <div
                    className="sf-forms opacity-in"
                    id="sf-1"
                    style={{ display: counter == 1 ? "block" : "none" }}
                  >
                    <CustomLastName
                      setName={(val) => setlastname(val)}
                      name={lastname}
                      type={type}
                    ></CustomLastName>
                  </div>
                  <div
                    className="sf-forms opacity-in"
                    id="sf-1"
                    style={{ display: counter == 2 ? "block" : "none" }}
                  >
                    <CustomEmail
                      setEmail={(val) => setemail(val)}
                      email={email}
                      type={type}
                    ></CustomEmail>
                  </div>
              
                  <div
                    className="sf-forms opacity-in"
                    id="sf-1"
                    style={{ display: counter == 3 ? "block" : "none" }}
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
                    style={{ display: counter == 4 ? "block" : "none" }}
                  >
                    <Otp setotp={(val) => setotp(val)} otp={otp}></Otp>
                  </div>
                </form>
                <div
                  className="sf-forms mobile-otp opacity-in"
                  id="sf-2"
                  style={{ display: counter == 5 ? "block" : "none" }}
                >
                  <Thanks></Thanks>
                </div>
                {counter<6?<CustomButtons
                  nextValid={validNext()}
                  counterStep={(i) => counterStep(i)}
                ></CustomButtons>:<></>}
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
export default signUp;
