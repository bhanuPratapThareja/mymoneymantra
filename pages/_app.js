import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from '@material-ui/core/Container'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Container fixed>
        <Component {...pageProps} />
      </Container>
    </>
  )
}

export default MyApp