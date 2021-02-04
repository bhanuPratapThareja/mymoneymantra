import { withRouter } from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress'
import ImageComponent from '../../components/ImageComponent/ImageComponent'

class LongFormBanner extends React.Component {

    state = {
        percentage: 0
    }

    componentDidMount() {
        this.initializePercentage()
    }

    initializePercentage = async () => {
        document.addEventListener('percentageCalulated', this.percentageEventListener)
    }

    percentageEventListener = event => {
        let { percentage } = event.detail
        percentage = Math.ceil(percentage)
        this.setState({ percentage })
    }

    componentWillUnmount() {
        document.removeEventListener('percentageCalulated', this.percentageEventListener)
    }

    render() {
        if(!this.props.productData) {
            return null
        }

        const { bank, product } = this.props.productData

        return (
            <div className="card-info" id="longFormBanner">
                <h5 className="app-form">Application form</h5>
                <h3><b>{bank.bank_name}</b><br />{product.product_name}</h3>

                {this.props.primaryPath === 'credit-cards' ?
                    <ImageComponent image={product.product_image.image} /> : <ImageComponent image={bank.bank_image}
                    />}

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

export default withRouter(LongFormBanner)