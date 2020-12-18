const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDgzODMzMDksImlhdCI6MTYwODI5NjkwOX0.MfHsO-vT-7yJq6LGW_epVHjW_7aYqCVsYWrWLZ4CoCr61YKnm9FTc2yR6eEps6PReDKNBUkjXJ1_H-zADPnHTQ'

export const setAuthToken = token => {
    localStorage.setItem('token', token)
}

export const getAuthToken = () => {
    return token
}