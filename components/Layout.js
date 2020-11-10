import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = props => {
    return (
        <>
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default Layout