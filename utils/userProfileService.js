import Axios from "axios"
import { getApiData } from "../api/api"

export const getPersonalInfo=async ()=>{
   try{
       let customerId=await localStorage.getItem('customerId');
       let {url}=getApiData('getPersonalInfo');
   let response  = await Axios.get(url,{params:{customerId}});
   return response.data
   }
   catch(err){
       throw err.response.data
   }
}

export const savePersonalInfo=async (name,lastname,gender,martialStatus,panNo)=>{
    try{
        let customerId=await localStorage.getItem('customerId');
        const  {url,body}=getApiData('savePersonalInfo');
        body.customerId=customerId;
        body.firstName=name;
        body.lastName=lastname;
        body.gender=gender;
        body.martialStatus=martialStatus;
        body.panNo=panNo
    let response  = await Axios.post(url,body);
    return response.data
    }
    catch(err){
        throw err.response.data
    }
 }

 export const getContactInfo = async ()=>{
     try{
        let customerId=await localStorage.getItem('customerId');
        const  {url}=getApiData('contactProfile');
        let response  = await Axios.get(url,{params:{customerId}});
        return response.data;
     }
     catch(err){
         console.log(err);
         throw(err);
     }
 }