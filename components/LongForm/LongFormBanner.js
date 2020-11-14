import Strapi from "../../providers/strapi"
import { getFormCompletePercent } from '../../utils/getFormPercentage'
import LinearProgress from '@material-ui/core/LinearProgress';

class LongFormBanner extends React.Component {

    state = {
        gender: '',
        maritalStatus: '',
        proofOfAddress: '',
        commPurpose: '',
        director: '',
        member: '',
        firstName: '',
        lastName: '',
        fullName: '',
        percentageComplete: 0,
        totalValues: 18
    }

    handleNameInputs = (value,type) => {
        this.setState({ [type]: value }, () => {
            const fullName = this.state.firstName + ' ' + this.state.lastName
            this.setState({ fullName }, () => {
                this.handlePercentage()
            })
        })
    }

    handleChange = (value, type) => {
        this.setState({ [type]: value }, () => {
            this.handlePercentage()
        })
    }

    handlePercentage = () => {
        this.setState({
            percentageComplete: getFormCompletePercent({ ...this.state })
        })
    }

    getFormValues = () => { }

    render() {
        const strapi = new Strapi()
        const { bank_name, form_heading, product_type, banner_image } = this.props.data

        return (
            <div className="long-form">
                <section className="long-form-wrapper">
                    <div className="card-info">
                        <h5 className="app-form">{form_heading}</h5>
                        <h3><b>{bank_name}</b><br />{product_type}</h3>
                        <img src={`${strapi.baseUrl}${banner_image.url}`} />
                        <h4>Application form</h4>
                        <div className="form-range">
                            <h5><b id="long-form-complete">{this.state.percentageComplete}%</b> Complete</h5>
                            <div className="green-range-wrapper">
                                {/* <div className="green-range-track"></div> */}
                                <LinearProgress variant="determinate" value={this.state.percentageComplete} />
                            </div>
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <form>
                            <h3>Personal Details</h3>
                            <div className="long-forms-wrapper">
                                <h5><b>1.</b> Gender</h5>
                                <div className="shortforms-container long-gender" value={this.state.gender} onChange={e => this.handleChange(e.target.value, 'gender')}>
                                    <input className="lets-checkbox" type="radio" id="female" name="gender" value="female" required />
                                    <input className="lets-checkbox" type="radio" id="male" name="gender" value="male" required />
                                    <input className="lets-checkbox" type="radio" id="other" name="gender" value="other" required />

                                    <label htmlFor="female">Female</label>
                                    <label htmlFor="male">Male</label>
                                    <label htmlFor="other">Other</label>

                                </div>
                            </div>

                            {/* <!--full name--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>2.</b> Full Name</h5>
                                <div className="shortforms-container long-name">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="first-name" placeholder="First Name" required value={this.state.firstName} onChange={e => this.handleNameInputs(e.target.value, 'firstName')} />
                                        <label className="form__label" htmlFor="first-name">First Name</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="last-name" placeholder="Last Name" required value={this.state.lastName} onChange={e => this.handleNameInputs(e.target.value, 'lastName')} />
                                        <label className="form__label" htmlFor="last-name">Last Name</label>
                                    </div>

                                </div>
                            </div>

                            {/* <!--martial status--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>3.</b> Marital Status</h5>
                                <div className="shortforms-container long-gender" value={this.state.maritalStatus} onChange={e => this.handleChange(e.target.value, 'maritalStatus')}>
                                    <input className="lets-checkbox" type="radio" id="single" name="Marital" value="single" required />
                                    <input className="lets-checkbox" type="radio" id="married" name="Marital" value="married" required />
                                    <input className="lets-checkbox" type="radio" id="separated" name="Marital" value="separated" required />
                                    <input className="lets-checkbox" type="radio" id="divorced" name="Marital" value="divorced" required />
                                    <input className="lets-checkbox" type="radio" id="widowed" name="Marital" value="widowed" required />

                                    <label htmlFor="single">Single</label>
                                    <label htmlFor="married">Married</label>
                                    <label htmlFor="separated">Separated</label>
                                    <label htmlFor="divorced">Divorced</label>
                                    <label htmlFor="widowed">Widowed</label>

                                </div>
                            </div>

                            {/* <!--father name--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>4.</b> Father’s Name</h5>
                                <div className="shortforms-container long-name">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="father-f-name" placeholder="First Name" required />
                                        <label className="form__label" htmlFor="father-f-name">First Name</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="father-l-name" placeholder="Last Name" required />
                                        <label className="form__label" htmlFor="father-l-name">Last Name</label>
                                    </div>

                                </div>
                            </div>

                            {/* <!--mothers name--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>5.</b> Mother's Name</h5>
                                <div className="shortforms-container long-name">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="mother-f-name" placeholder="First Name" required />
                                        <label className="form__label" htmlFor="mother-f-name">First Name</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="mother-l-name" placeholder="Last Name" required />
                                        <label className="form__label" htmlFor="mother-l-name">Last Name</label>
                                    </div>

                                </div>
                            </div>

                            <div className="row-input-container">
                                {/* <!--dob--> */}
                                <div className="long-forms-wrapper">
                                    <h5><b>6.</b> Date of Birth</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field">
                                            <input className="form__field datepicker" type="text" id="dob" placeholder="MM / DD / YYYY"
                                                required />
                                            <label className="form__label" htmlFor="dob">Date of Birth</label>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--mothers name--> */}
                                <div className="long-forms-wrapper">
                                    <h5><b>7.</b> Nationality</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field">
                                            <input className="form__field" type="text" id="nationality" placeholder="Nationality"
                                                required />
                                            <label className="form__label" htmlFor="nationality">Nationality</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row-input-container">
                                {/* <!--Phone Number--> */}
                                <div className="long-forms-wrapper">
                                    <h5><b>8.</b> Phone Number</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field">
                                            <input className="form__field" type="number" id="phone-number" placeholder="Phone Number"
                                                required />
                                            <label className="form__label" htmlFor="phone-number">Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--Email ID--> */}
                                <div className="long-forms-wrapper">
                                    <h5><b>9.</b> Email ID</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field">
                                            <input className="form__field" type="text" id="email" placeholder="Email ID" required />
                                            <label className="form__label" htmlFor="email">Email ID</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3>Address Details</h3>

