const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDgyOTUxMzQsImlhdCI6MTYwODIwODczNH0.CMDAIhXn-egpJlyyCMDHaztkhQE1PzPNItbgRsHN7_b9a0kDk2kCmE41CefDm4k3pIag7UTn-NZfga_ZLk5GwQ'

export const setAuthToken = token => {
    localStorage.setItem('token', token)
}

export const getAuthToken = () => {
    return token
}