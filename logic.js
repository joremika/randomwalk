// DOM Elements
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const winProbInput = document.getElementById('win-probability');
const winProbSlider = document.getElementById('win-prob-slider');
const probValue = document.getElementById('prob-value');
const stepsInput = document.getElementById('steps');
const stepsSlider = document.getElementById('steps-slider');
const stepsValue = document.getElementById('steps-value');
const limitCheckbox = document.getElementById('limit-50');
const resultsContainer = document.getElementById('results-container');

const translations = {
    en: {
        settings: "⚙️ Settings",
        startingFunds: "💰 Starting Funds",
        startingFundsHint: "The amount of money you have pre-bet.",
        betAmount: "🎯 Bet amount",
        betAmountHint: "Amount bet each step. Stays the same for all steps.",
        winProbability: "🎲 Win Probability (%)",
        steps: "📊 Number of Steps",
        limitCheckbox: "🔒 Limit win probability to 50% max",
        limitHint: "Uncheck to allow up to 99% (house always loses)",
        simulations: "🔄 Simultaneous Simulations",
        simulationsHint: "Number of parallel random walks",
        startBtn: "🎮 Start Random Walk Simulation",
        resetBtn: "🔄 Reset All",
        results: "📈 Results",
        placeholder1: "Configure settings and click 'Start' to run simulation",
        placeholder2: "Results will appear here with detailed statistics and graph",
        // Results texts
        initialBank: "Initial Bank",
        betSize: "Bet Size",
        winProb: "Win Probability",
        simulationsCount: "Simulations",
        bankruptcyRate: "Bankruptcy Rate",
        avgProfit: "Average Profit",
        individualSims: "Individual Simulations:",
        simResults: "Simulation Results",
        primarySim: "Primary Simulation",
        finalBankroll: "Final Bankroll",
        stepsTaken: "Steps Taken",
        maximumBankroll: "Maximum Bankroll",
        minimumBankroll: "Minimum Bankroll",
        profitLoss: "Profit/Loss",
        status: "Status",
        bankrupt: "🚨 BANKRUPT",
        stillInGame: "🏦 STILL IN GAME",
        profit: "✅ PROFIT",
        loss: "⚠️ LOSS",
        runningSim: "Running simulation..."
    },
    ru: {
        settings: "⚙️ Настройки",
        startingFunds: "💰 Начальные средства",
        startingFundsHint: "Сумма денег до ставок, вначале игры.",
        betAmount: "🎯 Сумма ставки",
        betAmountHint: "Сумма за одну ставку. Не меняется на протяжении всей прогулки.",
        winProbability: "🎲 Шанс выигрыша (%)",
        steps: "📊 Кол-во шагов",
        limitCheckbox: "🔒 Ограничить шанс своей победы до 50% максимум.",
        limitHint: "Убрав галочку, вы получите возможность повысить шанс выигрыша до 99%. (казино всегда будет проигрывать)",
        simulations: "🔄 Одновременные симуляции",
        simulationsHint: "Кол-во параллельных симуляций",
        startBtn: "🎮 Начать случайную прогулку",
        resetBtn: "🔄 Сбросить все настройки",
        results: "📈 Результаты",
        placeholder1: "Подберите нужные вам настройки и нажмите 'Начать случайную прогулку' чтоб запустить симуляцию.",
        placeholder2: "Результаты симуляции (или симуляций) появятся в этом окне.",
        // Results texts
        initialBank: "Начальный банк",
        betSize: "Размер ставки",
        winProb: "Шанс выигрыша",
        simulationsCount: "Симуляций",
        bankruptcyRate: "Процент банкротств",
        avgProfit: "Средняя прибыль",
        individualSims: "Отдельные симуляции:",
        simResults: "Результаты симуляции",
        primarySim: "Основная симуляция",
        finalBankroll: "Финальный баланс",
        stepsTaken: "Сделано шагов",
        maximumBankroll: "Максимальный баланс",
        minimumBankroll: "Минимальный баланс",
        profitLoss: "Прибыль/Убыток",
        status: "Статус",
        bankrupt: "🚨 БАНКРОТ",
        stillInGame: "🏦 ВСЁ ЕЩЁ В ИГРЕ",
        profit: "✅ ПРИБЫЛЬ",
        loss: "⚠️ УБЫТОК",
        runningSim: "Запускаем симуляцию..."
    }
};


