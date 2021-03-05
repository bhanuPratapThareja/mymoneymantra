import Axios from 'axios'
import { getApiData } from '../api/api'
import { getItem, keys } from './storage'

export const getCreditScore = async () => {
  try {
    const customerId = await getItem(keys.customerId);
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
    const customerId = await getItem(keys.customerId);
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
    const customerId = await getItem(keys.customerId);
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
    const customerId = await getItem(keys.customerId);
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
    const customerId = await getItem(keys.customerId);
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
    const customerId = await getItem(keys.customerId);
    let { url, body } = getApiData('creditProfileUtilization')
    body.customerId = customerId 
    let response = await Axios.post(`${url}`, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}
