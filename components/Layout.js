import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = props => {
    return (
        <>
            <Header />
            <div className="credit-card-flow">
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default Layout