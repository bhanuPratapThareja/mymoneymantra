import $ from 'jquery'
import Router from 'next/router'

export const closeFilter = state => {
    const route = Router.route
    const filtersList = Object.entries(state)
     $(".filter-cross").closest(".mm-modal").slideToggle(300);
    $('body', "html").css("overflow", "scroll")
    if(filtersList.length) {
        Router.push(`${route}`, { query : { test: 'abcde' }})
    }
}