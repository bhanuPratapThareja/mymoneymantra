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
        percentage: 0
    }

    componentDidMount() {
        document.addEventListener('percentageCalulated', event => {
            let { percentage } = event.detail
            percentage = Math.ceil(percentage)
            this.setState({ percentage })
        })
    }

    render() {
        const { bank, product } = this.props
        const strapi = new Strapi()

        // console.log(bank)
        // console.log(product)

        return (
            <div className="card-info" id="longFormBanner">
                {/* <h5 className="app-form">{'Application Form'}</h5> */}
                <h3><b>{bank.bank_name}</b><br />{product.product_name}</h3>
                <img src={`${strapi.baseUrl}${product.product_image.url}`} />
                <h4>Application form</h4>
                <div className="form-range">
                    <h5><b id="long-form-complete">{this.state.percentage}%</b> Complete</h5>
                    <div className="green-range-wrapper">
                        <LinearProgress color="primary" variant="determinate" value={this.state.percentage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default LongFormBanner