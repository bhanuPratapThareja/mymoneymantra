const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDgwMTk3NDEsImlhdCI6MTYwNzkzMzM0MX0.oBtFu8ysYlkEn_xGqXNfjjWvFeyioveU3Xu1AW8gpUP-ceGtEfiGoDO4kLfGgHqof_S0cvx9ffoWoGVlx17oWw'

export const setAuthToken = token => {
    localStorage.setItem('token', token)
}

export const getAuthToken = () => {
    return token
}