const LEVEL_DATA = {
    1: { next: 2, reqMs: 1, reqEpic: 0, valMs: 150, valEpic: 0 },
    2: { next: 3, reqMs: 2, reqEpic: 0, valMs: 150, valEpic: 0 },
    3: { next: 4, reqMs: 2, reqEpic: 0, valMs: 200, valEpic: 0 },
    4: { next: 5, reqMs: 2, reqEpic: 0, valMs: 250, valEpic: 0 },
    5: { next: 6, reqMs: 3, reqEpic: 0, valMs: 250, valEpic: 0 },
    6: { next: 7, reqMs: 3, reqEpic: 0, valMs: 300, valEpic: 0 },
    7: { next: 8, reqMs: 3, reqEpic: 0, valMs: 350, valEpic: 0 },
    8: { next: 9, reqMs: 3, reqEpic: 0, valMs: 400, valEpic: 0 },
    9: { next: 10, reqMs: 3, reqEpic: 0, valMs: 450, valEpic: 0 },
    10: { next: 11, reqMs: 4, reqEpic: 0, valMs: 450, valEpic: 0 },
    11: { next: 12, reqMs: 4, reqEpic: 0, valMs: 450, valEpic: 0 },
    12: { next: 13, reqMs: 4, reqEpic: 0, valMs: 450, valEpic: 0 },
    13: { next: 14, reqMs: 4, reqEpic: 0, valMs: 450, valEpic: 0 },
    14: { next: 15, reqMs: 4, reqEpic: 0, valMs: 500, valEpic: 0 },
    15: { next: 16, reqMs: 4, reqEpic: 1, valMs: 500, valEpic: 2250 },
    16: { next: 17, reqMs: 4, reqEpic: 1, valMs: 600, valEpic: 2750 },
    17: { next: 18, reqMs: 4, reqEpic: 1, valMs: 700, valEpic: 3000 },
    18: { next: 19, reqMs: 0, reqEpic: 1, valMs: 0, valEpic: 3500 },
    19: { next: 20, reqMs: 0, reqEpic: 2, valMs: 0, valEpic: 4000 }
};

document.addEventListener('DOMContentLoaded', () => {
    // Add initial rows
    addPlayerRow('endgame');

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

    // Milestone Converter Listeners
    const lvlSelect = document.getElementById('msCurrentLevel');
    if (lvlSelect) {
        lvlSelect.addEventListener('change', updateEpicInputState);
    }
    updateEpicInputState(); // Init
});

