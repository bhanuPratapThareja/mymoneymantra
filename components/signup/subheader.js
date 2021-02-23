const SubHeader=(props)=>{
    return (<h2>
        {props.type=='login'?'Login':'Sign Up'} to your
        <br />
        account
      </h2>)
}

export default SubHeader;
