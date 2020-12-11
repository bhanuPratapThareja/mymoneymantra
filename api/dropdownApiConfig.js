// for requests

export const getApiToHit = apiEndPoint => {
    switch (apiEndPoint) {
        case 'bank':
        case 'bank_name':
            return 'bank'

        case 'city':
            return 'cities'

        case 'company_name':
            return 'companies'

        case 'pincode':
            return 'pincode'

    }
}

// for responses

export const properties = listType => {
    let properties = {}

    switch (listType) {
        case 'bank':
        case 'bank_name':
            properties = { listName: 'bankList', id: 'bankId', name: 'bankName' }
            break

        case 'cities':
            properties = { listName: 'cityList', id: 'cityMasterId', name: 'cityMasterName' }
            break

        case 'companies':
            properties = { listName: 'companyList', id: 'caseCompanyId', name: 'companyName' }
            break

        case 'pincode':
            properties = { listName: 'pinList', id: 'pincode', name: 'pincode' }
    }

    return properties
}