function updateEpicInputState() {
    const lvl = parseInt(document.getElementById('msCurrentLevel').value) || 1;
    
    // Epic MS Handling (< 15)
    const epicInp = document.getElementById('msCurrentEpic');
    const addedEpicInp = document.getElementById('msAddedEpic');

    if (lvl >= 15) {
        epicInp.disabled = false;
        addedEpicInp.disabled = false;
    } else {
        epicInp.disabled = true;
        epicInp.value = 0;
        addedEpicInp.disabled = true;
        addedEpicInp.value = 0;
    }

    // Normal MS Handling (18+)
    const addedMsInp = document.getElementById('msAddedCount');
    if (lvl >= 18) {
        addedMsInp.disabled = true;
        addedMsInp.value = 0;
    } else {
        addedMsInp.disabled = false;
    }
}

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
    const vipDMValue = document.getElementById('vipDM').checked ? 1 : 0;

    // 1. Duration Rounding
    let calculatedHours = hoursIn;
    if (minutesIn >= 30) calculatedHours += 1;

    // Check Min Hours Rule
    const isDurationValid = calculatedHours >= 3;

    // UI Elements
    const minHoursWarning = document.getElementById('minHoursWarning');
    const resultContainer = document.getElementById('endgame-result');

    if (!isDurationValid) {
        minHoursWarning.classList.remove('d-none');
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

    // If valid, show results
    resultContainer.classList.remove('d-none');

    // Step D: Calculate Final Rewards
    let resultHTML = '';
    players.forEach(p => {
        const ms = maxMS;
        const genVal = maxMS + p.vip; // Add VIP Avatar Bonus (Max 1)

        resultHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-secondary">
                <span>
                    <span class="badge bg-secondary me-2">Lvl ${p.lvl}</span>
                    <small style="color: var(--text-muted)">Puan: ${p.pts}</small>
                </span>
                <span class="text-end">
                    <span class="text-info fw-bold">${ms} MS</span> <span class="text-muted">|</span> 
                    <span class="text-success fw-bold">${genVal} GT</span>
                </span>
            </li>
        `;
    });

    // 5. DM Rewards
    // New Rule: 3h -> Factor 2. Then every 2h adds 1 Factor. (3h=2, 5h=3, 7h=4...)
    let factor = calculatedHours < 3 ? 0 : Math.floor((calculatedHours - 3) / 2) + 2;
    // document.getElementById('resDuration').textContent = ... (Removed from UI)
    document.getElementById('resDMAvg').textContent = dmAvg;
    
    document.getElementById('resPlayerList').innerHTML = resultHTML;

    // DM Rewards Display
    const dmMS = maxMS * 2;
    const vipDMBonus = vipDMValue * 2; // VIP DM Bonus
    let dmGenesis = Math.ceil(dmAvg + factor) + vipDMBonus;

    document.getElementById('resDMMS').textContent = `${dmMS} MS`;
    document.getElementById('resDMGenesis').textContent = `${dmGenesis} GT`;
}

// --- 3. Starting Budget Calculator ---
const BUDGET_REWARDS = { 1: 0, 2: 100, 3: 200, 4: 300, 5: 400, 6: 500, 7: 600, 8: 700, 9: 800, 10: 900, 11: 1000, 12: 1150, 13: 1250, 14: 1350, 15: 1500, 16: 1600, 17: 1800, 18: 2000, 19: 2200, 20: 2400 };

function initBudgetCalculator() {
    const lvlSelect = document.getElementById('budgetLevel');
    const display = document.getElementById('budgetTotal');
    const warning = document.getElementById('budgetWarning');

    // Populate Select
    for (let i = 1; i <= 20; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Level ${i}`;
        lvlSelect.appendChild(opt);
    }

    const calculate = () => {
        const lvl = parseInt(lvlSelect.value);
        let total = 0;
        
        // Cumulative Sum
        for (let i = 2; i <= lvl; i++) {
            total += BUDGET_REWARDS[i] || 0;
        }

        display.textContent = '+' + total.toLocaleString('tr-TR') + ' GP';

        if (lvl >= 6) {
            warning.classList.remove('d-none');
        } else {
            warning.classList.add('d-none');
        }
    };

    lvlSelect.addEventListener('change', calculate);
    calculate(); // Initial
}

initBudgetCalculator();

// --- Milestone Converter Logic ---
function calculateMilestoneGold() {
    const startLvl = parseInt(document.getElementById('msCurrentLevel').value) || 1;
    let currentMs = Math.max(0, parseInt(document.getElementById('msCurrentCount').value) || 0);
    let currentEpic = Math.max(0, parseInt(document.getElementById('msCurrentEpic').value) || 0);

    let addedMs = Math.max(0, parseInt(document.getElementById('msAddedCount').value) || 0);
    let addedEpic = Math.max(0, parseInt(document.getElementById('msAddedEpic').value) || 0);

    const warningEl = document.getElementById('msEpicWarning');
    const resultEl = document.getElementById('msResult');

    // Validation
    if ((addedEpic > 0 || currentEpic > 0) && startLvl < 15) {
        warningEl.classList.remove('d-none');
        resultEl.classList.add('d-none');
        return;
    }
    warningEl.classList.add('d-none');

    // Logic
    let lvl = startLvl;
    let totalGold = 0;
    const breakdown = [];

    // Combine Stash
    let stashMs = currentMs + addedMs;
    let stashEpic = currentEpic + addedEpic;

    // Process Loop
    let keepChecking = true;
    while (keepChecking && lvl < 20) { // Max calculation level 20
        const data = LEVEL_DATA[lvl];

        if (!data) {
            keepChecking = false;
            break;
        }

        let levelledUp = false;

        // 1. Level Up Check - Priority: Standard MS first, then Epic MS
        // This effectively handles "OR" logic for levels 15-17 (consume MS OR Epic)
        // And handles exclusive logic for levels < 15 (only MS) and > 17 (only Epic)
        
        if (data.reqMs > 0 && stashMs >= data.reqMs) {
            // Level up using Standard Milestone
            stashMs -= data.reqMs;
            totalGold += (data.reqMs * data.valMs);
            breakdown.push(`Level ${lvl} -> ${data.next} : ${data.reqMs} Milestone harcandı.`);
            
            lvl = data.next;
            levelledUp = true;
        } 
        else if (data.reqEpic > 0 && stashEpic >= data.reqEpic) {
            // Level up using Epic Milestone
            stashEpic -= data.reqEpic;
            totalGold += (data.reqEpic * data.valEpic);
            breakdown.push(`Level ${lvl} -> ${data.next} : ${data.reqEpic} Epic Milestone harcandı.`);
            
            lvl = data.next;
            levelledUp = true;
        }

        if (!levelledUp) {
            keepChecking = false;
        }
    }

    // Remaining (Surplus) Gold Conversion?
    // "Kaç milestone ... girdiğimizde ... kaç gp aldığımızı"
    // Usually surplus milestones sit in inventory. Do they convert to gold instantly?
    // Based on "Milestone başı X gp", YES.
    // Every Milestone obtained at a specific level acts as Gold source.
    // So even if we don't level up, the remaining milestones in stash correspond to the current level's gold value.
    
    // BUT exception: Epic Milestones at level 18->19 is 1 Epic.
    // If I am level 15 and I have 5 Epic Milestones (hypothetically impossible but input allows):
    // I use 1 for 15->16. I use 1 for 16->17. I use 1 for 17->18. I use 1 for 18->19.
    // The value changes per level.
    
    // So the surplus should be converted based on the CURRENT level rate?
    // Usually yes.
    
    // Validating current level for surplus calculation
    if (lvl < 20) {
        const currentData = LEVEL_DATA[lvl];
        if (currentData) {
            // Convert Remaining Normal MS
            if (currentData.valMs > 0 && stashMs > 0) {
                totalGold += (stashMs * currentData.valMs);
                // Note: We don't remove them from stash, they remain as "Current MS" for next session.
                // But for "Total GP Earned" display, we include them.
            }
            // Convert Remaining Epic MS
            if (currentData.valEpic > 0 && stashEpic > 0) {
                totalGold += (stashEpic * currentData.valEpic);
            }
        }
    } else {
         // Level 20 Cap? No data for 20 in map.
         // Assuming no gold generation at max level or special rule?
         // For now ignore surplus at Lvl 20.
    }

    // NOTE: The request says "Kaç gp aldığımızı".
    // Since we provided "Current MS" (already owned, presumably already cashed out?)
    // Maybe we should subtract the value of 'Current MS' from calculation if we only want 'Added' GP?
    // But purely "Converter" implies converting the input pile.
    // Let's assume we display TOTAL gold value of the transition.
    // Or better: Calculate gold strictly from the "Added" portion?
    // Complexity: Added MS might trigger a level up which changes value of subsequent MS.
    // Best approach: Calculate Total Gold of (Current + Added) path, then subtract Total Gold of (Current) path?
    // Easier: Just display the total gold generated by the consumed + surplus of the final state.
    // User can ignore the "already owned" portion if they want, or we clarify "Total Value".
    // Let's stick to "Total Accumulated Gold from this pool".

    // UPDATE: "Girdiğimiz ms ... ve halihazırda sahip olduğumuz ... göre"
    // It implies a simulation.
    // Let's show the Total Gold accumulated during this simulation/process.
    // If I start with 1 MS (already cashed), and add 1 MS. Level up (req 2).
    // The loop calculates value for 2 MS.
    
    // Display
    document.getElementById('msTotalGold').textContent = `${totalGold} GP`;
    document.getElementById('msRemNormal').textContent = stashMs;
    document.getElementById('msRemEpic').textContent = stashEpic;

    const list = document.getElementById('msBreakdown');
    list.innerHTML = '';
    
    if (breakdown.length === 0) {
        list.innerHTML = '<li>Seviye değişimi olmadı.</li>';
    } else {
        breakdown.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }

    resultEl.classList.remove('d-none');
}
