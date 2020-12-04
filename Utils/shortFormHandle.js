import $ from 'jquery'

export const getCurrentSlideInputs = state => {
    const newSlides = [...state.slides]
    const slide = newSlides.filter(slide => slide.slideId === state.currentSlide)
    const inputs = slide[0].inputs
    return { newSlides, inputs }
}

export const handleChangeInputs = () => {
    if (field.type === 'input_with_calendar') {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                inp.value = field.value
            }
        })
    } else if (field.type === 'radio') {
        inputs.forEach(inp => {
            if (inp.input_id === field.name) {
                inp.value = field.value
            }
        })
    }
}

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