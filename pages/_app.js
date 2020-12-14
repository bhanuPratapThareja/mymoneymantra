import '../styles/globals.css'
import '../styles/custom.css'
import axios from 'axios'
import { getAuthToken } from '../api/headers'
import { generateCorrelationId } from '../Utils/correlationId'

axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`

axios.interceptors.request.use(config => {
  let newConfig = Object.assign({}, config);
  newConfig.data.request.header.correlationId = generateCorrelationId()
  return newConfig
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp