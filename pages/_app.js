import '../styles/globals.css'
import '../styles/custom.css'
import axios from 'axios'
import { setAuthToken, getAuthToken } from '../api/headers'
import { generateCorrelationId } from '../utils/correlationId'
import { getApiData } from '../api/api';

axios.interceptors.request.use(async config => {
  const accessToken = getAuthToken()
  if (!accessToken) {
    try {
      const { url, body } = getApiData('authenticate')
      body.request.header.correlationId = generateCorrelationId()
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        const json = await res.json()
        console.log(1)
        setAuthToken(json.response.payload)
      }catch(err) {
        console.log(err)
        throw new Error(err.message)
      }
    } catch(err) {
      throw new Error('Authorization Error')
    }
  }

  let newConfig = Object.assign({}, config)
  newConfig.data.request.header.correlationId = generateCorrelationId()
  newConfig.headers.Authorization = `Bearer ${getAuthToken()}`
  return newConfig
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp