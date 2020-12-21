import { getCookie } from '../Utils/cookie';

export const getAuthToken = () => {
    return getCookie('accessToken')
}

export const setAuthToken = ({ accessToken, validTimeInSec }) => {
    document.cookie = `accessToken=${accessToken}; max-age=${validTimeInSec}`
}