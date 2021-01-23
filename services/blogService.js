import axios from 'axios'
import { getApiData } from '../api/api'


export const commentLikeDislike = (sentiment) => {
  const { url, body } = getApiData('commentLikeDislike')
  body.request.payload.sentiment = sentiment
  body.request.payload.blogId = '3'
  body.request.payload.customerId = '12345'
  body.request.payload.commentId = '1'
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
  const { url } = getApiData('getBlogs')
  axios.get(`${url}${blogId}`).then(res => console.log(res)).catch(err => console.log(err))
}