export const isScrolledIntoView = el => {
    var rect = el.getBoundingClientRect()
    var elemTop = rect.top
    var elemBottom = rect.bottom
    return elemTop < window.innerHeight && elemBottom >= 0
}