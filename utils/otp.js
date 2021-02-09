import Axios from "axios"
import { getApiData } from '../api/api'

export const sendLoginOtp= async (number)=>{
    try{
    const {url,body} =getApiData('login');
    body.mobileNo=number;
    let response= await Axios.post(url,body);
    console.log(response);
    return response.data
    }
    catch(err){
        console.log(err.response);
        throw err.response.data
    }
}

export const socialLoginAPi= async (email,type,token)=>{
    try{
        const {url,body}=getApiData('socialLogin')

        body.emailId=email;
        body.tokenType=type;
        body.token=token;
        let response= await Axios.post(url,body);
    console.log(response);
    return response.data

    }
    catch(err){
        console.log(err);
        throw(err);
    }
}

export const sendSignUpOtp=async (name,email,number,token,type)=>{
    try{
        const {url,body}=getApiData('signUp');
        
        body.firstName= name;
        body.lastName= null;
        body.token=token;
        body.tokenType=type;
        body.mobileNo=parseInt(number);
        body.emailId=email;
        body.panNo=null;
        
          
          console.log(body);
          let response= await Axios.post(url,body);
          console.log(response);
          return response.data
          }
          catch(err){
              console.log(err.response);
              throw err.response.data
          }
}

export const verifyOtp=async (number,otp,id)=>{
    try{
        console.log('inotp2')
        const {url,body}=getApiData('loginOtpVerify');
        console.log(url,body);
        body.mobileNo=number.toString();
        body.otp=otp.toString();
        body.otpId=id;
        console.log(body);
        let response= await Axios.post(url,body);
        console.log(response);
        return response.data
        }
        catch(err){
            console.log(err.response);
            throw err.response.data
        }
}