                            {/* <!--address details--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>10.</b> Residence Address</h5>
                                <div className="shortforms-container long-address">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="address-1" placeholder="Address Line 1" required />
                                        <label className="form__label" htmlFor="address-1">Address Line 1</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="address-2" placeholder="Address Line 2" required />
                                        <label className="form__label" htmlFor="address-2">Address Line 2</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="address-landmark"
                                            placeholder="Nearby Landmark (Optional)" required />
                                        <label className="form__label" htmlFor="address-2">Nearby Landmark (Optional)</label>
                                    </div>
                                    <div className="row-input-container">
                                        <div className="form__group field long-city">
                                            <input className="form__field" type="text" id="city" placeholder="City" required />
                                            <label className="form__label" htmlFor="city">City</label>
                                        </div>
                                        <div className="form__group field long-pincode">
                                            <input className="form__field" type="text" id="pincode" placeholder="Pincode" required />
                                            <label className="form__label" htmlFor="pincode">Pincode</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* <!--address proof--> */}
                            <div className="long-forms-wrapper" >
                                <h5><b>11.</b> Do you have a proof of address?</h5>
                                <div className="shortforms-container long-proof" value={this.state.proofOfAddress} onChange={e => this.handleChange(e.target.value, 'proofOfAddress')}>
                                    <input className="lets-checkbox" type="radio" id="l-yes" name="proof" value="l-yes" required />
                                    <input className="lets-checkbox" type="radio" id="l-no" name="proof" value="l-no" required />

                                    <label htmlFor="l-yes">Yes</label>
                                    <label htmlFor="l-no">No</label>
                                    <div className="form__group field file-type grid-span">
                                        <input className="form__field upload-real" type="file" id="l-address-image"
                                            placeholder="address proof" required />
                                        <input className="form__field upload-show" type="text" id="l-address-image-show"
                                            placeholder="address proof" required />

                                        <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                                fill="white" />
                                        </svg>
                                        <svg className="file-upload-cross" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                                                fill="white" />
                                        </svg>
                                        <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z"
                                                fill="white" />
                                        </svg>
                                        <h5>Upload Address Proof</h5>
                                    </div>

                                </div>
                            </div>

