export const keys={
    customerId:'customerId',
}

export const setItem = (key,data) =>{
    if(!data){
        sessionStorage.setItem(key,null); 
    }
    else{
    sessionStorage.setItem(key,encrypt(data));
}
}
export const clearKey = (key) =>{
    sessionStorage.removeItem(key);
}

export const getItem = (key) =>{
    
    let val = sessionStorage.getItem(key);
    if(!val) return null;
    
        val = decrpyt(val);
        if( key === key.customerId){
            parseInt(val)
        }
        return val;
}

const encrypt = (val)=>{
    
    return btoa(val)
}

const decrpyt =(val)=>{
    return  atob(val);
    
}