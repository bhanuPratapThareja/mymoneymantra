import axios from 'axios'
import { getApiData } from '../api/api'

export const getBlogComments = async blogId => {
  const { url } = getApiData('getBlogs')
  const params = { blogId }
  const res = await axios.get(url, { params })
  return res.data
}