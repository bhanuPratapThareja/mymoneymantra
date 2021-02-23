
import { useRouter } from 'next/router'

const Thanks=(props)=>{
    const router = useRouter();
    const handleClick = (e,link) => {
        e.preventDefault()
        router.push(link)
      }
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
                <button onClick={(e)=>handleClick(e,'/user-profile')}> Let’s Go</button>
            </div>
        </div>
    </div>
</section>
</div>)
}


export default Thanks;