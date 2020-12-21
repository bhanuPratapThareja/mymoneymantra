const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDg1NDYwOTAsImlhdCI6MTYwODQ1OTY5MH0.GxpTKAGbQj15RzuVdCzeA-JbRaDsGZCIWm5ZIoSJz-XmaACMey28gEBkYEZNUDUeL1zGMJfZ62uRzM2W-kLp2A'

export const setAuthToken = token => {
    localStorage.setItem('token', token)
}

export const getAuthToken = () => {
    return token
}