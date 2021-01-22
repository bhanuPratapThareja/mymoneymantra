import axios from 'axios'
import Strapi from '../providers/strapi'
import { getApiData } from '../api/api'
import { getLeadId } from '../utils/localAccess'

const strapi = new Strapi()

export const commentLikeDislike = (sentiment) => { 
    const {url,body} = getApiData('commentLikeDislike')
    body.request.payload.sentiment = sentiment
    body.request.payload.blogId = '3'
    body.request.payload.customerId = '12345'
    body.request.payload.commentId = '1'
    
    axios.post(url,body).then(res =>console.log(res)) .catch(() => { })

}

export const addComment = (comment) => {
  const {url,body} = getApiData('addComment')
  body.request.payload.blogId = '3'
  body.request.payload.customerId = '12345'
  body.request.payload.comment = comment 
  
  axios.post(url,body).then(res =>console.log(res)) .catch(() => { })

}