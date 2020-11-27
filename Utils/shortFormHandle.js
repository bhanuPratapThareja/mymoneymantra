import $ from 'jquery'

export const submitLetsFindForm = () => {
    $(".lets-find-forms-container").removeClass("moving-in-rev")
    $(".lets-find").removeClass("moving-out-rev")
    $(".lets-find-forms-container").addClass("moving-in")
    $(".lets-find").addClass("moving-out")
}

export const loadLetsFindForm = () => {
    $(".lets-find-forms-container").removeClass("moving-in")
    $(".lets-find").removeClass("moving-out")
    $(".lets-find-forms-container").addClass("moving-in-rev")
    $(".lets-find").addClass("moving-out-rev")
}