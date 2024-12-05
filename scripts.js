let num1 = '';
let num2 = '';
let operator = '';
let current = 'first';

const display = document.querySelector(".content");
const buttonsDiv = document.querySelector('.buttons');

const buttons = [
    { label: 'C', class: 'reset' },
    { label: 'CE', class: 'clear' },
    { label: '/', class: 'divide' },
    { label: '*', class: 'multiply' },
    { label: 9, class: 'number' },
    { label: 8, class: 'number' },
    { label: 7, class: 'number' },
    { label: '-', class: 'subtract' },
    { label: 6, class: 'number' },
    { label: 5, class: 'number' },
    { label: 4, class: 'number' },
    { label: '+', class: 'add' },
    { label: 3, class: 'number' },
    { label: 2, class: 'number' },
    { label: 1, class: 'number' },
    { label: 0, class: 'number' },
    { label: 'Enter', class: 'enter' },
];

buttons.forEach(({ label, class: className }) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add(className);
    button.addEventListener('click', handleButtonClick);
    buttonsDiv.appendChild(button);
});

function updateDisplay(info) {
    display.textContent = info || '0';
}

function handleButtonClick(e) {
    const value = e.target.textContent;

    if (!isNaN(value)) {
        if (current === 'first') {
            num1 += value;
            updateDisplay(num1);
        } else {
            num2 += value;
            updateDisplay(num2);
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (num1) {
            operator = value;
            current = 'second';
            updateDisplay(operator);
        }
    } else if (value === 'Enter' && num1 && num2 && operator) {
        const result = operate(operator, parseFloat(num1), parseFloat(num2));
        updateDisplay(result);
        num1 = result.toString();
        num2 = '';
        operator = '';
        current = 'first';
    } else if (value === 'CE') {
        if (current === 'first') num1 = '';
        else num2 = '';
        updateDisplay('');
    } else if (value === 'C') {
        num1 = num2 = operator = '';
        current = 'first';
        updateDisplay('');
    }
}

function operate(operator, n1, n2) {
    switch (operator) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '*': return n1 * n2;
        case '/': return n2 !== 0 ? n1 / n2 : 'Error';
        default: return 0;
    }
}
