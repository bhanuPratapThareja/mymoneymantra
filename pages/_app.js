import '../styles/globals.css'
import '../styles/custom.css'
import axios from 'axios'
import { setAuthToken, getAuthToken, appId, generateCorrelationId } from '../api/headers'
import { getApiData } from '../api/api'

axios.defaults.headers.common['correlationId'] = generateCorrelationId()
axios.defaults.headers.common['appId'] = appId

axios.interceptors.request.use(async config => {
  const accessToken = getAuthToken()
  if (!accessToken) {
    try {
      const { url, body } = getApiData('authenticate')
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'correlationId': generateCorrelationId(),
            'appId': appId
          },
          body: JSON.stringify(body)
        })
        const json = await res.json()
        setAuthToken(json.response.payload)
      }catch(err) {
        throw new Error(err.message)
      }
    } catch(err) {
      throw new Error('Authorization Error')
    }
  }

  let newConfig = Object.assign({}, config)
  newConfig.headers.Authorization = `Bearer ${getAuthToken()}`
  return newConfig
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp