import AccountSummary from '../../components/CreditScore/AccountSummary'
import CreditOverview from '../../components/CreditScore/CreditOverview'
import CreditScoreBanner from '../../components/CreditScore/CreditScoreBanner'
import FactorsAffecting from '../../components/CreditScore/FactorsAffecting'
import OffersForYou from '../../components/CreditScore/OffersForYou'
import TipSection from '../../components/CreditScore/TipSection'
import Layout from '../../components/Layout'
import { getClassesForPage } from '../../utils/classesForPage'

const userProfile = (props) => {
  return (
    <div className={props.pageClasses}>
      <Layout>
        <div className="profile-head">
        <div className="profile-container container">
         <div className="profile-head-wrapper">
            <div className="profile-image"><img src="build/images/icons/people1.png" /></div>
            <h1>Venkitaraman Hariharan</h1>
            <div className="profile-progress">
               <div className="inner">
                  <div className="percent-bar"><div className="perctange-wrap"><h6 id="percentage">57%</h6></div></div>
               </div>
            </div>
            <p>Complete your profile for the best results and ease up your application process</p>
         </div>
         <div className="profile-options-wrapper">
            <div className="option-wrapper">
               <div id="option-1" className="option question-open">
                  <h3>Personal Information</h3>
                  <svg className="question-active" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-1-data" style={{display: 'block'}}>
                  <div className="personal-wrapper">
                     <form className="personal-forms-wrapper">
                        <h5>Full Name</h5>
                        <div className="shortforms-container personal-style">
                           <div className="form__group field">
                              <input value="" className="form__field" type="text" id="mother-f-name" placeholder="First Name" required="" />
                              <label className="form__label" for="mother-f-name">First Name</label>
                           </div>
                           <div className="form__group field">
                              <input value="" className="form__field" type="text" id="mother-l-name" placeholder="Last Name" required="" />
                              <label className="form__label" for="mother-l-name">Last Name</label>
                           </div>

                        </div>
                        <h5>Date of Birth</h5>
                        <div className="shortforms-container personal-style">
                           <div className="form__group field">
                              <div role="wrapper" className="gj-datepicker gj-datepicker-md gj-unselectable"><input value="" className="form__field profile-dob datepicker gj-textbox-md" type="text" id="dob" placeholder="MM / DD / YYYY" required="" data-type="datepicker" data-guid="2c92f534-a412-9063-7136-166bf9b6a4d8" data-datepicker="true" role="input" /><i className="gj-icon" role="right-icon" >event</i></div>
                              <label className="form__label" for="dob">Date of Birth</label>
                           </div>
                        </div>
                        <h5>Gender</h5>
                        <div className="shortforms-container gender-style">
                           <input value="" className="lets-checkbox" type="radio" id="female" name="gender" required="" />
                           <input value="" className="lets-checkbox" type="radio" id="male" name="gender" required="" />
                           <input value="" className="lets-checkbox" type="radio" id="other" name="gender" required="" />

                           <label for="female">Female</label>
                           <label for="male">Male</label>
                           <label for="other">Other</label>
                        </div>
                        <h5>Marital Status</h5>
                        <div className="shortforms-container marital-style">
                           <input value="" className="lets-checkbox" type="radio" id="single" name="Marital" required="" />
                           <input value="" className="lets-checkbox" type="radio" id="married" name="Marital" required="" />
                           <input value="" className="lets-checkbox" type="radio" id="separated" name="Marital" required="" />
                           <input value="" className="lets-checkbox" type="radio" id="divorced" name="Marital" required="" />
                           <input value="" className="lets-checkbox" type="radio" id="widowed" name="Marital" required="" />

                           <label for="single">Single</label>
                           <label for="married">Married</label>
                           <label for="separated">Separated</label>
                           <label for="divorced">Divorced</label>
                           <label for="widowed">Widowed</label>
                        </div>
                        <h5>PAN Number</h5>
                        <div className="shortforms-container">
                           <div className="form__group field">
                               <input value="" className="form__field" type="text" id="l-pan" placeholder="PAN Number" required="" />
                               <label className="form__label" for="l-pan">PAN Number</label>
                           </div>
                        </div>
                        
                        <div className="save-options">
                           <button type="button" className="save-personal" id="save-personal">Save</button>
                           <button type="button" className="cancel" id="cancel">Cancel</button>
                        </div>
                     </form>

                     <div className="before-edit">
                        <div className="shortforms-container">
                           <div className="form__group field">
                              <input readonly="" className="form__field" type="text" value="Venkitaraman Hariharan" id="full-name" placeholder="Full Name" required="" />
                              <label className="form__label" for="full-name">Full Name</label>
                           </div>
                           <div className="form__group field">
                              <input readonly="" className="form__field" type="text" value="01 / 11 / 2020" id="dob" placeholder="Date of Birth" required="" />
                              <label className="form__label" for="dob">Date of Birth</label>
                           </div>
                           <div className="form__group field">
                              <input readonly="" className="form__field" type="text" value="Male" id="gender" placeholder="Gender" required="" />
                              <label className="form__label" for="gender">Gender</label>
                           </div>
                           <div className="form__group field">
                              <input readonly="" className="form__field" type="text" value="Single" id="marital-Status" placeholder="Marital Status" required="" />
                              <label className="form__label" for="marital-Status">Marital Status</label>
                           </div>
                           <div className="form__group field">
                              <input readonly="" className="form__field" type="text" value="XXXX728KYZ1" id="pan-num" placeholder="PAN Number" required="" />
                              <label className="form__label" for="pan-num">PAN Number</label>
                           </div>
                        </div>
                        <button type="button" id="edit-personal" className="edit-button">Edit</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="option-wrapper">
               <div id="option-2" className="option">
                  <h3>Contact Information</h3>
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-2-data">
                  <form className="contact-wrapper">
                     <div className="shortforms-container">
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="+91 8790765432" id="mob-num" placeholder="Mobile Number" required="" />
                           <label className="form__label" for="mob-num">Mobile Number</label>
                        </div>
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="venkat90@gmail.com" id="email" placeholder="Email ID" required="" />
                           <label className="form__label" for="email">Email ID</label>
                        </div>
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="A-99, Manish Marg, Nemi Nagar, Jaipur, Rajasthan-302021" id="current-address" placeholder="Current Address" required="" />
                           <label className="form__label" for="current-address">Current Address</label>
                        </div>
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="B-21, Rajouri Garden, New Delhi, Delhi-110021" id="permanent-address" placeholder="Permanent Address" required="" />
                           <label className="form__label" for="permanent-address">Permanent Address</label>
                        </div>
                     </div>
                     <div className="save-options">
                        <button type="button" className="save-contact" id="save-contact">Save</button>
                        <button type="button" className="cancel" id="cancel">Cancel</button>
                     </div>

                     <button type="button" id="edit-contact" className="edit-button">Edit</button>
                  </form>
               </div>
            </div>
            <div className="option-wrapper">
               <div id="option-3" className="option">
                  <h3>Work Information</h3>
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-3-data">
                  <form className="work-wrapper">
                     <div className="shortforms-container">
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="Salaried" id="emp-type" placeholder="Employment Type" required="" />
                           <label className="form__label" for="emp-type">Employment Type</label>
                        </div>
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="Earnest &amp; Young Co." id="company-name" placeholder="Company Name" required="" />
                           <label className="form__label" for="company-name">Company Name</label>
                        </div>
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="₹ 5,00,000" id="monthly-income" placeholder="Net Monthly Income" required="" />
                           <label className="form__label" for="monthly-income">Net Monthly Income</label>
                        </div>
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="HDFC Bank" id="bank-name" placeholder="Bank Name" required="" />
                           <label className="form__label" for="bank-name">Bank Name</label>
                        </div>
                        <div className="form__group field read-part">
                           <input readonly="" className="form__field" type="text" value="HDFC Bank" id="account-num" placeholder="Account Number" required="" />
                           <label className="form__label" for="account-num">Account Number</label>
                        </div>
                     </div>
                     <div className="save-options">
                        <button type="button" className="save-work" id="save-work">Save</button>
                        <button type="button" className="cancel" id="cancel">Cancel</button>
                     </div>

                     <button type="button" id="edit-work" className="edit-button">Edit</button>
                  </form>
               </div>
            </div>
            <div className="option-wrapper">
               <div id="option-4" className="option">
                  <h3>Documents</h3>
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-4-data">
                  <div className="documents-wrapper">
                     <div className="docs-container">
                        <span>Identity Proof</span>
                        <div className="identity-options col-span">
                           <div className="options">
                              <h5>Aadhaar Card</h5>
                              <div><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z" fill="#fff"></path></svg><h6>aadhaar.jpeg</h6></div>
                              <span>uploaded successfully</span>
                           </div>
                        </div>
                        <div className="identity-options">
                           <div className="options">
                              <h5>PAN Card</h5>
                              <span className="error">please upload a .jpeg/pdf file</span>
                           </div>
                        </div>

                     </div>

                     <div className="docs-container">
                        <span>Income Proof</span>
                        <div className="identity-options col-span">
                           <div className="options">
                              <h5>Bank Statements</h5>
                              <div><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z" fill="#fff"></path></svg><h6>apr19-mar20.pdf</h6></div>
                              <span>uploaded successfully</span>
                           </div>
                        </div>
                        <div className="identity-options">
                           <div className="options">
                              <h5>Salary Slips</h5>
                              <div><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z" fill="#fff"></path></svg><h6>3monthslip.jpeg</h6></div>
                              <span>uploaded successfully</span>
                           </div>
                        </div>
                        <div className="identity-options">
                           <div className="options">
                              <h5>Form 16 / 26AS / ITR</h5>
                              <div><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z" fill="#fff"></path></svg><h6>form16A.pdf</h6></div>
                              <span>uploaded successfully</span>
                           </div>
                        </div>

                     </div>

                     <div className="docs-container">
                        <span>Address Proof</span>
                        <div className="identity-options col-span">
                           <div className="options">
                              <h5>Rent Agreement</h5>
                              <div><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z" fill="#fff"></path></svg><h6>Rent.pdf</h6></div>
                              <span>uploaded successfully</span>
                           </div>
                        </div>
                        <div className="identity-options">
                           <div className="options">
                              <h5>Electricity / Water / Telephone / Utility Bill</h5>
                              <div><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z" fill="#fff"></path></svg><h6>Electricity.pdf</h6></div>
                              <span>uploaded successfully</span>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
            <div className="option-wrapper">
               <div id="option-5" className="option">
                  <h3>Application</h3>
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-5-data">
                  <div className="applications-cards-wrapper">
                     <div className="popular-cards-slider-card">
                        <div className="popular-cards-slider-card-top">
                           <div className="head">
                              <h3><b className="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                              <img src="build/images/icons/citi-logo.png" />
                           </div>
                           <h2>Lifetime win points</h2>
                           <h5>Application No#1234567890</h5>
                        </div>
                        <div className="popular-cards-slider-card-bottom">
                           <div>
                              <h5>Application Status: Successful</h5>
                           </div>
                        </div>
                     </div>
                     <div className="popular-cards-slider-card">
                        <div className="popular-cards-slider-card-top">
                           <div className="head">
                              <h3><b className="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                              <img src="build/images/icons/citi-logo.png" />
                           </div>
                           <h2>Lifetime win points</h2>
                           <h5>Application No#1234567890</h5>
                        </div>
                        <div className="popular-cards-slider-card-bottom">
                           <div>
                              <h5>Application Status: Successful</h5>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="option-wrapper">
               <div id="option-6" className="option">
                  <h3>Offers</h3>
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-6-data">
                  <div className="offers-cards-wrapper">
                     <div className="popular-cards-slider-card">
                        <div className="popular-cards-slider-card-top">
                           <div className="head">
                              <h3><b className="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                              <img src="build/images/icons/citi-logo.png" />
                           </div>
                           <div className="content">
                              <ul>
                                 <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores
                                 </li>
                                 <li>Instant Redemption at select partner stores</li>
                              </ul>
                           </div>
                        </div>
                        <div className="popular-cards-slider-card-bottom">
                           <div>
                              <h5>Lifetime reward points</h5>
                           </div>
                        </div>
                     </div>
                     <div className="popular-cards-slider-card">
                        <div className="popular-cards-slider-card-top">
                           <div className="head">
                              <h3><b className="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                              <img src="build/images/icons/citi-logo.png" />
                           </div>
                           <div className="content">
                              <ul>
                                 <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores
                                 </li>
                                 <li>Instant Redemption at select partner stores</li>
                              </ul>
                           </div>
                        </div>
                        <div className="popular-cards-slider-card-bottom">
                           <div>
                              <h5>Lifetime reward points</h5>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
            <div className="option-wrapper">
               <div id="option-7" className="option">
                  <h3>Refer &amp; Earn</h3>
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-7-data">
                  <div className="refer-cards-wrapper">
                     <div className="refer-card">
                        <h3>Reward Points</h3>
                        <ul>
                           <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores</li>
                           <li>Instant Redemption at select partner stores</li>
                        </ul>
                        <div className="redeem">
                           <div className="points">
                              <span>Your Points</span>
                              <h5>3900</h5>
                           </div>
                           <button>Redeem Now</button>
                        </div>
                     </div>
                     <div className="refer-card">
                        <h3>Referral Code</h3>
                        <ul>
                           <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores</li>
                           <li>Instant Redemption at select partner stores</li>
                        </ul>
                        <div className="redeem">
                           <div className="points">
                              <span>Your Code</span>
                              <h5>XU79D</h5>
                           </div>
                           <button>Refer Now</button>
                        </div>
                     </div>
                     <div className="refer-card">
                        <h3>Invite</h3>
                        <ul>
                           <li>Earn 10 reward points for every ₹125 spent at apparel &amp; department stores</li>
                           <li>Instant Redemption at select partner stores</li>
                        </ul>
                        <div className="redeem">
                           <div className="points">
                              <span>Your Points</span>
                              <h5>2300</h5>
                           </div>
                           <button>Invite Now</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="option-wrapper">
               <div id="option-8" className="option">
                  <h3>Help</h3>
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                  </svg>
               </div>
               <div className="option-data" id="option-8-data">
                  <p>To get help regarding any of our service related issues you can contact us at</p>
                  <a href="contactus@mymoneymantra.com"><button>contactus@mymoneymantra.com</button></a>
               </div>
            </div>

         </div>
      </div>
    </div>
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'user-profile'
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses } }
}
export default userProfile;
