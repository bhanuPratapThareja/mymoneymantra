import axios from 'axios'
import { getApiData } from '../api/api'
import { getAuthToken, setAuthToken } from '../api/headers'


export const commentLikeDislike = (sentiment, blogId, commentId) => {
  const { url, body } = getApiData('commentLikeDislike')
  body.sentiment = sentiment
  body.blogId = blogId
  body.customerId = '12345'
  body.commentId = commentId
  axios.post(url, body).then().catch()
}

export const blogLikeDislike = (sentiment, blogId) => {
  const { url, body } = getApiData('blogLikeDislike')
  body.sentiment = sentiment
  body.blogId = blogId
  body.customerId = '12345'
  console.log(url, body)
  axios.post(url, body).then().catch()
}

export const addComment = (comment, blogId) => {
  const { url, body } = getApiData('addComment')
  body.blogId = blogId
  body.customerId = '12345'
  body.comment = comment
  axios.post(url, body).then().catch()
}
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
      'Authorization': `Bearer ${getAuthToken()}`
    },
  })
  const data = await res.json()
  return data

  // axios.get(`${url}${blogId}`).then(res => console.log(res)).catch(err => console.log(err))
}