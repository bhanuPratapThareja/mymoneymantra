import CustomImage from './image';
import SubHeader from './subheader';
const CustomEmail=(props)=>{
  const validateEmail=(e)=>{
      console.log(e.target.value);
      // if(/^[6-9]{1}[0-9]{0,9}$/gi.test(e.target.value)||e.target.value===''){
          props.setEmail(e.target.value);
      // }
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
      </div>
    
)
}


export default CustomEmail;