import LoadingOverlay from 'react-loading-overlay';
const Loader = (props)=>{
return(
    <LoadingOverlay
    active={props.isActive}
    spinner
    text={props.msg}
    >
    {/* <p>Some content or children or something.</p> */}
  </LoadingOverlay>
)
}

export default Loader;