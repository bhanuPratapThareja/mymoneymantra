import Header from '../components/Header/Header'
import '../styles/globals.css'
import Container from '@material-ui/core/Container';


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