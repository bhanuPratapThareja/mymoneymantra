import $ from 'jquery'

export const onCloseFilter = () => {
    $(".filter-cross").closest(".mm-modal").slideToggle(300);
    $('body', "html").css("overflow", "scroll")
}