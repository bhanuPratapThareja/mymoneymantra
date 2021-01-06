import Strapi from "../../providers/strapi";
import { getCityData, getPinCodeData } from '../../services/formService';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getFormPercentage } from '../../utils/formPercentage';
import { validEmailRegex, validMobileRegex, isValidPanNumber } from '../../utils/validator';
import $ from "jquery";
import { updateLongForm } from '../../services/formService';
import { getBase64, documentUpload } from '../../services/formService';

class LongFormBanner extends React.Component {

    componentDidMount() {
        // console.log(this.props)
    }

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