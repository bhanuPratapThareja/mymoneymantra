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
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWFkZ2VuZXJhdGVhcGkiLCJleHAiOjE2MDgzODMzMDksImlhdCI6MTYwODI5NjkwOX0.MfHsO-vT-7yJq6LGW_epVHjW_7aYqCVsYWrWLZ4CoCr61YKnm9FTc2yR6eEps6PReDKNBUkjXJ1_H-zADPnHTQ'
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
