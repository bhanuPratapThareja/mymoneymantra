import { getApiData } from '../api/api';
import Strapi from '../providers/strapi'

let bankmaster = []
let companymaster = []

export const setBankMaster = data => {
    bankmaster = { bankList: data }
}

export const setCompanyMaster = data => {
    companymaster = { companyList: data }
}

export const getBankList = (val) => {
    const promise =  new Promise((resolve) => {
        if (bankmaster.bankList.length) {
            let filteredBankList = bankmaster.bankList.filter(bank => {
                return bank.bankName.startsWith(val.toUpperCase())
            })
            if (filteredBankList.length) {
                resolve({ bankList: filteredBankList })
            } else {
                resolve([])
            }
        } else {
            resolve([])
        }
    })
    return promise
}

export const getCompanyList = (val) => {
    const promise =  new Promise((resolve) => {
        if (companymaster.companyList.length) {
            let filteredCompanyList = companymaster.companyList.filter(company => {
                return company.companyName.startsWith(val.toUpperCase())
            })
            if (filteredCompanyList.length) {
                resolve({ companyList: filteredCompanyList })
            } else {
                resolve([])
            }
        } else {
            resolve([])
        }
    })
    return promise
}

export const getDropdownList = async (type, value) => {
    const strapi = new Strapi()
    const { url, body } = getApiData(type)
    body.request.payload.name = value
    const res = await strapi.apiReq('POST', url, body)
    if (res && res.response) return res.response.payload
    else return []
}