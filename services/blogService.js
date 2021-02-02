import axios from 'axios'
import { getApiData } from '../api/api'
import { getAuthToken, setAuthToken } from '../api/headers'
import { generateCorrelationId } from '../utils/correlationId'



export const getBlogComments = async (blogId) => {

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
      setAuthToken(json.response.payload)
    } catch (err) {
      throw new Error('Authorization Error')
    }
  }

  const { url } = getApiData('getBlogs')
  const res = await fetch(`${url}${blogId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'correlationId': generateCorrelationId(),
      'appId': 'webapi'
    },
  })
  const data = await res.json();
  return data

  // axios.get(`${url}${blogId}`).then(res => console.log(res)).catch(err => console.log(err))
}