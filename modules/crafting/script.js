// --- Constants & Data ---
const SCROLL_TABLE = {
    0: { cost: 15, wu: 1, dc: 9 },      // Cantrip
    1: { cost: 25, wu: 1, dc: 10 },
    2: { cost: 50, wu: 3, dc: 30 },
    3: { cost: 75, wu: 4, dc: 42 },
    4: { cost: 350, wu: 7, dc: 77 },
    5: { cost: 500, wu: 9, dc: 105 },
    6: { cost: 1000, wu: 15, dc: 180 },
    7: { cost: 1750, wu: 25, dc: 315 },
    8: { cost: 2500, wu: 40, dc: 520 }
};

const COMPLEXITY_TABLE = [
    { minGP: 0.01, maxGP: 50, minWU: 1, maxWU: 2, minDC: 8, maxDC: 16 },
    { minGP: 51, maxGP: 200, minWU: 3, maxWU: 4, minDC: 27, maxDC: 36 },
    { minGP: 201, maxGP: 1000, minWU: 5, maxWU: 9, minDC: 50, maxDC: 90 },
    { minGP: 1001, maxGP: 4000, minWU: 10, maxWU: 29, minDC: 110, maxDC: 320 },
    { minGP: 4001, maxGP: 5000, minWU: 30, maxWU: 60, minDC: 360, maxDC: 720 }
];

const TOOLS_LIST = [
    "Alchemist's Supplies",
    "Calligrapher's Supplies",
    "Jeweler's Tools",
    "Leatherworker's Tools",
    "Smith's Tools",
    "Weaver's Tools",
    "Woodcarver's Tools",
    "Diğer..."
];

const EVENT_TABLE = [
    { min: 1, max: 1, name: "Disaster", cm: -2, color: "text-danger" },
    { min: 2, max: 4, name: "Setback", cm: -1, color: "text-danger" },
    { min: 5, max: 8, name: "Stable", cm: 0, color: "text-normal" },
    { min: 9, max: 9, name: "Minor Breakthrough", cm: 1, color: "text-success" },
    { min: 10, max: 10, name: "Sudden Inspiration", cm: 2, color: "text-success" }
];

// --- State ---
let STATE = {
    isSimulationActive: false,
    itemPrice: 0,
    targetWU: 0,
    targetDC: 0,
    currentWU: 0,
    grandTotal: 0,
    materialCM: 0,
    skillBonus: 0,
    roundCount: 0,
    selectedQuality: 'common'
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initCharLevel();
    initTools();
    initEventListeners();
});

function initCharLevel() {
    const sel = document.getElementById('charLevel');
    for (let i = 1; i <= 20; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        sel.appendChild(opt);
    }
    sel.addEventListener('change', updatePB);
    updatePB(); // Init
}

function updatePB() {
    const lvl = parseInt(document.getElementById('charLevel').value);
    let pb = 2;
    if (lvl >= 5) pb = 3;
    if (lvl >= 9) pb = 4;
    if (lvl >= 13) pb = 5;
    if (lvl >= 17) pb = 6;

    // document.getElementById('displayPB').textContent = `+${pb}`;
    document.getElementById('pbLabel').textContent = pb;
    document.getElementById('expertiseLabel').textContent = pb * 2;
    calcSkillBonus();
}

function initTools() {
    const sel = document.getElementById('toolSelect');
    TOOLS_LIST.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        sel.appendChild(opt);
    });
}

// --- Autocomplete & Logic ---
function initEventListeners() {
    // Autocomplete
    const inputItem = document.getElementById('itemName');
    inputItem.addEventListener('input', handleAutocomplete);

    // Material Quality Calc
    const cards = ['cardPoor', 'cardCommon', 'cardQuality'];
    const radios = ['matPoor', 'matCommon', 'matQuality'];

    // Setup Card Clicks
    cards.forEach((cardId, index) => {
        const card = document.getElementById(cardId);
        const radioId = radios[index];

        card.addEventListener('click', () => {
            const radio = document.getElementById(radioId);
            radio.checked = true;
            // Trigger change manually
            const event = new Event('change');
            radio.dispatchEvent(event);
        });
    });

    // Listen to Radio Changes for UI Update
    const qualityRadios = document.getElementsByName('materialQuality');
    qualityRadios.forEach(r => r.addEventListener('change', (e) => {
        STATE.selectedQuality = e.target.value;
        validateMaterialSelection();
        updateMaterialUI();
    }));

    // Init UI
    updateMaterialUI();

    // Skill Bonus
    document.getElementById('abilityMod').addEventListener('input', calcSkillBonus);
    document.getElementById('hasProficiency').addEventListener('change', calcSkillBonus);
    document.getElementById('hasExpertise').addEventListener('change', calcSkillBonus);

    // Setup Buttons
    document.getElementById('btnStartSetup').addEventListener('click', startSimulation);
    document.getElementById('btnEditSetup').addEventListener('click', editSetup);

    // Sim Buttons
    document.getElementById('btnCraft').addEventListener('click', runRound);
}

