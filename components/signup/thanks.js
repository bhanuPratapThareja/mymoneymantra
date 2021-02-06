const Thanks=(props)=>{
    return (
        <div className="combined-wrapper">
    <section className="banner container">
    <div className="thankyou-banner">
        <div className="top">
            <img src="assets/images/signup/congrats.svg" />
            <h2>Congratulations!</h2>
            <h5> You have successfully<br />{props.type=='login'?'logged':'signed up'} into your account</h5>
        </div>
        <div className="bottom">
            <h6>Go to your dashboard to start your journey and ease up your application process</h6>
            <div className="track-button">
                <button ><a href="/">Let’s Go</a></button>
            </div>
        </div>
    </div>
</section>
</div>)
}


export default Thanks;