// for requests

export const getApiToHit = apiEndPoint => {
    // console.log('api end point: ', apiEndPoint)
    switch (apiEndPoint) {
        case 'bank':
        case 'bank_name':
            return 'cities'

        case 'city':
            return 'cities'

        case 'company_name':
            return 'cities'

        case 'pincode':
            return 'cities'

    }
}

// for responses

export const properties = listType => {
    let properties = {}

    switch (listType) {
        case 'bank':
        case 'bank_name':
            properties = { listName: 'cityList', id: 'cityMasterId', name: 'cityMasterName' }

        case 'cities':
            properties = { listName: 'cityList', id: 'cityMasterId', name: 'cityMasterName' }

        case 'company':
            properties = { listName: 'cityList', id: 'cityMasterId', name: 'cityMasterName' }
            
        case 'pincode':
            properties = { listName: 'cityList', id: 'cityMasterId', name: 'cityMasterName' }
    }

    return properties
}