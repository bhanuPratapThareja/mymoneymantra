import CustomImage from "./image";
import SubHeader from "./subheader";

const CustomLastName=(props)=>{
    const validateName=(e)=>{
        
        if(/^[a-z]{0,30}$/gi.test(e.target.value)||e.target.value===''){
          props.setName(e.target.value);
      }
    }
    return ( 
        <div className="lets-find-content">
         <SubHeader type={props.type}></SubHeader>
          <CustomImage></CustomImage>
          <div className="login-options">
            <div className="login-options-wrapper">
              <div className="form__group field">
                <input
                  className="form__field"
                  type="text"
                  id="name"
                  placeholder="last name"
                  required=""
                  value={props.lastname}
                  onChange={(e)=>validateName(e)}
                />
                <label className="form__label" htmlFor="name">
                  Last Name
                </label>
              </div>
              </div>
          </div>
        </div>
      
)
}


export default CustomLastName;