import axios from 'axios'
import moment from 'moment'
import { getApiData } from '../api/api'

export const getPersonalInfo = async () => {
  try {
    let customerId = await localStorage.getItem('customerId')
    let { url } = getApiData('getPersonalInfo')
    let response = await axios.get(
      `${url}?customerId=${customerId ? customerId : 206}`
    )
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const getWorkInfo = async () => {
  try {
    let customerId = await localStorage.getItem('customerId')
    let { url } = getApiData('workProfile')
    let response = await axios.get(
      `${url}?customerId=${customerId ? customerId : 206}`
    )
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const savePersonalInfo = async (
  name,
  lastname,
  gender,
  martialStatus,
  panNo,
  dob
) => {
  try {
    let customerId = await localStorage.getItem('customerId')
    const { url, body } = getApiData('savePersonalInfo')
    body.customerId = customerId
    body.firstName = name ? name : null
    body.lastName = lastname ? lastname : null
    body.gender = gender ? gender : null
    body.martialStatus = martialStatus ? martialStatus : null
    body.panNo = panNo ? panNo : null
    body.dob = dob ? moment(dob, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
    let response = await axios.post(url, body)
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const getContactInfo = async () => {
  try {
    let customerId = await localStorage.getItem('customerId')
    const { url } = getApiData('contactProfile')
    let response = await axios.get(
      `${url}?customerId=${customerId ? customerId : 206}`
    )
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const saveContactInfo = async (mobileNo, emailId, address) => {
  try {
    const customerId = localStorage.getItem('customerId')
    const { url } = getApiData('contactProfile')
    const responseObject = await axios.post(`${url}`, {
      customerId,
      mobileNo,
      emailId,
      address,
    })
    return responseObject
  } catch (err) {
    throw err
  }
}

export const getAllDocuments = async () => {
  try {
    const customerId = localStorage.getItem('customerId')
    const { url } = getApiData('allDocument')
    const responseObject = await axios.get(
      `${url}?customerId=${customerId ? customerId : 101}`
    )
    return responseObject
  } catch (err) {
    throw err
  }
}
