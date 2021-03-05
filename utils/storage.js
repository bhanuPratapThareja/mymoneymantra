export const keys={
    customerId:customerId,
}

export const setItem = (key,data) =>{
    sessionStorage.setItem(key,encrypt(data));
}

export const getItem = (key) =>{
    let val = sessionStorage.getItem(key);
        val = decrpyt(val);

        if( key === key.customerId){
            parseInt(val)
        }
        return val;
}

const encrypt = (val)=>{
    val=JSON.stringify(val);
    return btoa(val)
}

const decrpyt =(val)=>{
    val = atob(val);
    return JSON.parse(val);
}