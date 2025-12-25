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

    // Current MS Handling (Level 1)
    const curMsInp = document.getElementById('msCurrentCount');
    if (lvl === 1) {
        curMsInp.disabled = true;
        curMsInp.value = 0;
    } else {
        curMsInp.disabled = false;
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

        display.textContent = '+' + total + ' GP';

        if (lvl >= 6) {
            warning.classList.remove('d-none');
        } else {
            warning.classList.add('d-none');
        }
    };

    lvlSelect.addEventListener('change', calculate);
    calculate(); // Initial
}

// --- 4. Level Up Calculator ---
const LEVEL_UP_COSTS = {
    1: { type: 'std', val: 1 }, 2: { type: 'std', val: 2 }, 3: { type: 'std', val: 2 }, 4: { type: 'std', val: 2 },
    5: { type: 'std', val: 3 }, 6: { type: 'std', val: 3 }, 7: { type: 'std', val: 3 }, 8: { type: 'std', val: 3 }, 9: { type: 'std', val: 3 },
    10: { type: 'std', val: 4 }, 11: { type: 'std', val: 4 }, 12: { type: 'std', val: 4 }, 13: { type: 'std', val: 4 }, 14: { type: 'std', val: 4 },
    15: { type: 'flex', val: 4 }, 16: { type: 'flex', val: 4 }, 17: { type: 'flex', val: 4 },
    18: { type: 'epic', val: 1 }, 19: { type: 'epic', val: 2 }
};

function initLevelUpCalculator() {
    const curSlider = document.getElementById('lvlCurrent');
    const tarSlider = document.getElementById('lvlTarget');
    const curDisplay = document.getElementById('lvlCurrentDisplay');
    const tarDisplay = document.getElementById('lvlTargetDisplay');
    const resultEl = document.getElementById('lvlResult');
    const flexValEl = document.getElementById('lvlFlexText');
    const flexAlert = document.getElementById('lvlFlexInfo');

    function update() {
        let start = parseInt(curSlider.value);
        let end = parseInt(tarSlider.value);

        // Constraints: Target > Current
        if (start >= end) {
            // Check which element triggered the event to know strict direction?
            // Actually simpler: Just enforce Gap.
            // If current pushed up, push target up.
            // If target pushed down, push current down.
            // But efficient way:
            if (end <= start) {
                 // Check relative to previous values? No state here.
                 // Let's just ensure min gap of 1.
                 // Correct logic handled in listeners usually or here post-facto.
            }
        }
        
        curDisplay.textContent = start;
        tarDisplay.textContent = end;

        // Calculate
        let totalStd = 0;
        let totalEpic = 0;
        const flexibleTrans = [];

        for (let i = start; i < end; i++) {
            const cost = LEVEL_UP_COSTS[i];
            if (!cost) continue;

            if (cost.type === 'std') totalStd += cost.val;
            else if (cost.type === 'epic') totalEpic += cost.val;
            else if (cost.type === 'flex') {
                totalStd += cost.val; // Default to Std
                flexibleTrans.push(`${i}->${i + 1}`);
            }
        }

        // Display Result
        const parts = [];
        if (totalStd > 0) parts.push(`${totalStd}`);
        if (totalEpic > 0) parts.push(`${totalEpic} Epic`);
        resultEl.textContent = parts.length > 0 ? parts.join(' + ') : '0';

        // Display Info
        if (flexibleTrans.length > 0) {
            const savedEpic = flexibleTrans.length;
            const costSaved = flexibleTrans.length * 4;
            flexValEl.innerHTML = `<strong>İpucu:</strong> Bu aralıkta bulunan <strong>${flexibleTrans.join(', ')}</strong> seviye geçişleri için toplam <strong>${costSaved} Milestone</strong> yerine <strong>${savedEpic} Epic Milestone</strong> kullanmayı tercih edebilirsiniz.`;
            flexAlert.classList.remove('d-none');
        } else {
            flexAlert.classList.add('d-none');
        }
    }

    // Constraint Listeners
    curSlider.addEventListener('input', () => {
        let start = parseInt(curSlider.value);
        let end = parseInt(tarSlider.value);
        
        if (start >= end) {
            end = start + 1;
            if (end > 20) {
                end = 20;
                start = 19;
                curSlider.value = start;
            }
            tarSlider.value = end;
        }
        update();
    });

    tarSlider.addEventListener('input', () => {
        let start = parseInt(curSlider.value);
        let end = parseInt(tarSlider.value);
        
        if (end <= start) {
            start = end - 1;
            if (start < 1) {
                start = 1;
                end = 2;
                tarSlider.value = end;
            }
            curSlider.value = start;
        }
        update();
    });

    update(); // Init
}

