import Strapi from "../../providers/strapi";
import { getCityData, getPinCodeData } from '../../services/formService';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getFormPercentage } from '../../utils/formPercentage';
import { validEmailRegex, validMobileRegex, isValidPanNumber } from '../../utils/validator';
import $ from "jquery";
import { updateLongForm } from '../../services/formService';
import { getBase64, documentUpload } from '../../services/formService';

class LongFormBanner extends React.Component {

    state = {
        gender: "",
        maritalStatus: "",
        proofOfAddress: "",
        communication: '',
        director: '',
        bankMember: '',
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
        selectedSalarySlip: null,
        selectedAddressProof: null,
        monthlyIncome: "",
        percentageComplete: 0,
        totalValues: 17,
        tnc: [],
        leadId: "",
        errors: {
            gender: '',
            maritalStatus: '',
            proofOfAddress: '',
            communication: '',
            director: '',
            bankMember: '',
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
            nearBy: '',
            city: '',
            pincode: '',
            officeAddress1: '',
            officeAddress2: '',
            officeNearBy: '',
            officeCity: '',
            officePincode: '',

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
        console.log(e)
        console.log(type)
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

                getCityData(name, value).then((value) => {
                    const block = { ...this.state[type] }
                    block.cityList = value;
                    this.setState({ [type]: block }, () => {
                    })
                });
            })
        }

        // if (name === "city") {
        //     const block = { ...this.state[type] }
        //     block.city = value;
        //     this.setState({ [type]: block }, () => {
        //         if (!value) {
        //             block.cityList = null
        //             block.cityId = "";
        //             this.setState({ [type]: { ...block } })
        //             return;
        //         }

        //         getCityData(name, type).then((value) => {
        //             const block = { ...this.state[type] }
        //             block.cityList = value;

        //             this.setState({ [type]: block }, () => {
        //             })
        //         });
        //     })
        // }

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
                getCityData(name, value).then((value) => {
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
                getPinCodeData(name, value).then((value) => {
                    const block = { ...this.state[type] }
                    block.pinList = value;
                    this.setState({ [type]: block }, () => {
                    })
                });
            }
            )
        }

        if (name === "officePincode") {
            const block = { ...this.state[type] }
            block.officePincode = value;
            this.setState({ [type]: block }, () => {
                if (!value) {
                    block.officePinList = null
                    this.setState({ [type]: { ...block } })
                    return;
                }
                getPinCodeData(name, value).then((value) => {
                    const block = { ...this.state[type] }
                    block.officePinList = value;
                    this.setState({ [type]: block }, () => {
                    })
                });
            }
            )
        }

        this.handleInputBlur(e);

    } //end of handleInput

    handleInputBlur = (event) => {
        const { name, value } = event.target;
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
        block.city = name;
        block.pincode = value;
        block.pinList = null
        this.setState({ [type]: { ...block } }, () => {

        })

    }
    onSelectOfficePin = (name, value, type) => {

        const block = { ...this.state[type] }
        block.officeCity = name;
        block.officePincode = value;
        block.officePinList = null
        this.setState({ [type]: { ...block } }, () => {

        })

    }


    handleLongForm = async (e) => {
        e.preventDefault();
        const data = this.state;
        updateLongForm(data);
    }

    onFileChange = event => {
        let document = event.target.files[0];
        this.setState({ selectedPan: document }, () => {
            const base64 = getBase64(document)
            const { type, name } = document
            documentUpload(base64, type, name)
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
    removePanCard = () => {
        this.setState({ selectedPan: null })
    }

    onSalarySlipChange = event => {
         let document = event.target.files[0];
        this.setState({ selectedSalarySlip: document }, () => {
            const base64 = getBase64(document)
            const { type, name } = document
            documentUpload(base64, type, name)
        });

    };
    removeSalarySlip = () => {
        this.setState({ selectedSalarySlip: null })
    }

    onAddressProofChange = event => {
        let document = event.target.files[0];
        this.setState({ selectedAddressProof: document }, () => {
            const base64 = getBase64(document)
            const { type, name } = document
            documentUpload(base64, type, name)
        });
    };


    removeAddressProof = () => {
        this.setState({ selectedAddressProof: null })
    }

    handleDatePicker = e => {
        $('#datepicker').open()
    }

    render() {
        const { bankName } = this.props.data;
        const strapi = new Strapi()
        const { bank_name, form_heading, product_type, banner_image } = this.props.data
        const { errors } = this.state;
        const { leadId } = this.state.leadId;
        return (
            <>
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

                    </section>
                </div>

            </>
        )
    }
}

export default LongFormBanner