// --- Complexity Logic ---
function selectItem(itemData) {
    document.getElementById('itemName').value = itemData.name;
    document.getElementById('itemPrice').textContent = itemData.price;
    STATE.itemPrice = parseFloat(itemData.price);

    // Close list
    document.getElementById('autocomplete-list').innerHTML = '';

    // Determine complexity
    calculateComplexity(itemData.name, STATE.itemPrice);

    // Update Material Costs
    updateMaterialCosts();
}

function calculateComplexity(name, price) {
    const lowerName = name.toLowerCase();

    // 1. Check Scroll
    // Assuming format "Spell Scroll (Level X)" or "Spell Scroll (Cantrip)"
    if (lowerName.includes("spell scroll")) {
        let level = -1;
        if (lowerName.includes("cantrip")) level = 0;
        else {
            const match = lowerName.match(/level\s+(\d+)/);
            if (match) level = parseInt(match[1]);
        }

        if (level !== -1 && SCROLL_TABLE[level]) {
            const data = SCROLL_TABLE[level];
            setTarget(data.wu, data.dc);

            // Auto Select Tool
            const sel = document.getElementById('toolSelect');
            sel.value = "Calligrapher's Supplies";
            // Lock tool maybe? Requirements say "sadece Calligrapher". 
            // For now, selecting it is good UX.
            return;
        }
    }

    // 2. Standard Interpolation
    let foundRange = null;
    for (const r of COMPLEXITY_TABLE) {
        if (price >= r.minGP && price <= r.maxGP) {
            foundRange = r;
            break;
        }
    }

    if (foundRange) {
        const ratio = (foundRange.maxGP === foundRange.minGP) ? 0 :
            (price - foundRange.minGP) / (foundRange.maxGP - foundRange.minGP);

        const wu = Math.round(foundRange.minWU + (ratio * (foundRange.maxWU - foundRange.minWU)));
        const dc = Math.round(foundRange.minDC + (ratio * (foundRange.maxDC - foundRange.minDC)));

        setTarget(wu, dc);
    } else {
        // Fallback / Out of range
        if (price > 5000) {
            setTarget(60, 720); // Cap
        } else {
            setTarget(0, 0);
        }
    }
}

function setTarget(wu, dc) {
    STATE.targetWU = wu;
    STATE.targetDC = dc;
    document.getElementById('targetWU').textContent = wu;
    document.getElementById('targetDC').textContent = dc;
}

// --- Material Logic ---
function updateMaterialCosts() {
    const p = STATE.itemPrice;
    document.getElementById('costPoor').textContent = (p / 4).toFixed(1);
    document.getElementById('costCommon').textContent = (p / 2).toFixed(1);
    document.getElementById('costQuality').textContent = (p * 0.75).toFixed(1);
    validateMaterialSelection();
}

function validateMaterialSelection() {
    const p = STATE.itemPrice;
    let valid = true;
    const q = STATE.selectedQuality; // poor, common, quality

    // Limits
    if (q === 'poor' && p > 1000) valid = false;
    if (q === 'common' && p > 4000) valid = false;
    if (q === 'quality' && p > 5000) valid = false;

    const warn = document.getElementById('materialWarning');
    if (!valid) {
        warn.classList.remove('d-none');
        document.getElementById('btnStartSetup').disabled = true;
    } else {
        warn.classList.add('d-none');
        document.getElementById('btnStartSetup').disabled = false;
    }

    // Update State CM
    if (q === 'poor') STATE.materialCM = -3;
    if (q === 'common') STATE.materialCM = -2;
    if (q === 'quality') STATE.materialCM = -1;
}

// --- Skill Logic ---
function calcSkillBonus() {
    let mod = parseInt(document.getElementById('abilityMod').value) || 0;
    // if (mod < 0) mod = 0; // Removed to allow negative mods
    const proficient = document.getElementById('hasProficiency').checked;
    const expertise = document.getElementById('hasExpertise').checked;
    
    // Get base PB from the label text (which is updated by level)
    const pb = parseInt(document.getElementById('pbLabel').textContent) || 0;

    let bonusPB = 0;
    if (expertise) {
        bonusPB = pb * 2;
    } else if (proficient) {
        bonusPB = pb;
    }

    STATE.skillBonus = mod + bonusPB;
    
    // Display signed number for clarity
    const sign = STATE.skillBonus >= 0 ? '+' : '';
    document.getElementById('finalSkillBonus').textContent = `${sign}${STATE.skillBonus}`;
}

