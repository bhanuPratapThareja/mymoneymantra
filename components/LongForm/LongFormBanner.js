
import Strapi from "../../providers/strapi"
import { getApiData } from '../../api/api';
import { getCityData, getPinCodeData } from '../../Utils/commonServices';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";
import {getFormPercentage} from '../../Utils/formPercentage';
import { validEmailRegex, validMobileRegex, isValidPanNumber, validPincodeRegex } from '../../Utils/validator';
import converter from 'number-to-words';
class LongFormBanner extends React.Component {

    state = {
        gender: "",
        maritalStatus: "",
        proofOfAddress: "",
        communication :'',
        director:'',
        bankMember :'',
        fullName: {
            firstName: "",
            lastName: "",
        },      
        fathersFullName: {
            fathersFirstName: "",
            fathersLastName: "",
        },
        mothersFullName: {
            mothersFirstName: "",
            mothersLastName: "",
        },
        residenceAddress: {
            address1: "",
            address2: "",
            nearBy: "",
            city: "",
            pincode: "",
        },
        officeAddress: {
            officeAddress1: "",
            officeAddress2: "",
            officeNearBy: "",
            officeCity: "",
            officePincode: "",
        },
        
        dob: "",
        nationality: "",
        phoneNo: "",
        email: "",
        
        pan: "",
        selectedPan: null,
        selectedSalarySlip : null,
        selectedAddressProof : null,
        monthlyIncome: "",
        percentageComplete : 0,
        totalValues: 17,
        tnc:[],
        monthlyNumToText : 0,
        errors: {
            gender:'',
            maritalStatus :'',
            proofOfAddress :'',
            communication:'',
            director :'',
            bankMember :'',
            firstName: '',
            lastName: '',
            
            phoneNo: '',
            email: '',
            dob: '',
            nationality: '',
            fathersFirstName: '',
            fathersLastName: '',
            mothersFirstName: '',
            mothersLastName: '',
            pan: '',
            monthlyIncome: '',
            address1: '',
            address2: '',
            officeAddress1: '',
            officeAddress2: '',
            officeCity: '',
            officePincode: '',
            city: '',
            pincode: '',
        }
    }

    handlePercentage = () => {
        this.setState({ percentageComplete: getFormPercentage({ ...this.state }) })
    }

    handleRadio = (value, type) => {
        this.setState({ [type]: value }, () => {
            
            this.handlePercentage()
        })
    }

    handleInput = (e, type) => {
        const { name, value } = e.target;

        this.setState({ [name]: value }, () => {
            this.handlePercentage()

        });

        if (name === "city") {
            const block = { ...this.state[type] }
            block.city = value;
            this.setState({ [type]: block }, () => {
                if (!value) {
                    block.cityList = null
                    block.cityId = "";
                    this.setState({ [type]: { ...block } })
                    return;
                }
                getCityData(name, type).then((value) => {
                    const block = { ...this.state[type] }
                    block.cityList = value;

                    this.setState({ [type]: block }, () => {
                    })
                });

            })
        }
        if (name === "officeCity") {
            const block = { ...this.state[type] }
            block.officeCity = value;
            this.setState({ [type]: block }, () => {
                if (!value) {
                    block.officeCityList = null
                    block.officeCityId = "";
                    this.setState({ [type]: { ...block } })
                    return;
                }
                getCityData(name, type).then((value) => {
                    const block = { ...this.state[type] }
                    block.officeCityList = value;

                    this.setState({ [type]: block }, () => {
                    })

                });


            })
        }


        if (name === "pincode") {
            const block = { ...this.state[type] }
            block.pincode = value;
            this.setState({ [type]: block }, () => {
                if (!value) {
                    block.pinList = null
                    this.setState({ [type]: { ...block } })
                    return;
                }
                getPinCodeData(name, type).then((value) => {
                    const block = { ...this.state[type] }
                    block.pinList = value;
                    this.setState({ [type]: block }, () => {
                    })
                });
            }
            )
        }
        if (name=="monthlyIncome" && value){
            this.setState({monthlyNumToText : converter.toWords(value)},() =>{
                
            });
        }
        // if (name === "officePincode") {
        //     const block = { ...this.state[type] }
        //     block.officePincode = value;
        //     this.setState({ [type]: block }, () => {
        //         if (!value) {
        //             block.officePinList = null
        //             this.setState({ [type]: { ...block } })
        //             return;
        //         }
        //         getPinCodeData(name, type).then((value) => {
        //             const block = { ...this.state[type] }
        //             block.officePinList = value;
        //             this.setState({ [type]: block }, () => {
        //             })
        //         });
        //     }
        //     )
        // }

        this.handleInputBlur(e);

    } //end of handleInput

