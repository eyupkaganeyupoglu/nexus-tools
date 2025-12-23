const BASE_GOLD = {
    1: 150, 2: 150,
    3: 200,
    4: 250, 5: 250,
    6: 300,
    7: 350,
    8: 400,
    9: 450, 10: 450, 11: 450, 12: 450, 13: 450,
    14: 500, 15: 500,
    16: 600,
    17: 700,
    18: 3500,
    19: 4000, 20: 4000
};

document.addEventListener('DOMContentLoaded', () => {
    // Add initial rows
    addPlayerRow('endgame');
    addPlayerRow('planner');

    // Input Clamping
    const hoursInp = document.getElementById('gameHours');
    const minsInp = document.getElementById('gameMinutes');

    if (hoursInp) {
        hoursInp.addEventListener('input', () => {
            if (hoursInp.value < 0) hoursInp.value = 0;
        });
    }

    if (minsInp) {
        minsInp.addEventListener('input', () => {
            if (minsInp.value < 0) minsInp.value = 0;
            if (minsInp.value > 59) minsInp.value = 59;
        });
    }
});

// --- Dynamic Row Management ---
function addPlayerRow(type) {
    const container = document.getElementById(`${type}-players`);
    const tpl = document.getElementById(`tpl-${type}-row`);
    const clone = tpl.content.cloneNode(true);
    container.appendChild(clone);
}