initLevelUpCalculator();
initBudgetCalculator();

// --- Milestone Converter Logic ---
function calculateMilestoneGold() {
    const startLvl = parseInt(document.getElementById('msCurrentLevel').value) || 1;
    
    // Track inputs separately
    let curMs = Math.max(0, parseInt(document.getElementById('msCurrentCount').value) || 0);
    let curEpic = Math.max(0, parseInt(document.getElementById('msCurrentEpic').value) || 0);

    let addMs = Math.max(0, parseInt(document.getElementById('msAddedCount').value) || 0);
    let addEpic = Math.max(0, parseInt(document.getElementById('msAddedEpic').value) || 0);

    const warningEl = document.getElementById('msEpicWarning');
    const resultEl = document.getElementById('msResult');

    // Validation
    if ((addEpic > 0 || curEpic > 0) && startLvl < 15) {
        warningEl.classList.remove('d-none');
        resultEl.classList.add('d-none');
        return;
    }
    warningEl.classList.add('d-none');

    // Logic
    let lvl = startLvl;
    let totalGold = 0;
    const breakdown = [];

    // Combined Stash for Leveling Logic
    let stashMs = curMs + addMs;
    let stashEpic = curEpic + addEpic;

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
        
        if (data.reqMs > 0 && stashMs >= data.reqMs) {
            // Level up using Standard Milestone
            const req = data.reqMs;
            
            // Calculate consumption split (Prioritize Current Stash)
            const usedCur = Math.min(req, curMs);
            const usedAdd = req - usedCur; // Remainder from Added

            // Decrement shadow counters
            curMs -= usedCur;
            addMs -= usedAdd;
            stashMs -= req;

            // Add Gold ONLY for Added portion
            totalGold += (usedAdd * data.valMs);

            breakdown.push(`Level ${lvl} -> ${data.next} (${req} Milestone harcandı)`);
            
            lvl = data.next;
            levelledUp = true;
        } 
        else if (data.reqEpic > 0 && stashEpic >= data.reqEpic) {
            // Level up using Epic Milestone
            const req = data.reqEpic;

            // Calculate consumption split (Prioritize Current Stash)
            const usedCur = Math.min(req, curEpic);
            const usedAdd = req - usedCur; // Remainder from Added

            // Decrement shadow counters
            curEpic -= usedCur;
            addEpic -= usedAdd;
            stashEpic -= req;

            // Add Gold ONLY for Added portion
            totalGold += (usedAdd * data.valEpic);

            breakdown.push(`Level ${lvl} -> ${data.next} (${req} Epic Milestone harcandı)`);
            
            lvl = data.next;
            levelledUp = true;
        }

        if (!levelledUp) {
            keepChecking = false;
        }
    }

    // Remaining (Surplus) Gold Conversion
    // Only convert remaining ADDED milestones
    if (lvl < 20) {
        const currentData = LEVEL_DATA[lvl];
        if (currentData) {
            // Convert Remaining Added Normal MS
            if (currentData.valMs > 0 && addMs > 0) {
                totalGold += (addMs * currentData.valMs);
            }
            // Convert Remaining Added Epic MS
            if (currentData.valEpic > 0 && addEpic > 0) {
                totalGold += (addEpic * currentData.valEpic);
            }
        }
    }

    // Display
    document.getElementById('msTotalGold').textContent = `${totalGold} GP`;
    // Display Total Remaining Stash (Current + Added that wasn't used)
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
