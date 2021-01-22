// for requests

export const getApiToHit = apiEndPoint => {
    switch (apiEndPoint) {
        case 'bank':
            return { listType: 'bank', masterName: 'bankList' }

        case 'cities':
            return { listType: 'cities', masterName: 'cityList' }

        case 'company':
            return { listType: 'company', masterName: 'companyMaster' }

        case 'pincode':
            return { listType: 'pincode', masterName: 'pinList' }

        case 'designation':
            return { listType: 'designation', masterName: 'designationMaster'}

        case 'qualification':
            return { listType: 'qualification', masterName: 'qualificationMaster'}

        case 'occupancy':
            return { listType: 'occupancyStatus', masterName: 'occupancyStatusMaster'}


    }
}

// for responses

export const properties = listType => {
    let properties = {}
    switch (listType) {
        case 'bank':
            properties = { listName: 'bankList', listItemId: 'bankId', listItemName: 'bankName' }
            break

        case 'cities':
            properties = { listName: 'cityList', listItemId: 'cityId', listItemName: 'cityName' }
            break

        case 'company':
            properties = { listName: 'companyList', listItemId: 'caseCompanyId', listItemName: 'companyName' }
            break

        case 'pincode':
            properties = { listName: 'pinList', listItemId: 'pincode', listItemName: 'pincode' }
            break
        
        case 'designation':
            properties = { listName: 'designationList', listItemId:'designationId', listItemName: 'designationName'}
            break

        case 'qualification':
            properties = {listName: 'qualificationList', listItemId: 'qualificationId', listItemName:'qualificationName'}
            break

        case 'occupancyStatus':
            properties = {listName:'occupancyStatusList', listItemId:'occupancyStId', listItemName: "occupancyStName"}
    
        }

    return properties
}