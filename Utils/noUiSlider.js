export const initializeTenure = (el, min, max, start, stop) => {
    setTimeout(() => {
        noUiSlider.create(el, {
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
    }, 500);
}

export const initializeRange = (el, min, max, start, stop) => {
    setTimeout(() => {
        noUiSlider.create(el, {
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
    }, 500);
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

export const initializeLoan = (el, min, max, start,  stop) => {
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
              to: function(value) {
                  return (parseInt(value)+" yrs.");
              }
          },
            connect: true
          });
    }, 500);
}