    handleInputBlur = (event) => {
        const { name, value } = event.target;
     console.log('event in handleInputBlur',event)
        this.setState({ [name]: value }, () => {

            let errors = this.state.errors;
            switch (name) {
                case 'firstName':

                    errors.firstName = !value ? "mandatory field" : "";
                    break;
                case 'lastName':
                    errors.lastName = !value ? "mandatory field" : "";
                    break;
                case 'fathersFirstName':
                    errors.fathersFirstName = !value ? "mandatory field" : "";
                    break;
                case 'fathersLastName':
                    errors.fathersLastName = !value ? "mandatory field" : "";
                    break;
                case 'mothersFirstName':
                    errors.mothersFirstName = !value ? "mandatory field" : "";
                    break;
                case 'mothersLastName':
                    errors.mothersLastName = !value ? "mandatory field" : "";
                    break;
                case 'phoneNo':
                    
                    if (!value) {
                        errors.phoneNo = "mandatory fields";
                    } else
                        errors.phoneNo = validMobileRegex.test(value) ? "" : "Invalid Phone Number"

                    break;
                case 'email':
                    if (!value) {
                        errors.email = "mandatory fields";
                    } else {
                        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
                    }
                    break;
                case 'dob':
                    errors.dob = !value ? "mandatory field" : "";
                    break;
                case 'nationality':
                    errors.nationality = !value ? "mandatory field" : "";
                    break;
                case 'pan':
                    if (!value) {
                        errors.pan = !value ? "mandatory field" : "";
                    }
                    else {
                        errors.pan = isValidPanNumber.test(value) ? '' : 'Pan Number is not valid!';

                    }
                    break;
                case 'monthlyIncome':
                    errors.monthlyIncome = !value ? "mandatory field" : "";
                    break;
                case 'address1':
                    errors.address1 = !value ? "mandatory field" : "";
                    break;
                case 'address2':
                    errors.address2 = !value ? "mandatory field" : "";
                    break;
                case 'city':
                    errors.city = !value ? "mandatory field" : "";
                    break;
                case 'pincode':
                    errors.pincode = !value ? "mandatory field" : "";
                    break;
                case 'officeAddress1':
                    errors.officeAddress1 = !value ? "mandatory field" : "";
                    break;
                case 'officeAddress2':
                    errors.officeAddress2 = !value ? "mandatory field" : "";
                    break;
                case 'officeCity':
                    errors.officeCity = !value ? "mandatory field" : "";
                    break;
                case 'officePincode':
                    errors.officePincode = !value ? "mandatory field" : "";
                    break;
            }
            this.setState({ errors, [name]: value }, () => {
              

            });
        })

    }//end of handleInputBlur


    onSelect = (name, value, type) => {

        const block = { ...this.state[type] }

        block.city = name;
        block.cityId = value;
        block.cityList = null

        this.setState({ [type]: { ...block } }, () => {
        })

    }
    onSelectOfficeCity = (name, value, type) => {

        const block = { ...this.state[type] }

        block.officeCity = name;
        block.officeCityId = value;
        block.officeCityList = null

        this.setState({ [type]: { ...block } }, () => {
        })

    }

    onSelectPin = (name, value, type) => {

        const block = { ...this.state[type] }
        block.city = null;
        block.pincode = value;
        block.pinList = null
        this.setState({ [type]: { ...block } }, () => {

        })

    }
    onSelectOfficePin = (name, value, type) => {

        const block = { ...this.state[type] }
        block.officeCity = null;
        block.officePincode = value;
        block.officePinList = null
        this.setState({ [type]: { ...block } }, () => {

        })

    }


    handleLongForm = async (e) => {
        console.log('e inside handleLongForm',e);
        
        e.preventDefault();
        
       
        const { url, body } = getApiData('generate');
       
        let reqBody = body.request.payload;
        reqBody.pan = this.state.pan;
        
        const strapi = new Strapi()
        try {
            const res = await strapi.apiReq('POST', url, reqBody)
            console.log('handleLongForm res',res);
            console.log('resmsg', res.response.msgInfo.msgDescription)
            let resMessage = res.response.msgInfo.msgDescription;
            alert(resMessage);
            
        } catch (error) {
           
        }

    }

    onFileChange = event => {
        this.setState({ selectedPan: event.target.files[0] }, () => {
           
        });

    };
    fileData = () => {

        if (this.state.selectedPan) {
          
            return (
                <div>
                    <p>File Name: {this.state.selectedPan.name}</p>

                </div>
            );
        }
    };
    removePanCard = () =>{
        this.setState({selectedPan:null})
    }