let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Update UI texts - ТЕПЕРЬ С ID!
    document.querySelector('.settings-panel h2').textContent = t.settings;
    
    // Labels
    document.querySelector('label[for="initial-bank"]').textContent = t.startingFunds;
    document.querySelector('label[for="bet-size"]').textContent = t.betAmount;
    document.querySelector('label[for="win-probability"]').textContent = t.winProbability;
    document.querySelector('label[for="steps"]').textContent = t.steps;
    document.querySelector('label[for="simulations"]').textContent = t.simulations;
    
    // Hints по ID
    document.getElementById('initial-bank-hint').textContent = t.startingFundsHint;
    document.getElementById('bet-size-hint').textContent = t.betAmountHint;
    document.getElementById('limit-hint').textContent = t.limitHint;
    document.getElementById('simulations-hint').textContent = t.simulationsHint;
    
    // Checkbox label
    document.getElementById('limit-label').textContent = t.limitCheckbox;
    
    // Buttons
    document.getElementById('start-btn').textContent = t.startBtn;
    document.getElementById('reset-btn').textContent = t.resetBtn;
    
    // Results panel
    document.querySelector('.results-panel h2').textContent = t.results;
    document.getElementById('placeholder-text-1').textContent = t.placeholder1;
    document.getElementById('placeholder-text-2').textContent = t.placeholder2;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-btn[onclick="setLanguage('${lang}')"]`).classList.add('active');
    
    // Save preference
    localStorage.setItem('casino-sim-lang', lang);
    
    // Update page title
    document.title = lang === 'ru' ? 'Симулятор случайных прогулок в стиле казино' : 'Random Walk Casino Simulator';
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('casino-sim-lang');
    const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    const lang = savedLang || browserLang;
    
    setLanguage(lang);
}


document.addEventListener('DOMContentLoaded', () => {
    // ... существующий код инициализации ...
    
    // Initialize language
    loadLanguagePreference();
});

document.addEventListener('DOMContentLoaded', () => {
    // Sync inputs with sliders
    winProbSlider.addEventListener('input', updateWinProbability);
    stepsSlider.addEventListener('input', updateSteps);
    winProbInput.addEventListener('input', updateWinProbabilityFromInput);
    stepsInput.addEventListener('input', updateStepsFromInput);
    
    // Initialize values
    updateWinProbability();
    updateSteps();
    
    // Limit checkbox handler
    limitCheckbox.addEventListener('change', updateProbabilityLimit);
    
    // Button handlers
    startBtn.addEventListener('click', runSimulation);
    resetBtn.addEventListener('click', resetSimulation);
});

function updateWinProbability() {
    let value = parseInt(winProbSlider.value);
    
    // Apply 50% limit if checkbox is checked
    if (limitCheckbox.checked && value > 50) {
        value = 50;
        winProbSlider.value = 50;
    }
    
    winProbInput.value = value;
    probValue.textContent = `${value}%`;
}

function updateWinProbabilityFromInput() {
    let value = parseInt(winProbInput.value) || 1;
    
    if (value < 1) value = 1;
    if (value > 99) value = 99;
    
    // Apply 50% limit if checkbox is checked
    if (limitCheckbox.checked && value > 50) {
        value = 50;
        winProbInput.value = 50;
    }
    
    winProbSlider.value = value;
    probValue.textContent = `${value}%`;
}

function updateSteps() {
    stepsInput.value = stepsSlider.value;
    stepsValue.textContent = stepsSlider.value;
}

function updateStepsFromInput() {
    let value = parseInt(stepsInput.value) || 10;
    
    if (value < 10) value = 10;
    if (value > 1000) value = 1000;
    
    stepsSlider.value = value;
    stepsValue.textContent = value;
}

function updateProbabilityLimit() {
    const isLimited = limitCheckbox.checked;
    const currentValue = parseInt(winProbInput.value);
    
    if (isLimited && currentValue > 50) {
        winProbInput.value = 50;
        winProbSlider.value = 50;
        probValue.textContent = '50%';
    }
    
    // Update max attribute
    winProbInput.max = isLimited ? 50 : 99;
    winProbSlider.max = isLimited ? 50 : 99;
}

function runSimulation() {
    // Get all inputs
    const initialBank = parseInt(document.getElementById('initial-bank').value) || 1000;
    const betSize = parseInt(document.getElementById('bet-size').value) || 100;
    const winProbability = (parseInt(winProbInput.value) || 45) / 100;
    const steps = parseInt(stepsInput.value) || 100;
    const simulations = parseInt(document.getElementById('simulations').value) || 1;
    
    // Validate inputs
    if (betSize > initialBank) {
        alert('Warning: Bet size exceeds initial bank! This leads to immediate bankruptcy on first loss.');
    }
    
    // Clear previous results
    const t = translations[currentLang];
    resultsContainer.innerHTML = `<div class="simulating">${t.runningSim}</div>`;
    
    // Run simulation(s) after a small delay to show loading state
    setTimeout(() => {
        const allResults = [];
        
        for (let sim = 0; sim < simulations; sim++) {
            const result = simulateRandomWalk(initialBank, betSize, winProbability, steps);
            allResults.push(result);
        }
        
        displayResults(allResults, initialBank, betSize, winProbability, steps);
    }, 100);
}

function simulateRandomWalk(initialBank, betSize, winProbability, maxSteps) {
    let bankroll = initialBank;
    const history = [bankroll];
    
    for (let step = 0; step < maxSteps; step++) {
        const win = Math.random() < winProbability;
        
        if (win) {
            bankroll += betSize;
        } else {
            bankroll -= betSize;
        }
        
        // If bankrupt, stop
        if (bankroll <= 0) {
            bankroll = 0;
            history.push(bankroll);
            break;
        }
        
        history.push(bankroll);
    }
    
    return {
        history,
        finalBankroll: bankroll,
        stepsTaken: history.length - 1,
        bankrupt: bankroll === 0,
        maxBankroll: Math.max(...history),
        minBankroll: Math.min(...history),
        profit: bankroll - initialBank
    };
}

function displayResults(allResults, initialBank, betSize, winProbability, maxSteps) {
    // Clear container
    resultsContainer.innerHTML = '';
    
    const t = translations[currentLang];
    const bankruptCount = allResults.filter(r => r.bankrupt).length;
    const avgProfit = allResults.reduce((sum, r) => sum + r.profit, 0) / allResults.length;
    const statsHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h4>${t.initialBank}</h4>
                <p>$${initialBank}</p>
            </div>
            <div class="stat-card">
                <h4>${t.betSize}</h4>
                <p>$${betSize}</p>
            </div>
            <div class="stat-card">
                <h4>${t.winProb}</h4>
                <p>${(winProbability * 100).toFixed(1)}%</p>
            </div>
            <div class="stat-card">
                <h4>${t.simulationsCount}</h4>
                <p>${allResults.length}</p>
            </div>
            <div class="stat-card">
                <h4>${t.bankruptcyRate}</h4>
                <p class="${bankruptCount > 0 ? 'bankrupt' : 'profit'}">
                    ${((bankruptCount / allResults.length) * 100).toFixed(1)}%
                </p>
            </div>
            <div class="stat-card">
                <h4>${t.avgProfit}</h4>
                <p class="${avgProfit >= 0 ? 'profit' : 'bankrupt'}">
                    $${avgProfit.toFixed(2)}
                </p>
            </div>
        </div>
    `;
    
    // Individual results
    let individualHTML = '';
    if (allResults.length > 1) {
        individualHTML += `<h3>${t.individualSims}</h3>`;
        allResults.forEach((result, index) => {
            individualHTML += `
                <div class="simulation-result">
                    <strong>${t.simulationsCount} ${index + 1}:</strong> 
                    ${t.finalBankroll}: $${result.finalBankroll} | 
                    ${t.stepsTaken}: ${result.stepsTaken} | 
                    ${t.maximumBankroll}: $${result.maxBankroll} |
                    ${result.bankrupt ? t.bankrupt : (result.profit > 0 ? t.profit : t.loss)}
                </div>
            `;
        });
    }
    
    // Main results
    const mainResult = allResults[0];
    const mainStats = `
        <h3>${allResults.length === 1 ? t.simResults : t.primarySim}</h3>
        <div class="detailed-stats">
            <p><strong>${t.finalBankroll}:</strong> <span class="${mainResult.profit >= 0 ? 'profit' : 'bankrupt'}">$${mainResult.finalBankroll}</span></p>
            <p><strong>${t.stepsTaken}:</strong> ${mainResult.stepsTaken} of ${maxSteps}</p>
            <p><strong>${t.maximumBankroll}:</strong> $${mainResult.maxBankroll}</p>
            <p><strong>${t.minimumBankroll}:</strong> $${mainResult.minBankroll}</p>
            <p><strong>${t.profitLoss}:</strong> <span class="${mainResult.profit >= 0 ? 'profit' : 'bankrupt'}">$${mainResult.profit.toFixed(2)}</span></p>
            <p><strong>${t.status}:</strong> ${mainResult.bankrupt ? t.bankrupt : t.stillInGame}</p>
        </div>
    `;
    
    resultsContainer.innerHTML = statsHTML + mainStats + individualHTML;
    
    // Create canvas for graph
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = '400px';
    
    resultsContainer.appendChild(canvas);
    drawChart(canvas, allResults, maxSteps);
}

