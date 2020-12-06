import '../styles/globals.css'
import '../styles/custom.css'
import axios from 'axios';
import { generateCorrelationId } from '../Utils/correlationId'

axios.interceptors.request.use(config => {
  let newConfig = Object.assign({}, config);
  newConfig.data.request.header.correlationId = generateCorrelationId()
  return newConfig
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp