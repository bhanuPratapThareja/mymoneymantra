import CustomImage from './image';
import SubHeader from './subheader';
const CustomEmail=(props)=>{
  const validateEmail=(e)=>{
      console.log(e.target.value);
      
          props.setEmail(e.target.value);
      
  }
  return ( 
      
        <div className="login-options">
          <div className="login-options-wrapper">
            <div className="form__group field">
              <input
                className="form__field"
                type="email"
                id="name"
                
                placeholder="email"
                required=""
                value={props.email}
                onChange={(e)=>validateEmail(e)}
              />
              <label className="form__label" htmlFor="name">
                Email
              </label>
            </div>
            </div>
        </div>
      
    
)
}


export default CustomEmail;