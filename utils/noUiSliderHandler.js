export const getSliderFilterValues = (slider, rangeId) => {
    const parentEl = document.getElementById(rangeId)
    if (!slider || !parentEl) {
        return null
    }

    const el = parentEl.getElementsByClassName('noUi-tooltip')
    if (el.length && slider) {
        let minSelected = el[0].innerHTML
        let maxSelected = el[1].innerHTML
        minSelected = minSelected.split('')
        minSelected = minSelected.filter(val => Number(val) || val == 0)
        minSelected = minSelected.join('').trim()
        maxSelected = maxSelected.split('')
        maxSelected = maxSelected.filter(val => Number(val) || val == 0)
        maxSelected = maxSelected.join('').trim()

        const { max } = slider
        return [minSelected, maxSelected, max]
    }
    return null
}


export const initializeYearRange = (slider, rangeId) => {
    var rangeSlider = document.getElementById(rangeId)
    if (rangeSlider) {

        let { max, min, start, stop } = slider
        if (!start || start < min) {
            start = min
        }
        if (!stop || stop > max) {
            stop = max
        }

        setTimeout(() => {
            noUiSlider.create(rangeSlider, {
                start: [start, stop],
                step: 1,
                range: {
                    'min': [min],
                    'max': [max]
                },
                tooltips: true,
                format: {
                    from: Number,
                    to: function (value) {
                        return (parseInt(value) + " yrs.");
                    }
                },
                connect: true
            });
        }, 1000)
    }
}

export const initializeMoneyRange = (slider, rangeId) => {
    if (slider) {
        const wNumb = window.wNumb
        var moneyFormat = wNumb({
            decimals: 0,
            thousand: ',',
            prefix: '₹',
            tooltips: true,
        })

        var rangeSlider = document.getElementById(rangeId)
        if (rangeSlider) {
            let { max, min, start, stop } = slider
            if (start < min) {
                start = min
            }
            if (stop > max) {
                stop = max
            }

            setTimeout(() => {
                noUiSlider.create(rangeSlider, {
                    start: [start, stop],
                    step: 1,
                    range: {
                        'min': [min],
                        'max': [max]
                    },
                    tooltips: true,
                    format: moneyFormat,
                    connect: true
                });
            }, 1000)
        }
    }
}

export const initializeInvestment = (el, min, max, start, stop) => {
    setTimeout(() => {
        noUiSlider.create(invest, {
            start: [2000, 3000],
            step: 1,
            range: {
                'min': [500],
                'max': [5000]
            },
            tooltips: true,
            format: moneyFormat,
            connect: true
        });
    }, 500);
}

export const initializeLoan = (el, min, max, start, stop) => {
    setTimeout(() => {
        noUiSlider.create(loan, {
            start: [3, 8],
            step: 1,
            range: {
                'min': [1],
                'max': [10]
            },
            tooltips: true,
            format: {
                from: Number,
                to: function (value) {
                    return (parseInt(value) + " yrs.");
                }
            },
            connect: true
        });
    }, 500);
}

export const initializePercentRange = (slider, rangeId) => {
    var rangeSlider = document.getElementById(rangeId)
    if (rangeSlider) {

        let { max, min, start, stop } = slider
        if (!start || start < min) {
            start = min
        }
        if (!stop || stop > max) {
            stop = max
        }

        setTimeout(() => {
            noUiSlider.create(rangeSlider, {
                start: [start, stop],
                step: 1,
                range: {
                    'min': [min],
                    'max': [max]
                },
                tooltips: true,
                format: {
                    from: Number,
                    to: function (value) {
                        return (parseInt(value) + "%");
                    }
                },
                connect: true
            });
        }, 1000)
    }
}
