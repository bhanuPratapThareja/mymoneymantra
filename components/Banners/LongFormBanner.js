import { withRouter } from 'next/router'
import { unpackComponents } from '../../services/componentsService'
import LinearProgress from '@material-ui/core/LinearProgress'
import ImageComponent from '../../components/ImageComponent/ImageComponent'

class LongFormBanner extends React.Component {

    state = {
        percentage: 0
    }

    componentDidMount() {
        this.getProductData()
    }

    getProductData = async () => {
        const productData = await unpackComponents(this.props.productData[0])
        this.setState({ productData }, () => {
            document.addEventListener('percentageCalulated', event => {
                let { percentage } = event.detail
                percentage = Math.ceil(percentage)
                this.setState({ percentage })
            })
        })
    }

    render() {

        if (!this.state.productData) {
            return null
        }

        const { bank, product } = this.state.productData

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