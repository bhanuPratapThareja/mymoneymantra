const SFButtons = props => {
    const clickNextButton = () => {
        props.onClickNext ()
        if(props.onSubmitShortForm){
            props.onSubmitShortForm()
        }
    }

    return (
        <div className="shortforms-container-buttons">
            <button className="to-main" id="previous" onClick={props.onClickPrevious}>
                <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.893 15.493a1.332 1.332 0 00-.28-.44l-6.666-6.666a1.34 1.34 0 00-1.894 1.893l4.4 4.387H9.333a1.334 1.334 0 000 2.666h10.12l-4.4 4.387a1.335 1.335 0 000 1.893 1.336 1.336 0 001.894 0l6.666-6.666c.122-.127.217-.277.28-.44a1.333 1.333 0 000-1.014z" fill="#fff"></path>
                </svg>
            </button>
            <div>
                <h4 id="sms-button-text" style={{ color: 'rgb(34, 31, 31)' }}>Next</h4>
                <button type="button" className="next-otp-button" onClick={clickNextButton} disabled={props.disableOtpSubmitButton}>
                    <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.893 15.493a1.332 1.332 0 00-.28-.44l-6.666-6.666a1.34 1.34 0 00-1.894 1.893l4.4 4.387H9.333a1.334 1.334 0 000 2.666h10.12l-4.4 4.387a1.335 1.335 0 000 1.893 1.336 1.336 0 001.894 0l6.666-6.666c.122-.127.217-.277.28-.44a1.333 1.333 0 000-1.014z" fill="#fff"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default SFButtons