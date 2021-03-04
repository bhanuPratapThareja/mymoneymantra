import Axios from 'axios'
import { getApiData } from '../api/api'

export const getCreditScore = async () => {
  try {
    const customerId = localStorage.getItem('customerId')
    const { url, body } = getApiData('creditProfileScore')
    body.customerId = customerId 
    const response = await Axios.post(`${url}`, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const getCreditAccounts = async () => {
  try {
    let customerId = localStorage.getItem('customerId')
    let { url, body } = getApiData('creditProfileAccounts')
    body.customerId = customerId 
    let response = await Axios.post(`${url}`, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const getCreditAge = async () => {
  try {
    let customerId = localStorage.getItem('customerId')
    let { url, body } = getApiData('creditProfileAge')
    body.customerId = customerId 
    let response = await Axios.post(`${url}`, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const getCreditEnquiries = async () => {
  try {
    let customerId = localStorage.getItem('customerId')
    let { url, body } = getApiData('creditProfileEnquiries')
    body.customerId = customerId 
    let response = await Axios.post(`${url}`, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const getCreditRank = async () => {
  try {
    let customerId = localStorage.getItem('customerId')
    let { url, body } = getApiData('creditProfileRank')
    body.customerId = customerId 
    let response = await Axios.post(`${url}`, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const getCreditUtilization = async () => {
  try {
    let customerId = localStorage.getItem('customerId')
    let { url, body } = getApiData('creditProfileUtilization')
    body.customerId = customerId 
    let response = await Axios.post(`${url}`, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}