// --- End Game Calculator Logic ---
function calculateEndGame() {
    // Validate inputs manually
    const inputs = document.querySelectorAll('#endgame input, #endgame-players input');
    for (const input of inputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }
    }

    const hoursIn = parseFloat(document.getElementById('gameHours').value) || 0;
    const minutesIn = parseFloat(document.getElementById('gameMinutes').value) || 0;
    const totalLoot = parseFloat(document.getElementById('totalLoot').value) || 0;
    const vipDMValue = document.getElementById('vipDM').checked ? 1 : 0;

    // 1. Duration Rounding
    let calculatedHours = hoursIn;
    if (minutesIn >= 30) calculatedHours += 1;

    // Check Min Hours Rule
    const isDurationValid = calculatedHours >= 3;

    // UI Elements
    const minHoursWarning = document.getElementById('minHoursWarning');
    const lootCapWarning = document.getElementById('lootCapWarning');
    const capValEl = document.getElementById('warnCapAmount');
    const resultContainer = document.getElementById('endgame-result');

    if (!isDurationValid) {
        minHoursWarning.classList.remove('d-none');
        lootCapWarning.classList.add('d-none');
        resultContainer.classList.add('d-none');
        return;
    } else {
        minHoursWarning.classList.add('d-none');
    }

    // 2. Max MS
    // New Rule: 3h -> 1 MS. Then every 2h adds 1 MS. (3h=1, 5h=2, 7h=3...)
    const maxMS = calculatedHours < 3 ? 0 : Math.floor((calculatedHours - 3) / 2) + 1;

    // Get Players
    const playerRows = document.querySelectorAll('#endgame-players .player-row');
    const players = [];
    let totalDMPoints = 0;

    playerRows.forEach(row => {
        const lvl = parseInt(row.querySelector('.inp-level').value) || 0;
        const pts = parseInt(row.querySelector('.inp-points').value) || 0;
        const vip = row.querySelector('.inp-vip').checked ? 1 : 0;
        if (lvl > 0) {
            players.push({ lvl, pts, vip });
            totalDMPoints += pts;
        }
    });

    if (players.length === 0) {
        alert('Lütfen en az bir oyuncu ekleyin.');
        return;
    }

    // 3. DM Avg
    const dmAvg = Math.round(totalDMPoints / players.length);

    // 4. Player Rewards Distribution
    let groupCap = 0;

    // Step A: Calculate Personal Caps
    players.forEach(p => {
        const base = BASE_GOLD[p.lvl] || 0;
        p.cap = base * maxMS;
        groupCap += p.cap;
    });

    // Step C: Performance Ratio
    let perfRatio = 0;
    if (groupCap > 0) {
        perfRatio = totalLoot / groupCap;
    } else if (totalLoot > 0) {
        perfRatio = Infinity;
    }

    // Check Loot Cap Rule
    const isCapValid = perfRatio <= 1.0;

    if (!isCapValid) {
        lootCapWarning.classList.remove('d-none');
        capValEl.textContent = `${Math.ceil(groupCap)} GP`;
        resultContainer.classList.add('d-none');
        return;
    } else {
        lootCapWarning.classList.add('d-none');
    }

    // If valid, show results
    resultContainer.classList.remove('d-none');

    // Step D: Calculate Final Rewards
    let resultHTML = '';
    players.forEach(p => {
        const gold = Math.round(p.cap * perfRatio);
        const ms = maxMS;
        const genVal = maxMS + p.vip; // Add VIP Avatar Bonus (Max 1)

        resultHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-secondary">
                <span>
                    <span class="badge bg-secondary me-2">Lvl ${p.lvl}</span>
                    <small style="color: var(--text-muted)">Puan: ${p.pts}</small>
                </span>
                <span class="text-end">
                    <span class="text-warning fw-bold">${gold} GP</span> <span class="text-muted">|</span> 
                    <span class="text-info fw-bold">${ms} MS</span> <span class="text-muted">|</span> 
                    <span class="text-success fw-bold">${genVal} GT</span>
                </span>
            </li>
        `;
    });

    // 5. DM Rewards
    // New Rule: 3h -> Factor 2. Then every 2h adds 1 Factor. (3h=2, 5h=3, 7h=4...)
    let factor = calculatedHours < 3 ? 0 : Math.floor((calculatedHours - 3) / 2) + 2;

    const xGold = groupCap / players.length;

    const dmGold = Math.ceil(xGold * 2);
    const dmMS = maxMS * 2;
    const vipDMBonus = vipDMValue * 2; // VIP DM Bonus (Max 2)
    let dmGenesis = Math.ceil(dmAvg + factor) + vipDMBonus;

    // Display Results
    document.getElementById('resDuration').textContent = `${calculatedHours} Saat`;
    document.getElementById('resMaxMS').textContent = maxMS;
    document.getElementById('resDMAvg').textContent = dmAvg;
    document.getElementById('resPerf').textContent = `%${(perfRatio * 100).toFixed(2)}`;
    
    document.getElementById('resPlayerList').innerHTML = resultHTML;

    document.getElementById('resDMGold').textContent = `${dmGold} GP`;
    document.getElementById('resDMMS').textContent = `${dmMS} MS`;
    document.getElementById('resDMGenesis').textContent = `${dmGenesis} GT`;
}

// --- Loot Planner Logic ---
function calculatePlanner() {
    // Validate inputs manually
    const inputs = document.querySelectorAll('#planner input, #planner-players input');
    for (const input of inputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }
    }

    const hours = parseFloat(document.getElementById('planHours').value) || 0;

    // 1. Planned MS
    // New Rule: 3h -> 1 MS. Then every 2h adds 1 MS. (3h=1, 5h=2, 7h=3...)
    const plannedMS = hours < 3 ? 0 : Math.floor((hours - 3) / 2) + 1;

    // Get Players
    const playerRows = document.querySelectorAll('#planner-players .player-row');
    let requiredLoot = 0;
    let playerCount = 0;

    playerRows.forEach(row => {
        const lvl = parseInt(row.querySelector('.inp-level').value) || 0;
        if (lvl > 0) {
            const base = BASE_GOLD[lvl] || 0;
            requiredLoot += (base * plannedMS);
            playerCount++;
        }
    });

    if (playerCount === 0 || hours <= 0) {
        alert('Lütfen geçerli bir süre ve en az bir oyuncu girin.');
        return;
    }

    document.getElementById('resPlannedLoot').textContent = `${requiredLoot} GP`;
    document.getElementById('planner-result').classList.remove('d-none');
}