    onSalarySlipChange = event => {
        this.setState({ selectedSalarySlip: event.target.files[0] }, () => {
           
        });

    };
    removeSalarySlip = () =>{
        this.setState({selectedSalarySlip : null})
    }

    onAddressProofChange = event => {
        this.setState({ selectedAddressProof: event.target.files[0] }, () => {
           
        });

    };
    removeAddressProof = () =>{
        this.setState({selectedAddressProof : null})
    }

    // function handleFileSelect(evt) {
    //     var files = evt.target.files; // FileList object

    //     // files is a FileList of File objects. List some properties.
    //     var output = [];
    //     for (var i = 0, f; f = files[i]; i++) {
    //       output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //                   f.size, ' bytes, last modified: ',
    //                   f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    //                   '</li>');
    //     }
    //     document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    //   }

    //   document.getElementById('files').addEventListener('change', handleFileSelect, false);

    handleCheckbox = (event) =>{
       console.log('event.target.id',event.target.id)
        
         let selectedTnc = [...this.state.tnc, event.target.id]
         if (this.state.tnc.includes(event.target.id)) {
            selectedTnc = selectedTnc.filter(tncVal => tncVal !== event.target.id);
        
          }
          this.setState({tnc: selectedTnc}, ()=>{
               console.log('inside handleCheckbox this.state',this.state)
          });
    }