function drawChart(canvas, allResults, maxSteps) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
        const y = (i / 10) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Find global max for scaling
    const allHistories = allResults.map(r => r.history);
    const allValues = allHistories.flat();
    const globalMax = Math.max(...allValues);
    const globalMin = Math.min(...allValues);
    
    // Draw each simulation line
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
    
    allResults.forEach((result, index) => {
        const history = result.history;
        const color = colors[index % colors.length];
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        
        // Calculate points
        for (let i = 0; i < history.length; i++) {
            const x = (i / Math.max(history.length - 1, 1)) * width;
            const normalizedY = (history[i] - globalMin) / (globalMax - globalMin || 1);
            const y = height - normalizedY * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw markers for start and end
        if (history.length > 0) {
            // Start point
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(0, height - ((history[0] - globalMin) / (globalMax - globalMin || 1)) * height, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // End point
            const lastX = ((history.length - 1) / Math.max(history.length - 1, 1)) * width;
            const lastY = height - ((history[history.length - 1] - globalMin) / (globalMax - globalMin || 1)) * height;
            ctx.beginPath();
            ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Bankruptcy marker
            if (result.bankrupt) {
                ctx.fillStyle = '#e74c3c';
                ctx.font = '12px Arial';
                ctx.fillText('BANKRUPT', lastX + 10, lastY);
            }
        }
    });
    
    // Add labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Steps', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Bankroll ($)', 0, 0);
    ctx.restore();
    
    // Add scale indicators
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`$${globalMax}`, 5, 20);
    ctx.textAlign = 'right';
    ctx.fillText(`$${globalMin}`, width - 5, height - 10);
}

function resetSimulation() {
    // Reset all inputs to defaults
    document.getElementById('initial-bank').value = 1000;
    document.getElementById('bet-size').value = 100;
    winProbInput.value = 45;
    winProbSlider.value = 45;
    probValue.textContent = '45%';
    stepsInput.value = 100;
    stepsSlider.value = 100;
    stepsValue.textContent = '100';
    document.getElementById('simulations').value = 1;
    limitCheckbox.checked = true;
    updateProbabilityLimit();
    
    // Clear results
const t = translations[currentLang];
    resultsContainer.innerHTML = `
        <div class="placeholder">
            <p>${t.placeholder1}</p>
            <p>${t.placeholder2}</p>
        </div>
    `;
}


