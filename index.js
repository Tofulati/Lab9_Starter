let form = document.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let output = document.querySelector('output');
      let firstNum = document.querySelector('#first-num').value;
      let secondNum = document.querySelector('#second-num').value;
      let operator = document.querySelector('#operator').value;
      output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
    });

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

errorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        let firstNum = document.querySelector('#first-num').value;
        let secondNum = document.querySelector('#second-num').value;
        let operator = document.querySelector('#operator').value;
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

            function calculateValues() {
                return eval(`${firstNum} ${operator} ${secondNum}`);
            }

            console.trace(calculateValues);
            result = calculateValues();
            console.log('Calculation Result: ', result);

        }  else if (btn.textContent === 'Trigger a Global Error') {
            throw new Error('YOU MADE A MISTAKE! This is a global error.');
        } 
    })
})