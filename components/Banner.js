const Banner = () => (
    <section className="banner">
        <div className="banner-wrapper">
            <div className="normal-banner">
                <h1><b>Business Growth</b><br />Loan</h1>
                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
                        duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                <button>Compare and Apply</button>
            </div>
            <img style={{ width: '50%' }} className="" src="images/business-loan/banner.svg" alt="" />
        </div>
        <div className="container banner-features-container">
            <div className="banner-features">
                <div className="banner-features-block">
                    <img src="images/credit-card-flow/sheild.svg" alt="" />
                    <h3>Safe and Secure</h3>
                    <p>Est quis mattis elit mi. Ut vitae eget risus gravida purus a, etiam morbi. Ante quisque enim
                    neque, varius pellentesque at.
                        </p>
                </div>
                <div className="banner-features-block">
                    <img src="images/credit-card-flow/sheild.svg" alt="" />
                    <h3>Fast Disbursals</h3>
                    <p>Sed consequat ultricies sed gravida. Ridiculus cursus eget vitae, malesuada auctor. Tempor
                    mollis
                    pretium, ridiculus phasellus.
                        </p>
                </div>
                <div className="banner-features-block">
                    <img src="images/credit-card-flow/sheild.svg" alt="" />
                    <h3>Personalised</h3>
                    <p>Tristique leo aliquam ut interdum id ut. Hac quis faucibus vestibulum, amet, elit. At eu in
                    quam
                    eu arcu eget.
                        </p>
                </div>
            </div>
        </div>
    </section>
);

export default Banner