// --- Wizard Control ---
function startSimulation() {
    // Validations
    const warn = document.getElementById('step4Warning');
    if (STATE.targetWU <= 0) {
        warn.textContent = "Geçersiz Item Seçtiniz. Lütfen geçerli bir Item seçin.";
        warn.classList.remove('d-none');
        return;
    }
    warn.classList.add('d-none'); // Clear if valid

    STATE.isSimulationActive = true;
    STATE.currentWU = 0;
    STATE.grandTotal = 0;
    STATE.roundCount = 0;
    document.getElementById('simLogBody').innerHTML = ''; // Clear logs
    updateSimUI();
    document.getElementById('simPanel').classList.remove('d-none');
    document.getElementById('resultContainer').classList.add('d-none');

    // Lock inputs
    toggleSetup(true);
}

function editSetup() {
    // Only ask for confirmation if simulation is actually in progress AND not finished
    const isMidGame = STATE.currentWU > 0 && STATE.currentWU < STATE.targetWU;

    if (isMidGame) {
        if (!confirm("Simülasyon devam ediyor. Düzenleme yaparsanız ilerlemeniz SIFIRLANACAK. Emin misiniz?")) {
            return;
        }
    }

    // Reset Logic
    STATE.isSimulationActive = false;
    document.getElementById('simPanel').classList.add('d-none');
    document.getElementById('resultContainer').classList.add('d-none'); // Ensure result is hidden too

    toggleSetup(false);
}

function toggleSetup(locked) {
    const wizardIds = ['step1', 'step2', 'step3'];
    wizardIds.forEach(id => {
        const el = document.getElementById(id);
        if (locked) el.classList.add('locked');
        else el.classList.remove('locked');
    });

    const btnStart = document.getElementById('btnStartSetup');
    const btnEdit = document.getElementById('btnEditSetup');

    if (locked) {
        btnStart.classList.add('d-none');
        btnEdit.classList.remove('d-none');
    } else {
        btnStart.classList.remove('d-none');
        btnEdit.classList.add('d-none');
        btnEdit.disabled = false; // Reset state
        btnEdit.style.opacity = "1";
    }
}

// --- Simulation Logic ---

function runRound() {
    if (!STATE.isSimulationActive) return;
    if (STATE.currentWU >= STATE.targetWU) return;

    STATE.roundCount++;

    // 1. Approach
    const approachType = document.getElementById('simApproach').value;
    let approachDC = 10;
    let successEff = 1, failEff = -1;

    if (approachType === 'ambitious') { approachDC = 15; successEff = 2; failEff = -2; }
    if (approachType === 'masterwork') { approachDC = 20; successEff = 3; failEff = -3; }

    const roll1 = rollD20();
    const approachTotal = roll1 + STATE.skillBonus;
    const approachSuccess = approachTotal >= approachDC;
    const approachCM = approachSuccess ? successEff : failEff;

    // 2. Event
    const rollEvent = Math.floor(Math.random() * 10) + 1; // d10
    let eventCM = 0;
    let eventName = "";
    let eventColor = "";

    const ev = EVENT_TABLE.find(e => rollEvent >= e.min && rollEvent <= e.max);
    eventCM = ev.cm;
    eventName = ev.name;
    eventColor = ev.color;

    // 3. Unit Total
    const unitTotalCM = STATE.materialCM + approachCM + eventCM;

    // 4. Progress Roll
    const rollProg = rollD20();
    const roundScore = rollProg + unitTotalCM;

    // Update State
    STATE.currentWU++;
    STATE.grandTotal += roundScore;

    // Log
    addLog(STATE.roundCount, approachSuccess, approachTotal, approachDC, eventName, eventColor, unitTotalCM, rollProg, roundScore, STATE.grandTotal);

    updateSimUI();
    
    // Disable Edit Button visually and functionally
    const btnEdit = document.getElementById('btnEditSetup');
    btnEdit.disabled = true;
    btnEdit.style.opacity = "0.5";

    checkEndCondition();
}

