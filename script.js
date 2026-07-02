const timerEl = document.getElementById('timer');
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const resultEl = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const spinnerContainer = document.getElementById('spinnerContainer');
const content = document.getElementById('content');

let timerInterval = null;
let seconds = 0;

function showSpinner() {
    spinnerContainer.classList.remove('d-none');
    content.classList.add('d-none');
}

function hideSpinner() {
    spinnerContainer.classList.add('d-none');
    content.classList.remove('d-none');
}

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerEl.textContent = '0 s';
    timerInterval = setInterval(() => {
        seconds++;
        timerEl.textContent = seconds + ' s';
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

async function fetchQuote() {
    showSpinner();
    stopTimer();
    resultEl.textContent = '';
    resultEl.className = 'result-text';
    quoteInput.value = '';

    try {
        const response = await fetch('https://apis.ccbp.in/random-quote');
        const data = await response.json();
        quoteDisplay.textContent = data.content;
    } catch (err) {
        quoteDisplay.textContent = 'Failed to load quote. Please try again.';
    }

    hideSpinner();
    startTimer();
}

submitBtn.addEventListener('click', () => {
    const typed = quoteInput.value;
    const original = quoteDisplay.textContent;

    if (typed === original) {
        stopTimer();
        resultEl.textContent = '✅ You have typed the correct quote. Congratulations!';
        resultEl.className = 'result-text success';
    } else {
        resultEl.textContent = '❌ The text does not match. Please try again.';
        resultEl.className = 'result-text error';
    }
});

resetBtn.addEventListener('click', () => {
    fetchQuote();
});

// Init
fetchQuote();