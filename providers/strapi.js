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
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDY2MzkxNTAsImlhdCI6MTYwNjU1Mjc1MH0.Xdsc4D38KKPpHZ9ukUqobJRBpAO0fJF-W-Rer8S3b-_MtowlktfM1aMBHZ5ib6S7w0qOEKE2GZI9o2Hys68wrg'
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
        console.log(url)
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
            })
            console.log(res)
            const json = await res.json()
            return json
        } catch (err) {
            return null
        }
    }
}

export default Strapi
