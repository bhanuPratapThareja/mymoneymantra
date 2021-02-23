import React from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
class SocialLogin extends React.Component {
  handleSocialLogin = (success) => {
    console.log(success);
    const {profileObj:{email,name,googleId}}={...success}
    console.log(email,name,googleId);
    this.props.social({email,name,id:googleId,type:'google'})
  };
  handleSocialLoginFailure = (err) => {
    console.log(err);
  };
  handleSocialLoginCallBack = (usr, err) => {
    console.log(usr);
    console.log(err);
  };
  render() {
    return (
      <>
        <h5>OR</h5>
        <div className="social-options">
          <GoogleLogin
            clientId="750508944361-9vqjgfedgmrea1esca1p5umbddfk0r2j.apps.googleusercontent.com"
            onSuccess={this.handleSocialLogin}
            onFailure={this.handleSocialLoginFailure}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
              
              >
                <img src="assets/images/signup/google.svg" />
                Google
              </button>
            )}
          />

          <FacebookLogin
            appId="504870340912382"
            autoLoad={false}
            fields="name,email"
            callback={this.handleSocialLoginCallBack}
            render={(renderProps) => (
              <button onClick={renderProps.onClick}>
                <img src="assets/images/signup/facebook.svg" />
                Facebook
              </button>
            )}
          />
        </div>
      </>
    );
  }
}

export default SocialLogin;
