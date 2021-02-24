import CustomImage from "./image";
import SubHeader from "./subheader";

const CustomName=(props)=>{
    const validateName=(e)=>{
        console.log(e.target.value);
        if(/^[a-z]{0,30}[\s]{0,1}[a-z]{0,30}$/gi.test(e.target.value)||e.target.value===''){
            props.setName(e.target.value);
        }
    }
    return ( 
        
          <div className="login-options">
            <div className="login-options-wrapper">
              <div className="form__group field">
                <input
                  className="form__field"
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  required=""
                  value={props.name}
                  onChange={(e)=>validateName(e)}
                />
                <label className="form__label" htmlFor="name">
                Full Name
                </label>
              </div>
              {/* {props.type!=='login'?<SocialLogin></SocialLogin>:<></>} */}
              </div>
          </div>
        
      
)
}


export default CustomName;