function checkEndCondition() {
    if (STATE.currentWU >= STATE.targetWU) {
        // End
        const success = STATE.grandTotal >= STATE.targetDC;
        const resContainer = document.getElementById('resultContainer');
        const itemName = document.getElementById('itemName').value;

        let html = '';
        if (success) {
            html = `
            <div class="alert mt-4 text-white" style="background-color: var(--success-color);">
                <h4 class="alert-heading"><i class="fa-solid fa-trophy me-2"></i>Tebrikler!</h4>
                <p class="mb-0">Toplam Puan: <strong>${STATE.grandTotal}</strong> (Gereken: ${STATE.targetDC})</p>
                <hr>
                <p class="mb-0"><strong>${itemName}</strong> başarıyla üretildi.</p>
                <p class="mb-0"><strong>${STATE.targetWU}</strong> gün boyunca başka bir item craftlayamazsın.</p>
            </div>
            `;
        } else {
            // Failure - Recycling logic
            let recycleMsg = "Materyaller tamamen yok oldu.";
            if (STATE.selectedQuality === 'quality') recycleMsg = `${itemName} Common Materials geri kazanıldı.`;
            if (STATE.selectedQuality === 'common') recycleMsg = `${itemName} Poor Materials geri kazanıldı.`;

            html = `
            <div class="alert mt-4 text-white" style="background-color: var(--danger-color);">
                <h4 class="alert-heading"><i class="fa-solid fa-skull-crossbones me-2"></i>Üretim Başarısız!</h4>
                <p>Toplam Puan: <strong>${STATE.grandTotal}</strong> (Gereken: ${STATE.targetDC})</p>
                <hr>
                <p class="mb-0"><strong>Geri Dönüşüm Sonucu:</strong> ${recycleMsg}</p>
                <p class="mb-0"><strong>${STATE.targetWU}</strong> gün boyunca başka bir item craftlayamazsın.</p>
            </div>
            `;
        }

        html += `<div class="d-grid mt-3"><button class="btn btn-primary" onclick="editSetup()">Yeni Üretim</button></div>`;

        resContainer.innerHTML = html;
        resContainer.classList.remove('d-none');
        document.getElementById('btnCraft').disabled = true;
    }
}

function updateSimUI() {
    document.getElementById('lblCurrentWU').textContent = STATE.currentWU;
    document.getElementById('lblTargetWU').textContent = STATE.targetWU;


    const pct = Math.min(100, (STATE.currentWU / STATE.targetWU) * 100);
    const bar = document.getElementById('progressBar');
    bar.style.width = `${pct}%`;

    if (STATE.currentWU < STATE.targetWU) {
        document.getElementById('btnCraft').disabled = false;
    }
}

function addLog(round, appSuccess, appRoll, appDC, evName, evColor, roundCM, progRoll, total, grandTotal) {
    const tbody = document.getElementById('simLogBody');
    const tr = document.createElement('tr');

    // Approach Text
    const appClass = appSuccess ? "text-success" : "text-danger";
    const appIcon = appSuccess ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>';

    // Find Event CM for display
    let evCM = 0;
    const evObj = EVENT_TABLE.find(e => e.name === evName);
    if (evObj) evCM = evObj.cm;

    // Determine Approach Info
    let s = 1, f = -1;
    if (appDC === 15) { s = 2; f = -2; }
    if (appDC === 20) { s = 3; f = -3; }

    tr.innerHTML = `
        <td>${round}</td>
        <td><span class="${appClass}">${appIcon} ${appRoll}</span> <small style="color: var(--text-normal);">(DC ${appDC}) | +${s} / ${f} CM</small></td>
        <td><span class="${evColor}">${evName} (${evCM > 0 ? '+' : ''}${evCM} CM)</span></td>
        <td>${roundCM > 0 ? '+' : ''}${roundCM}</td>
        <td>${progRoll}</td>
        <td>${total}</td>
        <td class="fw-bold text-warning">${grandTotal}</td>
    `;

    tbody.prepend(tr);
}

// --- Utils ---
function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

function handleAutocomplete(e) {
    const val = this.value;
    const list = document.getElementById('autocomplete-list');
    list.innerHTML = '';

    // Reset State on Input
    document.getElementById('itemPrice').textContent = "0";
    STATE.itemPrice = 0;
    // Recalc with 0 price (effectively resets targets unless name triggers scroll logic)
    calculateComplexity(val, 0);
    updateMaterialCosts();

    if (!val || typeof marketData === 'undefined') return;

    const matches = marketData.filter(item =>
        item.name.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 8);

    // Check Exact Match
    const exactMatch = matches.find(item => item.name.toLowerCase() === val.toLowerCase());
    if (exactMatch) {
        document.getElementById('itemPrice').textContent = exactMatch.price;
        STATE.itemPrice = parseFloat(exactMatch.price);
        calculateComplexity(exactMatch.name, STATE.itemPrice);
        updateMaterialCosts();
    }

    matches.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = item.name;
        div.addEventListener('click', () => selectItem(item));
        list.appendChild(div);
    });
}

function updateMaterialUI() {
    const cards = {
        'poor': 'cardPoor',
        'common': 'cardCommon',
        'quality': 'cardQuality'
    };

    // Reset All
    Object.values(cards).forEach(id => {
        const el = document.getElementById(id);
        el.style.borderColor = "";
        el.style.boxShadow = "";
    });

    // Highlight Selected
    const selected = STATE.selectedQuality; // poor, common, quality
    const activeCardId = cards[selected];
    if (activeCardId) {
        const el = document.getElementById(activeCardId);
        el.style.borderColor = "var(--accent-color)";
        el.style.boxShadow = "0 0 10px rgba(88, 101, 242, 1)"; // Blue blur
    }
}
