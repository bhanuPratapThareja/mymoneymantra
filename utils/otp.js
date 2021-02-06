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

export const sendSignUpOtp=async (name,lastname,email,pan,number)=>{
    try{
        const {url,body}=getApiData('signUp');
        
        body.firstName= name;
        body.lastName= lastname;
        body.gender=null;
        body.martialStatus= null;
        body.panNo=pan;
        body.mobileNo=parseInt(number);
        body.emailId=email;
          
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