                            {/* <!--office details--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>12.</b> Office Address</h5>
                                <div className="shortforms-container long-address">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="off-address-1" placeholder="Address Line 1"
                                            required />
                                        <label className="form__label" htmlFor="off-address-1">Address Line 1</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="off-address-2" placeholder="Address Line 2"
                                            required />
                                        <label className="form__label" htmlFor="off-address-2">Address Line 2</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="off-address-landmark"
                                            placeholder="Nearby Landmark (Optional)" required />
                                        <label className="form__label" htmlFor="off-address-2">Nearby Landmark (Optional)</label>
                                    </div>
                                    <div className="row-input-container">
                                        <div className="form__group field long-city">
                                            <input className="form__field" type="text" id="off-city" placeholder="City" required />
                                            <label className="form__label" htmlFor="off-city">City</label>
                                        </div>
                                        <div className="form__group field long-pincode">
                                            <input className="form__field" type="text" id="off-pincode" placeholder="Pincode" required />
                                            <label className="form__label" htmlFor="off-pincode">Pincode</label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* <!--contact proof--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>13.</b> Which address would you prefer for communication purposes?</h5>
                                <div className="shortforms-container long-proof" value={this.state.commPurpose} onChange={e => this.handleChange(e.target.value, 'commPurpose')}>
                                    <input className="lets-checkbox" type="radio" id="home" name="contact" value="home" required />
                                    <input className="lets-checkbox" type="radio" id="office" name="contact" value="office" required />

                                    <label htmlFor="home">Home</label>
                                    <label htmlFor="office">Office</label>

                                </div>
                            </div>


                            <h3>Work Details</h3>

                            {/* <!--work details--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>14.</b> Personal Account Number (PAN)</h5>
                                <div className="shortforms-container long-work ">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="l-pan" placeholder="PAN" required />
                                        <label className="form__label" htmlFor="l-pan">PAN</label>
                                    </div>
                                    <div className="form__group field file-type">
                                        <input className="form__field upload-real" type="file" id="l-pancard-image"
                                            placeholder="PAN Card image" required />
                                        <input className="form__field upload-show" type="text" id="l-pancard-image-show"
                                            placeholder="PAN Card image" required />

                                        <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                                fill="white" />
                                        </svg>
                                        <svg className="file-upload-cross" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                                                fill="white" />
                                        </svg>
                                        <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z"
                                                fill="white" />
                                        </svg>
                                        <h5>Upload PAN Card</h5>
                                    </div>

                                </div>
                            </div>

                            {/* <!--earn month details--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>15.</b> How much do you earn monthly?</h5>
                                <div className="shortforms-container long-work ">
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="m-income" value="" readOnly
                                            placeholder="Net monthly income" required />
                                        <label className="form__label" htmlFor="m-income">Net monthly income</label>
                                        <p id="word-number"></p>
                                    </div>
                                    <div className="form__group field file-type">
                                        <input className="form__field upload-real" type="file" id="salary-image" placeholder="salary"
                                            required />
                                        <input className="form__field upload-show" type="text" id="salary-image-show"
                                            placeholder="salary" required />

                                        <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                                fill="white" />
                                        </svg>
                                        <svg className="file-upload-cross" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                                                fill="white" />
                                        </svg>
                                        <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z"
                                                fill="white" />
                                        </svg>
                                        <h5>Upload Salary Slips</h5>
                                    </div>

                                </div>
                            </div>

                            {/* <!--terms and condition--> */}
                            <div className="long-forms-wrapper long-terms">
                                <h5><b>16.</b> Terms & Conditions</h5>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="checkbox-1" name="" value="" readOnly />
                                        <label htmlFor="checkbox-1"><span>
                                            I Hereby consent to receiving information from Central KYC Registry through
                                            SMS/Email on the above registered number/Email address.
                                    </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="checkbox-2" name="" value="" readOnly />
                                        <label htmlFor="checkbox-2"><span>
                                            I have read the Authorization Statement, Know Your Credit Card, Card Member Terms and conditions and Most Important Terms and conditions and fully accept it and agree to be issued the Credit Card opted for by me.
                                    </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="checkbox-3" name="" value="" readOnly />
                                        <label htmlFor="checkbox-3"><span>
                                            From time to time, Citibank brings great products, offers & value addition to its customers. I authorize Citibank & its affiliates and/or partners to communicate these products and offers to me.
                                    </span></label>
                                    </div>
                                </div>
                            </div>

                            {/* <!--director proof--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>17.</b> Are you a director/senior officer of Citibank and/or their Relative AND / OR director of other banks and/or their Relative?</h5>
                                <div className="shortforms-container long-proof" value={this.state.director} onChange={e => this.handleChange(e.target.value, 'director')}>
                                    <input className="lets-checkbox" type="radio" id="director-yes" name="director" value="director-yes" required />
                                    <input className="lets-checkbox" type="radio" id="director-no" name="director" value="director-no" required />

                                    <label htmlFor="director-yes">Yes</label>
                                    <label htmlFor="director-no">No</label>

                                </div>
                            </div>

                            {/* <!--member-account proof--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>18.</b> Do you or your immediate family member/joint account holder or their immediate family members currently hold/have held/are being considered for a position as a senior public figure?</h5>
                                <div className="shortforms-container long-proof" value={this.state.member} onChange={e => this.handleChange(e.target.value, 'member')}>
                                    <input className="lets-checkbox" type="radio" id="member-yes" name="member" value="member-yes" required />
                                    <input className="lets-checkbox" type="radio" id="member-no" name="member" value="member-no" required />

                                    <label htmlFor="member-yes">Yes</label>
                                    <label htmlFor="member-no">No</label>

                                </div>
                            </div>

                            {/* <!--submit--> */}
                            <div className="long-form-submit">
                                <button onClick={this.getFormValues} id="long-submit">Submit Application</button>
                            </div>

                        </form>
                    </div>

                </section>
            </div>
        )
    }
}

export default LongFormBanner