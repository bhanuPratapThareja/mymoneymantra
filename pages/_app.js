import '../styles/globals.css'
import '../styles/custom.css'
import axios from 'axios'
import { setAuthToken, getAuthToken } from '../api/headers'
import { generateCorrelationId } from '../Utils/correlationId'
import { getApiData } from '../api/api';

// axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`

axios.interceptors.request.use(async config => {
  const accessToken = getAuthToken()
  if (!accessToken) {
    try {
      const { url, body } = getApiData('authenticate')
      body.request.header.correlationId = generateCorrelationId()
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const json = await res.json()
      let { accessToken, validTimeInSec } = json.response.payload
      const token = { accessToken, validTimeInSec }
      setAuthToken(token)
    } catch(err) {
      throw new Error('Authorization Error')
    }

  }

  let newConfig = Object.assign({}, config)
  newConfig.data.request.header.correlationId = generateCorrelationId()
  newConfig.headers.Authorization = `Bearer ${getAuthToken()}`
  console.log('new config: ', newConfig)
  return newConfig
  
})

// axios.interceptors.response.use(response => response, error => {
//   if(error.response.data && error.response.data.status && error.response.data.status == '401'){
//     return
//   }
//   console.log('error.response.data.status: ', error.response.data.status)
//   return Promise.reject(error)
// })

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp