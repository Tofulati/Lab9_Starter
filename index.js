window.onerror = function(message, source, lineno, colno, error) {
    console.log('Global error caught!');
    console.log('Message:', message);
    console.log('Source:', source);
    console.log('Line:', lineno, 'Column:', colno);
    console.log('Error object:', error);

    if (window.TrackJS) {
        TrackJS.track(error || message);
    }
};

class CalculationError extends Error {
    constructor(message = 'An error occurred during calculation') {
        super(message);
        this.name = "CalculationError";
    }
}

class EmptyError extends Error {
    constructor(message = 'Input cannot be empty') {
        super(message);
        this.name = "EmptyError";
    }
}

class InvalidOperatorError extends Error {
    constructor(message = 'Invalid operator provided') {
        super(message);
        this.name = "InvalidOperatorError";
    }
}

let form = document.querySelector('form');
let output = document.querySelector('output');

function calculateValues(firstNum, secondNum, operator) {
    try {
        if (firstNum === '' || secondNum === '' || operator === '') {
            throw new EmptyError();
        }
        if (!['+', '-', '*', '/'].includes(operator)) {
            throw new InvalidOperatorError();
        }
        if (isNaN(firstNum) || isNaN(secondNum)) {
            throw new CalculationError();
        }

        let result = eval(`${firstNum} ${operator} ${secondNum}`);
        
        if (isNaN(result)) {
            throw new CalculationError();
        }

        return result;
    } catch (error) {
        console.error('Error in calculateValues: ', error);

        if (window.TrackJS) {
            TrackJS.track(error);
        }

        return null;
    } finally {
        console.log('Calculation completed');
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    let output = document.querySelector('output');
    let firstNum = document.querySelector('#first-num').value;
    let secondNum = document.querySelector('#second-num').value;
    let operator = document.querySelector('#operator').value;
    const result = calculateValues(firstNum, secondNum, operator);

    if (result !== null) {
        output.innerHTML = result;
    } else {
        output.innerHTML = 'Error';
    }
});

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

errorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        let firstNum = document.querySelector('#first-num').value;
        let secondNum = document.querySelector('#second-num').value;
        let operator = document.querySelector('#operator').value;
        
        try {
            if (document.querySelector('output').textContent === '') {
                throw new EmptyError();
            }
        } catch (error) {
            console.error(error);
            
            if (window.TrackJS) {
                TrackJS.track(error);
            }
        }

        let outputValue = form.querySelector('output').textContent;

        if (btn.textContent === 'Console Log') {
            console.log('Your total is ', outputValue);
        } else if (btn.textContent === 'Console Error') {
            if (typeof outputValue === 'string' && outputValue === '') {
                console.error('Invalid output');
            }
        } else if (btn.textContent === 'Console Count') {
            console.count('Console Count');
        }  else if (btn.textContent=== 'Console Warn') {
            console.warn('This is a warning about your output', outputValue);
        }  else if (btn.textContent === 'Console Assert') {
            console.assert(outputValue !== '', 'Empty output detected')
        }  else if (btn.textContent === 'Console Clear') {
            console.clear();
        }  else if (btn.textContent === 'Console Dir') {
            console.dir(form);
        }  else if (btn.textContent === 'Console dirxml') {
            console.dirxml(form);
        } else if (btn.textContent === 'Console Group Start') {
            console.group('Form Input Group');
            console.info('First Number: ', firstNum);
            console.info('Second Number: ', secondNum);
            console.info('Operator: ', operator);
            console.info('Output: ', outputValue);
        }  else if (btn.textContent === 'Console Group End') {
            console.groupEnd();
            console.info('Group Ended');
        }  else if (btn.textContent === 'Console Table') {
            console.table([
                {Label: 'First Number', Value: firstNum},
                {Label: 'Second Number', Value: secondNum},
                {Label: 'Operator', Value: operator},
                {Label: 'Output', Value: outputValue}
            ]);
        }  else if (btn.textContent === 'Start Timer') {
            console.time('Calculation Timer');
        }  else if (btn.textContent === 'End Timer') {
            console.timeEnd('Calculation Timer');
        }  else if (btn.textContent === 'Console Trace') {
            console.trace('Tracing calcuateValues function');
            result = calculateValues(firstNum, secondNum, operator);
            console.log('Trace Result: ', result);
        }  else if (btn.textContent === 'Trigger a Global Error') {
            let missing = document.querySelector('#missing-element').textContent;
        } 
    })
})