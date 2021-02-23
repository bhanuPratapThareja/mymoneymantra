import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = props => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
            <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
            <script src='/assets/js/vendors/slick.js'></script>
            <script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
            <script src='/assets/js/vendors/aos.js'></script>
            <script src='/assets/js/vendors/noUI.js'></script>
            <script src='/assets/js/main.js'></script>
        </>
    )
}

export default Layout