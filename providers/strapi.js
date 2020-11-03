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

    //   authenticate = async () => {
    //     try {
    //       const result = await fetch(this.baseUrl + "/auth/local", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/JSON",
    //         },
    //         body: JSON.stringify({
    //           identifier: this.identifier,
    //           password: this.password,
    //         }),
    //       });

    //       const json = await result.json();
    //       this.token = json.jwt;
    //       return true;
    //     } catch (error) {
    //       throw error;
    //     }
    //   };

    //   processReq = async (method = "GET", url, headers = null, body = null) => {
    //     try {
    //       if (this.token === null) {
    //         await this.authenticate();
    //       }

    //       const result = await fetch(this.baseUrl + url, {
    //         method: method,
    //         headers: {
    //           Authorization: "Bearer " + this.token,
    //           ...(headers !== null ? headers : {}),
    //         },
    //         body: body !== null ? JSON.stringify(body) : null,
    //       });

    //       const json = await result.json();
    //       return json;
    //     } catch (error) {
    //       console.log(error);
    //       return false;
    //     }
    //   };

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
            throw ('Error: ', err)
        }
    }
}

export default Strapi;
