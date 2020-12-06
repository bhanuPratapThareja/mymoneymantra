const config = require("../config.json")
const fetch = require("isomorphic-unfetch")

class Strapi {
    baseUrl;
    identifier;
    password;
    token;

    constructor() {
        this.baseUrl = config.STRAPI.BASE_URL;
        this.identifier = config.STRAPI.IDENTIFIER;
        this.password = config.STRAPI.PASSWORD;
        this.token = config.STRAPI.JWT_TOKEN;
    }

    apiReq = async (method, url, body) => {
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDczMzM3NzAsImlhdCI6MTYwNzI0NzM3MH0.Z4T4EVuX7FsOlRQUfUHVuADyQX_rtgOOAA3I5m1LqN6pIzdRFWt2I-4a2tFIHUBzzQYj2VQmy6qInlk3axLH3w'
                },
                body: body ? JSON.stringify(body) : null
            })
            const json = await res.json()
            return json
        } catch (err) {
            return null
        }
    }

    processReq = async (method, endPath, body = null, headers = null) => {
        const url = `${this.baseUrl}/${endPath}`
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
            })
            const json = await res.json()
            return json
        } catch (err) {
            return null
        }
    }
}

export default Strapi
