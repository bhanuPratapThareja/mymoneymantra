import { generateInputs } from '../../Utils/inputGenerator'

class ShortForm extends React.Component {

    state = {
        full_name: '',
        phone_no: '',
        email: '',
        checkbox: false
    }

    updateFields = (value, type) => {
        this.setState({ [type]: value })
    }

    getInputFields = data => {
        let inputComponentsArr = []
        for (let key in data) {
            if (data[key] && data[key].type) {
                inputComponentsArr.push(data[key])
            }
        }
        return inputComponentsArr.map(component => generateInputs(component, this.updateFields))
    }

    render() {
        const { heading_text, content_text, button_text } = this.props.data
        return (
            <section data-aos="fade-up" className="container lets-find-container aos-init aos-animate">
                <div className="mobile-background"></div>
                <div className="mobile-content">
                    <h1>{heading_text}</h1>
                </div>

                <div className="all-form-wrapper">
                    <div className="lets-find">
                        <div className="lets-find-content">
                            <h2>{heading_text}</h2>
                            <p>{content_text}</p>
                        </div>
                        <div className="lets-find-form">
                            <form>
                                {this.getInputFields(this.props.data)}
                            </form>
                            <div className="lets-go-button">
                                <button id="lets-go">{button_text}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


export default ShortForm