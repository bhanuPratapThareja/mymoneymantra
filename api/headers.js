import { getCookie } from '../utils/cookie'

export const appId = 'MMMWEBAPP'

export const getAuthToken = () => {
    return getCookie('accessToken')
}

export const setAuthToken = ({ accessToken, validTimeInSec }) => {
    document.cookie = `accessToken=${accessToken}; max-age=${validTimeInSec}`
}