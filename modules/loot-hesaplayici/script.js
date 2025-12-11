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

    // 1. Duration Rounding
    let calculatedHours = hoursIn;
    if (minutesIn >= 30) calculatedHours += 1;

    // 2. Max MS
    const maxMS = Math.floor(calculatedHours / 3);

    // Get Players
    const playerRows = document.querySelectorAll('#endgame-players .player-row');
    const players = [];
    let totalDMPoints = 0;

    playerRows.forEach(row => {
        const lvl = parseInt(row.querySelector('.inp-level').value) || 0;
        const pts = parseInt(row.querySelector('.inp-points').value) || 0;
        if (lvl > 0) {
            players.push({ lvl, pts });
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
    }

    // Step D: Calculate Final Rewards
    let resultHTML = '';
    players.forEach(p => {
        const gold = Math.round(p.cap * perfRatio);
        const ms = maxMS;
        const genesis = Math.floor(maxMS / 2); // Assuming standard floor logic for genesis from description implicit 
        // "Max_MS / 2" usually implies integer division in these contexts unless specified. 
        // Let's stick to floor to be safe or float? 
        // Note says: "Kazanılan_Genesis: Max_MS / 2". 
        // Given tokens are usually whole, let's use floor or maybe exact?
        // Wait, DM Genesis says "Yukarı yuvarla" for DM. 
        // Let's use float fixed(1) or if int is expected... 
        // Looking at example: DM Genesis 9. 
        // Safe bet: .5 implies 0.5 token, usually tracked as float? 
        // Let's output float if needed, but usually floor/ceil for tokens.
        // Checking notes again on Player Genesis: "Max_MS / 2". No rounding specified.
        // Let's output as decimal if needed.
        const genVal = (maxMS / 2);

        resultHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-secondary">
                <span>
                    <span class="badge bg-secondary me-2">Lvl ${p.lvl}</span>
                    <small class="text-white">(Puan: ${p.pts})</small>
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
    const factor = Math.ceil(calculatedHours / 3);
    const xGold = totalLoot / players.length;
    const xMS = maxMS;

    const dmGold = Math.ceil(xGold * factor);
    const dmMS = xMS * factor;
    // DM Genesis: "DM_Puan_Ortalaması + Faktör (Yukarı yuvarla)"
    // Actually formula is just DM_Puan_Avg + Factor. Rounding probably redundant if integers, but specified.
    let dmGenesis = Math.ceil(dmAvg + factor);

    // Constraint: Y < 3 -> DM Genesis = 0
    if (calculatedHours < 3) {
        dmGenesis = 0;
    }

    // Display Results
    document.getElementById('resDuration').textContent = `${calculatedHours} Saat`;
    document.getElementById('resMaxMS').textContent = maxMS;
    document.getElementById('resDMAvg').textContent = dmAvg;
    document.getElementById('resPerf').textContent = `%${(perfRatio * 100).toFixed(2)}`;

    document.getElementById('resPlayerList').innerHTML = resultHTML;

    document.getElementById('resDMGold').textContent = `${dmGold} GP`;
    document.getElementById('resDMMS').textContent = `${dmMS} MS`;
    document.getElementById('resDMGenesis').textContent = `${dmGenesis} GT` + (calculatedHours < 3 ? " (Min 3 Saat)" : "");

    document.getElementById('endgame-result').classList.remove('d-none');
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
    const plannedMS = Math.floor(hours / 3);

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