    render() {
        const strapi = new Strapi()
        const { bank_name, form_heading, product_type, banner_image } = this.props.data
        const { errors } = this.state;
        console.log('inside render this.state',this.state);
      

        return (
            <div className="long-form">
                <section className="long-form-wrapper">
                    <div className="card-info" style={{ height: '303px' }} id="longFormBanner">
                        <h5 className="app-form">{form_heading}</h5>
                        <h3><b>{bank_name}</b><br />{product_type}</h3>
                        <img src={`${strapi.baseUrl}${banner_image.url}`} />
                        <h4>Application form</h4>
                        <div className="form-range">
                            <h5><b id="long-form-complete">{this.state.percentageComplete}%</b> Complete</h5>
                            <div className="green-range-wrapper">
                                <LinearProgress color="primary" variant="determinate" value={this.state.percentageComplete} />
                            </div>
                        </div>
                    </div>

                    <div className="form-wrapper" id="longForm">
                        <form onSubmit={this.handleLongForm}>

                            <h3>Personal Details</h3>
                            <div className="long-forms-wrapper">
                                <h5><b>1.</b> Gender</h5>
                                <div className="shortforms-container long-gender" name="gender" value={this.state.gender}
                                onChange={e => this.handleRadio(e.target.value,'gender')}
                                >
                                    <input className="lets-checkbox" type="radio" id="female" name="gender" value="female" />
                                    <input className="lets-checkbox" type="radio" id="male" name="gender" value="male" />
                                    <input className="lets-checkbox" type="radio" id="other" name="gender" value="other" />

                                    <label htmlFor="female">Female</label>
                                    <label htmlFor="male">Male</label>
                                    <label htmlFor="other">Other</label>

                                </div>
                            </div>

                            {/* <!--full name--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>2.</b> Full Name</h5>
                                <div className="shortforms-container long-name">
                                    <div className='form__group field' style={errors.firstName ? { border: "1px solid red" } : null} >
                                        <input className="form__field" type="text" name="firstName" id="firstName" placeholder="First Name"
                                          required onChange={e => this.handleInput(e, "firstName")} onBlur={this.handleInputBlur}
                                        />
                                        {errors.firstName.length > 0 &&
                                            <span className='error'>{errors.firstName}</span>}
                                        <label className="form__label" htmlFor="first-name">First Name</label>
                                    </div>

                                    <div className="form__group field" style={errors.lastName ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="last-name" placeholder="Last Name" name="lastName"
                                          required  onChange={e => this.handleInput(e, "lastName")} onBlur={this.handleInputBlur}
                                        />
                                        {errors.lastName.length > 0 &&
                                            <span className='error'>{errors.lastName}</span>}
                                        <label className="form__label" htmlFor="last-name">Last Name</label>
                                    </div>
                                </div>
                            </div>

                            {/* <!--martial status--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>3.</b> Marital Status</h5>
                                <div className="shortforms-container long-gender" name="maritalStatus" value={this.state.maritalStatus} onChange={e => this.handleRadio(e.target.value,'maritalStatus')} >
                                    <input className="lets-checkbox" type="radio" id="single" name="maritalStatus" value="single" />
                                    <input className="lets-checkbox" type="radio" id="married" name="maritalStatus" value="married" />
                                    <input className="lets-checkbox" type="radio" id="separated" name="maritalStatus" value="separated" />
                                    <input className="lets-checkbox" type="radio" id="divorced" name="maritalStatus" value="divorced" />
                                    <input className="lets-checkbox" type="radio" id="widowed" name="maritalStatus" value="widowed" />

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
                                    <div className="form__group field" style={errors.fathersFirstName ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="father-f-name" placeholder="First Name" name="fathersFirstName"
                                          required  onChange={e => this.handleInput(e, "fathersFirstName")} onBlur={this.handleInputBlur}
                                        />
                                        {errors.fathersFirstName.length > 0 &&
                                            <span className='error'>{errors.fathersFirstName}</span>}
                                        <label className="form__label" htmlFor="father-f-name">First Name</label>
                                    </div>
                                    <div className="form__group field" style={errors.fathersLastName ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="father-l-name" placeholder="Last Name"
                                            name="fathersLastName" onChange={e => this.handleInput(e, "fathersLastName")}
                                            required    onBlur={this.handleInputBlur} />
                                        {errors.fathersLastName.length > 0 &&
                                            <span className='error'>{errors.fathersLastName}</span>}
                                        <label className="form__label" htmlFor="father-l-name">Last Name</label>
                                    </div>

                                </div>
                            </div>

                            {/* <!--mothers name--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>5.</b> Mother's Name</h5>
                                <div className="shortforms-container long-name">
                                    <div className="form__group field" style={errors.mothersFirstName ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="mother-f-name" placeholder="First Name" name="mothersFirstName"
                                          required  onChange={e => this.handleInput(e, "mothersFirstName")} onBlur={this.handleInputBlur}
                                        />
                                        {errors.mothersFirstName.length > 0 &&
                                            <span className='error'>{errors.mothersFirstName}</span>}
                                        <label className="form__label" htmlFor="mother-f-name">First Name</label>
                                    </div>
                                    <div className="form__group field" style={errors.mothersLastName ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="mother-l-name" placeholder="Last Name" name="mothersLastName"
                                         required   onChange={e => this.handleInput(e, "mothersLastName")} onBlur={this.handleInputBlur}

                                        />
                                        {errors.mothersLastName.length > 0 &&
                                            <span className='error'>{errors.mothersLastName}</span>}
                                        <label className="form__label" htmlFor="mother-l-name">Last Name</label>
                                    </div>
                                </div>
                            </div>

                            {/* <!--dob--> */}
                            <div className="row-input-container">
                                <div className="long-forms-wrapper">
                                    <h5><b>6.</b> Date of Birth</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field" style={errors.dob ? { border: "1px solid red" } : null}>
                                            <input className="form__field datepicker" type="date" id="dob" placeholder="MM / DD / YYYY"
                                             required   name="dob" onChange={e => this.handleInput(e, "dob")} onBlur={this.handleInputBlur}
                                            />
                                            {errors.dob.length > 0 &&
                                                <span className='error'>{errors.dob}</span>}
                                            <label className="form__label" htmlFor="dob">Date of Birth</label>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--nationality--> */}
                                <div className="long-forms-wrapper">
                                    <h5><b>7.</b> Nationality</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field" style={errors.nationality ? { border: "1px solid red" } : null}>
                                            <input className="form__field" type="text" id="nationality" placeholder="Nationality"
                                              required  name="nationality" onChange={e => this.handleInput(e, "nationality")}
                                                onBlur={this.handleInputBlur}
                                            />
                                            {errors.nationality.length > 0 &&
                                                <span className='error'>{errors.nationality}</span>}
                                            <label className="form__label" htmlFor="nationality">Nationality</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!--Phone Number--> */}
                            <div className="row-input-container">
                                <div className="long-forms-wrapper">
                                    <h5><b>8.</b> Phone Number</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field" style={errors.phoneNo ? { border: "1px solid red" } : null}>
                                            <input className="form__field" type="number" id="phone-number" placeholder="Phone Number"
                                              required  name="phoneNo" value={this.state.phoneNo} onChange={e => this.handleInput(e, "phoneNo")}
                                                  onBlur={this.handleInputBlur}
                                            />
                                            {errors.phoneNo.length > 0 &&
                                                <span className='error'>{errors.phoneNo}</span>}
                                            <label className="form__label" htmlFor="phone-number">Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--Email ID--> */}
                                <div className="long-forms-wrapper">
                                    <h5><b>9.</b> Email ID</h5>
                                    <div className="shortforms-container long-name">
                                        <div className="form__group field" style={errors.email ? { border: "1px solid red" } : null}>
                                            <input className="form__field" type="text" id="email" placeholder="Email ID" name="email"
                                              required  onChange={e => this.handleInput(e, "email")} onBlur={this.handleInputBlur} />
                                            {errors.email.length > 0 &&
                                                <span className='error'>{errors.email}</span>}
                                            <label className="form__label" htmlFor="email">Email ID</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!--address details--> */}
                            <h3>Address Details</h3>
                            <div className="long-forms-wrapper">
                                <h5><b>10.</b> Residence Address</h5>
                                <div className="shortforms-container long-address">
                                    <div className="form__group field" style={errors.address1 ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="address-1" placeholder="Address Line 1" name="address1"
                                          required  onChange={e => this.handleInput(e, "address1")} onBlur={this.handleInputBlur}
                                        />
                                        {errors.address1.length > 0 &&
                                            <span className='error'>{errors.address1}</span>}
                                        <label className="form__label" htmlFor="address-1">Address Line 1</label>
                                    </div>
                                    <div className="form__group field" style={errors.address2 ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="address-2" placeholder="Address Line 2" name="address2"
                                            required onChange={e => this.handleInput(e, "address2")} onBlur={this.handleInputBlur}
                                        />
                                        {errors.address2.length > 0 &&
                                            <span className='error'>{errors.address2}</span>}
                                        <label className="form__label" htmlFor="address-2">Address Line 2</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="address-landmark"
                                            placeholder="Nearby Landmark (Optional)" value={this.state.nearBy} onChange={e => this.handleInput(e, "nearBy")} />
                                        <label className="form__label" htmlFor="address-2">Nearby Landmark (Optional)</label>
                                    </div>
                                    <div className="row-input-container">

                                        <div className="custom-wrapper">

                                            <div className="form__group field long-city" style={errors.city ? { border: "1px solid red" } : null}>
                                                <input className="form__field" type="text" id="city" placeholder="City"
                                                  required  name="city" value={this.state.residenceAddress.city}
                                                    onChange={e => this.handleInput(e, "residenceAddress")} onBlur={this.handleInputBlur}
                                                />
                                                {errors.city.length > 0 &&
                                                    <span className='error'>{errors.city}</span>}
                                                <label className="form__label" htmlFor="city">City</label>

                                            </div>
                                            {this.state.residenceAddress.cityList && this.state.residenceAddress.cityList.length ? <div id="bank-drop" className="dropdown-content">
                                                <div className="dropdown-content-links">
                                                    {this.state.residenceAddress.cityList.map(city => {
                                                        return (
                                                            <a key={city.cityMasterId} name={city.cityMasterName} className="form__label"
                                                                value={city.cityMasterId} onClick={e => this.onSelect(city.cityMasterName, city.cityMasterId, "residenceAddress")} >{city.cityMasterName}</a>
                                                        )
                                                    }
                                                    )}

                                                </div>
                                            </div> : null}

                                        </div>

                                        <div className="custom-wrapper">
                                            <div className="form__group field long-pincode" style={errors.pincode ? { border: "1px solid red" } : null}>
                                                <input className="form__field" type="text" id="pincode" name="pincode" placeholder="Pincode"
                                                  required   value={this.state.residenceAddress.pincode}
                                                    onChange={e => this.handleInput(e, "residenceAddress")}
                                                    onBlur={this.handleInputBlur}
                                                />
                                                {errors.pincode.length > 0 &&
                                                    <span className='error'>{errors.pincode}</span>}
                                                <label className="form__label" htmlFor="pincode">Pincode</label>
                                            </div>
                                            {this.state.residenceAddress.pinList ? <div id="bank-drop" className="dropdown-content">
                                                <div className="dropdown-content-links">
                                                    {this.state.residenceAddress.pinList.map(pin => {
                                                        return (
                                                            // <a key={city.pincode} className="form__label" onClick={e => this.onSelectPin(pin.cityId, pin.pincode, "residenceAddress")}
                                                            // >{pin.pincode}</a>

                                                            <a key={city.pincode} className="form__label" onClick={e => this.onSelectPin(pin.cityMasterName, pin.pincode, "residenceAddress")}
                                                            >{pin.pincode}</a>
                                                        )
                                                    }
                                                    )}

                                                </div>
                                            </div> : null}

                                        </div>



                                    </div>

                                </div>
                            </div>

                            {/* <!--address proof--> */}
                            {/* <h3>Address Details</h3> */}
                            <div className="long-forms-wrapper" >
                                <h5><b>11.</b> Do you have a proof of address?</h5>
                                <div className="shortforms-container long-proof" name="proofOfAddress" value={this.state.proofOfAddress} onChange={e => this.handleRadio(e.target.value,'proofOfAddress')} >
                                    <input className="lets-checkbox" type="radio" id="l-yes" name="proof" value="l-yes" />
                                    <input className="lets-checkbox" type="radio" id="l-no" name="proof" value="l-no" />

                                    <label htmlFor="l-yes">Yes</label>
                                    <label htmlFor="l-no">No</label>
                                    <div className="form__group field file-type grid-span">
                                        <input className="form__field upload-real" type="file" id="l-address-image"
                                            placeholder="address proof" onChange={this.onAddressProofChange} />
                                        <input className="form__field upload-show" type="text" id="l-address-image-show"
                                            placeholder="address proof" />

                                        <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                                fill="white" />
                                        </svg>

                                        {this.state.selectedAddressProof ? <svg onClick={this.removeAddressProof} className="file-upload-cross file-upload-visible" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                                                fill="white" />
                                        </svg> : null }
                                        <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z"
                                                fill="white" />
                                        </svg>
                                        <h5>{this.state.selectedAddressProof ? this.state.selectedAddressProof.name : "Upload Address Proof"}</h5>
                                    </div>

                                </div>
                            </div>

                            {/* <!--office details--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>12.</b> Office Address</h5>
                                <div className="shortforms-container long-address">
                                    <div className="form__group field" style={errors.officeAddress1 ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="off-address-1" placeholder="Address Line 1"
                                          required  name="officeAddress1" onChange={e => this.handleInput(e, "officeAddress1")}
                                            onBlur={this.handleInputBlur} />
                                        {errors.officeAddress1.length > 0 &&
                                            <span className='error'>{errors.officeAddress1}</span>}

                                        <label className="form__label" htmlFor="off-address-1">Address Line 1</label>
                                    </div>
                                    <div className="form__group field" style={errors.officeAddress2 ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="off-address-2" placeholder="Address Line 2"
                                           required name="officeAddress2" onChange={e => this.handleInput(e, "officeAddress2")}
                                            onBlur={this.handleInputBlur}
                                        />
                                        {errors.officeAddress2.length > 0 &&
                                            <span className='error'>{errors.officeAddress2}</span>}
                                        <label className="form__label" htmlFor="off-address-2">Address Line 2</label>
                                    </div>
                                    <div className="form__group field">
                                        <input className="form__field" type="text" id="off-address-landmark" name="officeNearBy"
                                            placeholder="Nearby Landmark (Optional)" onChange={e => this.handleInput(e, "officeNearBy")} />
                                        <label className="form__label" htmlFor="off-address-2">Nearby Landmark (Optional)</label>
                                    </div>
                                    <div className="row-input-container">


                                        <div className="custom-wrapper">
                                            <div className="form__group field long-city" style={errors.officeCity ? { border: "1px solid red" } : null}>
                                                <input className="form__field" type="text" id="off-city" placeholder="City" name="officeCity"
                                                 required   value={this.state.officeAddress.officeCity} onChange={e => this.handleInput(e, "officeAddress")}
                                                    onBlur={this.handleInputBlur}
                                                />
                                                {errors.officeCity.length > 0 &&
                                                    <span className='error'>{errors.officeCity}</span>}
                                                <label className="form__label" htmlFor="off-city">City</label>
                                            </div>
                                            {this.state.officeAddress.officeCityList && this.state.officeAddress.officeCityList.length ? <div id="bank-drop" className="dropdown-content">
                                                <div className="dropdown-content-links">
                                                    {this.state.officeAddress.officeCityList.map(cityOfc => {
                                                        return (
                                                            <a key={cityOfc.cityMasterId} name={cityOfc.cityMasterName} className="form__label"
                                                                value={cityOfc.cityMasterId} onClick={e => this.onSelectOfficeCity(cityOfc.cityMasterName, cityOfc.cityMasterId, "officeAddress")} >{cityOfc.cityMasterName}</a>
                                                        )
                                                    }
                                                    )}

                                                </div>
                                            </div> : null}

                                        </div>



                                        <div className="form__group field long-pincode" style={errors.officePincode ? { border: "1px solid red" } : null}>
                                            <input className="form__field" type="text" id="off-pincode" placeholder="Pincode" name="officePincode" 
                                               required onChange={e => this.handleInput(e, "officePincode")} onBlur={this.handleInputBlur} />
                                            {errors.officePincode.length > 0 &&
                                                <span className='error'>{errors.officePincode}</span>}
                                            <label className="form__label" htmlFor="off-pincode">Pincode</label>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* <!--communication address--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>13.</b> Which address would you prefer for communication purposes?</h5>
                                <div className="shortforms-container long-proof" name="communication" value={this.state.communication} onChange={e => this.handleRadio(e.target.value,'communication')}>
                                    <input className="lets-checkbox" type="radio" id="home" name="contact" value="home" />
                                    <input className="lets-checkbox" type="radio" id="office" name="contact" value="office" />

                                    <label htmlFor="home">Home</label>
                                    <label htmlFor="office">Office</label>

                                </div>
                            </div>

                            {/* <!--work details--> */}
                            <h3>Work Details</h3>
                            <div className="long-forms-wrapper">
                                <h5><b>14.</b> Personal Account Number (PAN)</h5>
                                <div className="shortforms-container long-work ">
                                    <div className="form__group field" style={errors.pan ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="text" id="l-pan" placeholder="PAN" name="pan" value={this.state.pan}
                                           required onChange={e => this.handleInput(e, "pan")} onBlur={this.handleInputBlur} />
                                        {errors.pan.length > 0 &&
                                            <span className='error'>{errors.pan}</span>}
                                        <label className="form__label" htmlFor="l-pan">PAN</label>
                                    </div>


                                    <div className="form__group field file-type">
                                        <input className="form__field upload-real" type="file" id="l-pancard-image"
                                            name="panImage" onChange={this.onFileChange}
                                            placeholder="PAN Card image" />
                                      
                                        <input className="form__field upload-show" type="text" id="l-pancard-image-show"
                                            placeholder="PAN Card image" />

                                        <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                                fill="white" />
                                        </svg>

                                        {this.state.selectedPan ? <svg onClick = {this.removePanCard} className="file-upload-cross file-upload-visible" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">

                                            <path
                                                d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                                                fill="white" />
                                        </svg>:null}

                                        <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z"
                                                fill="white" />
                                        </svg>

                                        <h5>{this.state.selectedPan ? this.state.selectedPan.name : "Upload PAN Card"}</h5>
                                    </div>

                                </div>
                            </div>

                            {/* <!--earn month details--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>15.</b> How much do you earn monthly?</h5>
                                <div className="shortforms-container long-work ">
                                    <div className="form__group field" style={errors.monthlyIncome ? { border: "1px solid red" } : null}>
                                        <input className="form__field" type="number" id="m-income"
                                          required  placeholder="Net monthly income" name="monthlyIncome" value={this.state.monthlyIncome}
                                            onChange={e => this.handleInput(e, "monthlyIncome")} onBlur={this.handleInputBlur}
                                        />
                                        {errors.monthlyIncome.length > 0 &&
                                            <span className='error'>{errors.monthlyIncome}</span>}
                                           {this.state.monthlyNumToText ?  <div className="form__field">{this.state.monthlyNumToText}</div> :""}
                                        <label className="form__label" htmlFor="m-income">Net monthly income</label>
                                        <p id="word-number"></p>
                                    </div>
                                    <div className="form__group field file-type">
                                        <input className="form__field upload-real" type="file" id="salary-image" placeholder="salary"
                                       onChange={this.onSalarySlipChange} />
                                        <input className="form__field upload-show" type="text" id="salary-image-show"
                                            placeholder="salary" />

                                        <svg className="file-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                                                fill="white" />
                                        </svg>

                                       {this.state.selectedSalarySlip ?  <svg onClick = {this.removeSalarySlip} className="file-upload-cross file-upload-visible" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                                                fill="white" />
                                        </svg> : null}

                                        <svg className="file-upload-attach" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C10.4491 22.0376 8.94653 21.4587 7.82179 20.3902C6.69705 19.3217 6.0419 17.8508 6 16.3V6.12999C6.02883 5.0089 6.50064 3.94489 7.31216 3.17085C8.12368 2.39682 9.20879 1.97582 10.33 1.99999C11.4529 1.97313 12.5406 2.39294 13.3543 3.16726C14.168 3.94158 14.6412 5.00713 14.67 6.12999V16.31C14.6284 16.9886 14.3295 17.6257 13.8343 18.0915C13.3391 18.5573 12.6849 18.8167 12.005 18.8167C11.3251 18.8167 10.6709 18.5573 10.1757 18.0915C9.68047 17.6257 9.38159 16.9886 9.34 16.31V6.91999C9.34 6.65478 9.44536 6.40042 9.63289 6.21289C9.82043 6.02535 10.0748 5.91999 10.34 5.91999C10.6052 5.91999 10.8596 6.02535 11.0471 6.21289C11.2346 6.40042 11.34 6.65478 11.34 6.91999V16.31C11.3599 16.4723 11.4386 16.6217 11.5611 16.7301C11.6836 16.8385 11.8415 16.8983 12.005 16.8983C12.1685 16.8983 12.3264 16.8385 12.4489 16.7301C12.5714 16.6217 12.6501 16.4723 12.67 16.31V6.12999C12.6389 5.5384 12.3758 4.98294 11.9377 4.58417C11.4996 4.18539 10.9219 3.97548 10.33 3.99999C9.73979 3.97817 9.16467 4.1893 8.72876 4.58779C8.29285 4.98629 8.0311 5.5402 8 6.12999V16.3C8.04163 17.3204 8.48597 18.2828 9.23569 18.9763C9.98541 19.6698 10.9794 20.0379 12 20C13.0206 20.0379 14.0146 19.6698 14.7643 18.9763C15.514 18.2828 15.9584 17.3204 16 16.3V6.12999C16 5.86478 16.1054 5.61042 16.2929 5.42289C16.4804 5.23535 16.7348 5.12999 17 5.12999C17.2652 5.12999 17.5196 5.23535 17.7071 5.42289C17.8946 5.61042 18 5.86478 18 6.12999V16.3C17.9581 17.8508 17.303 19.3217 16.1782 20.3902C15.0535 21.4587 13.5509 22.0376 12 22Z"
                                                fill="white" />
                                        </svg>

                                        <h5>{this.state.selectedSalarySlip ? this.state.selectedSalarySlip.name : "Upload Salary Slip"}</h5>
                                    </div>

                                </div>
                            </div>

                            {/* <!--terms and condition--> */}
                            <div className="long-forms-wrapper long-terms">
                                <h5><b>16.</b> Terms & Conditions</h5>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="tnc1" name="tnc1" onChange={this.handleCheckbox}/>
                                        <label htmlFor="checkbox-1"><span>
                                            I Hereby consent to receiving information from Central KYC Registry through
                                            SMS/Email on the above registered number/Email address.
                                    </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="tnc2" name="tnc2"  onChange={this.handleCheckbox} />
                                        <label htmlFor="checkbox-2"><span>
                                            I have read the Authorization Statement, Know Your Credit Card, Card Member Terms and conditions and Most Important Terms and conditions and fully accept it and agree to be issued the Credit Card opted for by me.
                                    </span></label>
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <div className="checkbox">
                                        <input type="checkbox" id="tnc3" name="tnc3" 
                                        onChange={this.handleCheckbox}
                                         
                                         />
                                        <label htmlFor="checkbox-3"><span>
                                            From time to time, Citibank brings great products, offers & value addition to its customers. I authorize Citibank & its affiliates and/or partners to communicate these products and offers to me.
                                    </span></label>
                                    </div>
                                </div>
                            </div>

                            {/* <!--director proof--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>17.</b> Are you a director/senior officer of Citibank and/or their Relative AND / OR director of other banks and/or their Relative?</h5>
                                <div className="shortforms-container long-proof" value={this.state.director} name="director" onChange={e => this.handleRadio(e.target.value,'director')}>
                                    <input className="lets-checkbox" type="radio" id="director-yes" name="director" value="director-yes" />
                                    <input className="lets-checkbox" type="radio" id="director-no" name="director" value="director-no" />

                                    <label htmlFor="director-yes">Yes</label>
                                    <label htmlFor="director-no">No</label>

                                </div>
                            </div>

                            {/* <!--member-account proof--> */}
                            <div className="long-forms-wrapper">
                                <h5><b>18.</b> Do you or your immediate family member/joint account holder or their immediate family members currently hold/have held/are being considered for a position as a senior public figure?</h5>
                                <div className="shortforms-container long-proof" name="bankMember" value={this.state.bankMember} onChange={e => this.handleRadio(e.target.value,'bankMember')}>
                                    <input className="lets-checkbox" type="radio" id="member-yes" name="member" value="member-yes" />
                                    <input className="lets-checkbox" type="radio" id="member-no" name="member" value="member-no" />

                                    <label htmlFor="member-yes">Yes</label>
                                    <label htmlFor="member-no">No</label>

                                </div>
                            </div>

                            {/* <!--submit--> */}
                            <div className="long-form-submit ">
                                <button className="bordershadow" id="long-submit">Submit Application</button>
                            </div>

                        </form>
                    </div>

                </section>
            </div>
        )
    }
}

export default LongFormBanner