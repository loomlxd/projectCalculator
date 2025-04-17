import '../scss/style.scss'

const display = document.querySelector('.up-calc');
const numberButtons = document.querySelectorAll('.center-calc div:not(.C-button)');
const operatorButtons = document.querySelectorAll('.right-calc div:not(.equals-btn)');
const equalsButton = document.querySelector('.equals-btn');
const clearButton = document.querySelector('.C-button');

let currentInput = '';
let previsionInput = '';
let operator = '';

document.querySelector('.multiply-btn').classList.add('disabled');
document.querySelector('.divide-btn').classList.add('disabled');
document.querySelector('.plus-btn').classList.add('disabled');

function showWithFade(button) {
    button.classList.add('fade');
    setTimeout(() => button.classList.remove('fade'), 300);
}

function showShake(button) {
    button.classList.add('shake');
    setTimeout(() => button.classList.remove('shake'), 300);
}

function updateDisplay(value) {
    display.textContent = value;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '.' && currentInput.includes('.')) return;

        currentInput += value;
        display.textContent += value;
        document.querySelector('.multiply-btn').classList.remove('disabled');
        document.querySelector('.divide-btn').classList.remove('disabled');
         document.querySelector('.plus-btn').classList.remove('disabled');
        showWithFade(button);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (currentInput === '' && value === '-') {
            currentInput = '-';
            display.textContent += '-';
            return;
        }
        if (currentInput === '' || currentInput === '-') return;

        if (previsionInput !== '' && currentInput !== '' && operator) {
            calculate();
            previsionInput = currentInput;
            currentInput = '';
        } else {
            previsionInput = currentInput;
            currentInput = '';
        }

        operator = button.textContent;
        currentInput = '';
        display.textContent += ` ${operator} `;
        showWithFade(button);
    });
});

equalsButton.addEventListener('click', () => {
    if(currentInput === '' || previsionInput === '' || !operator) return;
    calculate();
    showWithFade(equalsButton);
});

clearButton.addEventListener('click', () => {
    previsionInput = '';
    currentInput = '';
    operator = '';
    updateDisplay('');
    document.querySelector('.multiply-btn').classList.add('disabled');
    document.querySelector('.divide-btn').classList.add('disabled');
    document.querySelector('.plus-btn').classList.add('disabled');
    showShake(clearButton);
});

function calculate() {
    const a = parseFloat(previsionInput);
    const b = parseFloat(currentInput);

    let result = 0;

    switch(operator) {
        case '+':result = a + b; break;
        case '-':result = a - b; break;
        case 'X':result = a * b; break;
        case '/':result = b !== 0 ? a / b: 'Error'; break;
        default: return;
    }

    currentInput = result.toString();
    previsionInput = '';
    updateDisplay(currentInput);
};