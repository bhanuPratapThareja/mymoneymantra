const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDgxMDY5NjgsImlhdCI6MTYwODAyMDU2OH0._P1xvdUpprK_NE2ERfy6pfHCSv0SuZpOAnD8nmqTQGhgeUumfuJz8i1ykoVFVf12_exH_Wo10wcvKaMBm6Aggg'

export const setAuthToken = token => {
    localStorage.setItem('token', token)
}

export const getAuthToken = () => {
    return token
}