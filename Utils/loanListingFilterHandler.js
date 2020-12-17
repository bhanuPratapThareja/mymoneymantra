import Router from 'next/router'
import $ from 'jquery'

export const closeFilter = filters => {
    const route = Router.route
    if (filters) {
        let query = {}
        for(let [key, value] of  Object.entries(filters)) {
            if(Array.isArray(value)) {
                query[key] = value.join(',')
            }
            if(typeof value === 'string') {
                query[key] = value
            }
        }
        console.log(query)
        Router.push(`${route}`, { query })
    }
    $(".filter-cross").closest(".mm-modal").slideToggle(300);
    $('body', "html").css("overflow", "scroll")
}