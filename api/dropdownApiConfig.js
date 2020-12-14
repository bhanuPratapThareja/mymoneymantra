// for requests

export const getApiToHit = apiEndPoint => {
    switch (apiEndPoint) {
        case 'bank':
        case 'bank_name':
            return { listType: 'masters', masterName: 'bankMaster' }

        case 'city':
            return { listType: 'cities', masterName: 'bankMaster' }

        case 'company_name':
            return { listType: 'company', masterName: 'companyMaster' }

        case 'pincode':
            return { listType: 'pincode', masterName: 'pinList' }

    }
}

// for responses

export const properties = listType => {
    let properties = {}

    switch (listType) {
        case 'bank':
        case 'bank_name':
        case 'masters':
            properties = { listName: 'masters', listItemId: 'bankId', listItemName: 'bankName' }
            break

        case 'cities':
            properties = { listName: 'cityList', listItemId: 'cityMasterId', listItemName: 'cityMasterName' }
            break

        case 'company':
            properties = { listName: 'companyList', listItemId: 'caseCompanyId', listItemName: 'companyName' }
            break

        case 'pincode':
            properties = { listName: 'pinList', listItemId: 'pincode', listItemName: 'pincode' }
    }

    return properties
}