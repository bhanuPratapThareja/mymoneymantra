import { useEffect } from 'react'
import $ from 'jquery'
import Router from 'next/router';

function ShortExtendedForm ({basePath}) {

    useEffect(() => {

        $("#lets-go").click(function () {
            $(".lets-find-forms-container").removeClass("moving-in-rev")
            $(".lets-find").removeClass("moving-out-rev")
            $(".lets-find-forms-container").addClass("moving-in")
            $(".lets-find").addClass("moving-out")
        })

        $(".shortforms-container-buttons #next").click(function () {
            plusSlides(1);
        }).bind(this)
        $(".shortforms-container-buttons #previous").click(function () {
            plusSlides(-1);
        })
        //short forms slider
        var slideIndex = 1;
        showSlides(slideIndex);
        // Next/previous control
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("sf-forms");
            if (n >= slides.length) {
                $("#button-text").text("Submit and view offers").css("color", "#89C142");
                $("#next").addClass("submit-short-form");

            } else {
                $("#button-text").text("Next").css("color", "#221F1F");
                $("#next").removeClass("submit-short-form");
            }
            if (n > slides.length) {
               submitShortForm();
                return
            }
            if (n < 1) {
                slideIndex = slides.length;
                $(".lets-find-forms-container").removeClass("moving-in")
                $(".lets-find").removeClass("moving-out")
                $(".lets-find-forms-container").addClass("moving-in-rev")
                $(".lets-find").addClass("moving-out-rev")
                $("#button-text").text("Next")
                $("#next").removeClass("submit-short-form");
                slideIndex = 1;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex - 1].style.display = "block";
            slides[slideIndex - 1].classList.add("opacity-in")
            var width = (slideIndex * (100 / slides.length)) + "%";
            $("#pages-count").text(slideIndex + " of " + slides.length);
            $(".progress-blue").width(width);
        }

    }, []);

    const submitShortForm = ()=>{
        Router.push(`${basePath}/loan-listing`)
    }
    

    return <section data-aos="fade-up" className="container lets-find-container aos-init aos-animate">
        <div className="mobile-background"></div>
        <div className="mobile-content">
            <h1>Credit cards for<br />all your needs.</h1>
        </div>

        <div className="all-form-wrapper">
            <div className="lets-find">
                <div className="lets-find-content">
                    <h2>Let’s find the best credit card for you.</h2>
                    {/* <img className="green-underline" src="../images/credit-card-flow/green-underline.png" /> */}
                    <p>Leo cras nibh diam integer magnis dolor nulla ut ullamcorper. Libero ornare nec rhoncus augue morbi scelerisque in. Auctor venenatis vitae pellentesque egestas.</p>
                </div>
                <div className="lets-find-form">
                    <form>
                        <div className="form__group field">
                            <input className="form__field" type="text" id="full_name" placeholder="Full name" required="" />
                            <label className="form__label" for="full_name">Full name</label>
                        </div>
                        <div className="form__group field">
                            <input className="form__field" type="tel" id="phone" placeholder="+91" required="" />
                            <label className="form__label" for="phone">Phone number</label>
                        </div>
                        <div className="form__group field">
                            <input className="form__field" type="text" id="email" placeholder="Email address" required="" />
                            <label className="form__label" for="email">Email address</label>
                        </div>
                    </form>
                    <div className="agree">
                        <div className="checkbox-container">
                            <div className="checkbox">
                                <input type="checkbox" id="checkbox" name="" value="" />
                                <label for="checkbox"><span>
                                    I allow and authorize MyMoneyMantra and its partners to override the DND
                                    registry
                                    and
                                    contact me by phone, e-mail or SMS about their products and services. I
                                    further
                                    accept and
                                 agree to their <a href="#" target="_blank">Terms of Use</a> and <a href="#" target="_blank">Privacy Policy</a>.
                              </span></label>
                            </div>
                        </div>
                    </div>
                    <div className="lets-go-button">
                        <button id="lets-go">Let's go!</button>
                    </div>
                </div>
            </div>

            <div className="lets-find-forms-container">
                <div className="lets-find-stepper-wrapper">
                    <div className="progress-grey">
                        <div className="progress-blue" style={{ width: '12.5%' }}></div>
                    </div>
                    <h5 className="pages"><span id="pages-count">1 of 8</span></h5>
                    <form className="short-forms-wrapper">
                        {/* <!--form-1--> */}
                        <div className="sf-forms opacity-in" id="sf-1" style={{ display: 'block' }}>
                            <h2>Are you a credit card holder?</h2>
                            <div className="shortforms-container">
                                <input className="lets-checkbox" type="radio" id="yes" name="yes/no" required="" />
                                <input className="lets-checkbox" type="radio" id="no" name="yes/no" required="" />
                                <input className="lets-checkbox" type="radio" id="mumbai" name="yes/no" required="" />
                                <input className="lets-checkbox" type="radio" id="chennai" name="yes/no" required="" />
                                <label for="yes">Yes</label>
                                <label for="no">No</label>
                                <div className="form__group-wrapper grid-span">
                                    <div className="form__group field">
                                        <input className="form__field drop" type="text" id="bank" placeholder="bank" required="" />
                                        <label className="form__label" for="email">Bank</label>
                                    </div>
                                    <div id="bank-drop" className="dropdown-content">
                                        <div className="dropdown-content-links">
                                            <a href="javascript:void(0)">Axis Bank</a>
                                            <a href="javascript:void(0)">American Express</a>
                                            <a href="javascript:void(0)">Andhra Bank</a>
                                            <a href="javascript:void(0)">Axis Bank</a>
                                            <a href="javascript:void(0)">American Express</a>
                                            <a href="javascript:void(0)">Andhra Bank</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--form-2--> */}
                        <div className="sf-forms" id="sf-2" style={{ display: 'none' }}>
                            <h2>What employment type best describes you?</h2>
                            <div className="shortforms-container">
                                <input className="lets-checkbox" type="radio" id="Salaried" name="employment" required="" />
                                <input className="lets-checkbox" type="radio" id="Self-employed-p" name="employment" required="" />
                                <input className="lets-checkbox" type="radio" id="Self-employed-b" name="employment" required="" />
                                <input className="lets-checkbox" type="radio" id="Not-employed" name="employment" required="" />
                                <label for="Salaried">Salaried</label>
                                <label for="Self-employed-p">Self-employed (Professional)</label>
                                <label for="Self-employed-b">Self-employed (Business)</label>
                                <label for="Not-employed">Not employed</label>
                            </div>
                        </div>
                        {/* <!--form-3--> */}
                        <div className="sf-forms" id="sf-3" style={{ display: 'none' }}>
                            <h2>Please provide us your date of birth</h2>
                            <div className="shortforms-container">
                                <div className="form__group field phone-grid-span">
                                    <div role="wrapper" className="gj-datepicker gj-datepicker-md gj-unselectable"><input className="form__field gj-textbox-md" type="text" id="dob" placeholder="MM / DD / YYYY" required="" data-type="datepicker" data-guid="951c900c-4bc7-a94b-7103-7a68da6ce3bd" data-datepicker="true" role="input" /><i className="gj-icon" role="right-icon">event</i></div>
                                    <label className="form__label" for="dob">Date of Birth</label>
                                </div>
                            </div>
                        </div>
                        {/* <!--form-4--> */}
                        <div className="sf-forms" id="sf-4" style={{ display: 'none' }}>
                            <h2>Please provide us your PAN card details</h2>
                            <div className="shortforms-container pan-card-cont">
                                <div className="form__group field">
                                    <input className="form__field" type="text" id="pancard" placeholder="PAN Card Number" required="" />
                                    <label className="form__label" for="pancard">PAN Card Number</label>
                                </div>
                                <div className="form__group field file-type">
                                    <input className="form__field upload-real" type="file" id="pancard-image" placeholder="PAN Card image" required="" />
                                    <input className="form__field upload-show" type="text" id="pancard-image-show" placeholder="PAN Card image" required="" />
                                    {/* <!-- <label className="form__label" for="pancard"><svg width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                        fill="white" />
                                    </svg>
                                    Upload PAN Card &nbsp;<b>(optional)</b></label> --> */}
                                    <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-cross" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z" fill="white"></path>
                                    </svg>
                                    <h5>Upload PAN Card <b>(optional)</b></h5>
                                </div>
                            </div>
                        </div>
                        {/* <!--form-5--> */}
                        <div className="sf-forms" id="sf-5" style={{ display: 'none' }}>
                            <h2>Which company do you work for?</h2>
                            <div className="shortforms-container">
                                <div className="form__group-wrapper grid-span">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="company" placeholder="bank" required="" />
                                        <label className="form__label" for="company">Company Name</label>
                                    </div>
                                    <div id="company-drop" className="dropdown-content">
                                        <div className="dropdown-content-links">
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--form-6--> */}
                        <div className="sf-forms" id="sf-6" style={{ display: 'none' }}>
                            <h2>How much do you earn monthly?</h2>
                            <div className="shortforms-container monthly-earn">
                                <div className="form__group field">
                                    <input className="form__field" type="text" id="m-income" value="" placeholder="Net monthly income" required="" />
                                    <label className="form__label" for="m-income">Net monthly income</label>
                                    <p id="word-number"></p>
                                </div>
                                <div className="form__group field file-type">
                                    <input className="form__field upload-real" value="" type="file" id="salary-image" placeholder="salary slip" required="" />
                                    <input className="form__field upload-show" value="" type="text" id="salary-image-show" placeholder="salary slip" readonly="" />
                                    {/* <!-- <label className="form__label" for="salary">
                                    </svg>
                                    Upload Salary Slips &nbsp;<b>(optional)</b></label> --> */}
                                    <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-cross" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z" fill="white"></path>
                                    </svg>
                                    <h5>Upload Salary Slips <b>(optional)</b></h5>
                                </div>
                            </div>
                        </div>
                        {/* <!--form-7--> */}
                        <div className="sf-forms" id="sf-7" style={{ display: 'none' }}>
                            <h2>Your salary gets credited in which bank?</h2>
                            <div className="shortforms-container pan-card-cont">
                                <div className="form__group-wrapper">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="bankname" placeholder="bankname" required="" />
                                        <label className="form__label" for="bankname">Company Name</label>
                                    </div>
                                    <div id="bankname-drop" className="dropdown-content">
                                        <div className="dropdown-content-links">
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                            <a href="javascript:void(0)">Ernst &amp; Young Consulting India Pvt Ltd</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="form__group field file-type">
                                    <input className="form__field upload-real" type="file" id="bank-statement" placeholder="salary slip" required="" />
                                    <input className="form__field upload-show" type="text" id="bank-statement-show" placeholder="salary slip" required="" />
                                    {/* <!-- <label className="form__label" for="salary"><svg width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                        fill="white" />
                                    </svg>
                                    </label> --> */}
                                    <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-cross" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z" fill="white"></path>
                                    </svg>
                                    <h5>Upload Bank Statements <b>(optional)</b></h5>
                                </div>
                            </div>
                        </div>
                        {/* <!--form-8--> */}
                        <div className="sf-forms extra-margin" id="sf-8" style={{ display: 'none' }}>
                            <h2>Please provide us your current address</h2>
                            <div className="shortforms-container current-address">
                                <div className="form__group field">
                                    <input className="form__field" type="text" id="pincode" value="" placeholder="pincode" required="" />
                                    <label className="form__label" for="pincode">Pincode</label>
                                </div>
                                <div className="form__group field">
                                    <input className="form__field" type="text" id="city" value="" placeholder="city" required="" />
                                    <label className="form__label" for="city">City</label>
                                </div>
                                <div className="form__group field grid-span">
                                    <input className="form__field" type="text" id="address-l-1" value="" placeholder="address" required="" />
                                    <label className="form__label" for="address-l-1">Address Line 1</label>
                                </div>
                                <div className="form__group field grid-span">
                                    <input className="form__field" type="text" id="address-l-2" value="" placeholder="address" required="" />
                                    <label className="form__label" for="address-l-2">Address Line 2</label>
                                </div>
                                <div className="form__group field file-type phone-grid-span">
                                    <input className="form__field upload-real" type="file" id="adhaar-image" placeholder="adhaar" required="" />
                                    <input className="form__field upload-show" type="text" id="adhaar-image-show" placeholder="adhaar" required="" />
                                    {/* <!-- <label className="form__label" for="adhaar"><svg width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                        fill="white" />
                                    </svg>
                                    Upload Address Proof &nbsp;<b>(optional)</b></label> --> */}
                                    <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-cross" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z" fill="white"></path>
                                    </svg>
                                    <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z" fill="white"></path>
                                    </svg>
                                    <h5>Upload Address Proof <b>(optional)</b></h5>
                                </div>
                            </div>
                        </div>
                    </form>


                    {/* <!--next and prev buttons--> */}
                    <div className="shortforms-container-buttons">
                        <button className="to-main" id="previous">
                            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.893 15.493a1.332 1.332 0 00-.28-.44l-6.666-6.666a1.34 1.34 0 00-1.894 1.893l4.4 4.387H9.333a1.334 1.334 0 000 2.666h10.12l-4.4 4.387a1.335 1.335 0 000 1.893 1.336 1.336 0 001.894 0l6.666-6.666c.122-.127.217-.277.28-.44a1.333 1.333 0 000-1.014z" fill="#fff"></path>
                            </svg>
                        </button>
                        <div>
                            <h4 id="button-text" style={{ color: 'rgb(34, 31, 31)' }}>Next</h4>
                            <button type="button" id="next">
                                <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.893 15.493a1.332 1.332 0 00-.28-.44l-6.666-6.666a1.34 1.34 0 00-1.894 1.893l4.4 4.387H9.333a1.334 1.334 0 000 2.666h10.12l-4.4 4.387a1.335 1.335 0 000 1.893 1.336 1.336 0 001.894 0l6.666-6.666c.122-.127.217-.277.28-.44a1.333 1.333 0 000-1.014z" fill="#fff"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default ShortExtendedForm