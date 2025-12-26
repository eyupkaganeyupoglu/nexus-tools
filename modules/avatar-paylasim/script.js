const CLASSES = [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk",
    "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer"
];



document.addEventListener('DOMContentLoaded', () => {
    initClassCheckboxes();
    renderClassInputs();

    // Event Listeners
    document.getElementById('multiclassToggle').addEventListener('change', renderClassInputs);
    document.getElementById('classCount').addEventListener('change', renderClassInputs);
});

function initClassCheckboxes() {
    const container = document.getElementById('classCheckboxes');
    container.innerHTML = '';

    CLASSES.forEach(cls => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 mb-2';
        col.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${cls}" id="check_${cls}">
                <label class="form-check-label" for="check_${cls}">
                    ${cls}
                </label>
            </div>
        `;
        container.appendChild(col);
    });
}

function renderClassInputs() {
    const isMulticlass = document.getElementById('multiclassToggle').checked;
    const countInput = document.getElementById('classCount');
    const container = document.getElementById('classInputsContainer');
    const countContainer = document.getElementById('classCountContainer');

    // Toggle count visibility
    if (isMulticlass) {
        countContainer.classList.remove('d-none');
    } else {
        countContainer.classList.add('d-none');
    }

    let count = 1;

    if (isMulticlass) {
        let val = parseInt(countInput.value);
        if (isNaN(val) || val < 2) val = 2;
        if (val > 5) val = 5;
        countInput.value = val; // Update input to reflect clamped value
        count = val;
    }

    // Simple re-render (clears existing values, can be improved but sufficient for requirement)
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const group = document.createElement('div');
        group.className = 'class-group';
        group.innerHTML = `
            <div class="row g-2">
                <div class="col-md-2">
                    <label class="form-label small">Level</label>
                    <input type="number" class="form-control class-level" min="1" max="20" required placeholder="Lvl">
                </div>
                <div class="col-md-5">
                    <label class="form-label small">Subclass (eğer varsa)</label>
                    <input type="text" class="form-control class-subclass" placeholder="Örn: Battle Master">
                </div>
                <div class="col-md-5">
                    <label class="form-label small">Class</label>
                    <input type="text" class="form-control class-name" required placeholder="Örn: Fighter">
                </div>
            </div>
        `;
        container.appendChild(group);
    }
}


function generateTemplate() {
    // validations
    const forms = ['form-section-a', 'form-section-b', 'form-section-c'];
    let isValid = true;
    let warningMsg = "Lütfen eksik alanları doldurunuz.";

    // Check Inputs Validity
    // Check Inputs Validity
    for (const fid of forms) {
        const f = document.getElementById(fid);
        // Find the first invalid element in this form
        const firstInvalid = f.querySelector(':invalid');
        if (firstInvalid) {
            firstInvalid.focus(); // Focus specifically the first invalid element
            isValid = false;
            warningMsg = "Lütfen tüm zorunlu alanları doldurun.";
            break; // Stop here
        }
    }

    // If standard inputs are invalid, show warning and stop here
    if (!isValid) {
        const warningEl = document.getElementById('generateWarning');
        warningEl.textContent = warningMsg;
        warningEl.classList.remove('d-none');
        return;
    }

    // Special Check for Checkboxes (Only if forms are valid)
    const checked = document.querySelectorAll('#classCheckboxes input:checked');
    if (checked.length === 0) {
        isValid = false;
        warningMsg = "Lütfen en az bir Class Tag seçiniz.";
    }

    const warningEl = document.getElementById('generateWarning');
    if (!isValid) {
        warningEl.textContent = warningMsg;
        warningEl.classList.remove('d-none');
        return; // Stop here
    }
    
    // Clear warning if valid
    warningEl.classList.add('d-none');

    // Collect Data
    const classGroups = document.querySelectorAll('.class-group');
    const classStrings = [];

    classGroups.forEach(group => {
        const lvl = group.querySelector('.class-level').value;
        const sub = group.querySelector('.class-subclass').value.trim();
        const cls = group.querySelector('.class-name').value.trim();

        if (sub) {
            classStrings.push(`${lvl} ${sub} ${cls}`);
        } else {
            classStrings.push(`${lvl} ${cls}`);
        }
    });

    const species = document.getElementById('species').value.trim();
    const headerTitle = `${classStrings.join(' , ')} , ${species}`;

    const avatarName = document.getElementById('avatarName').value.trim();
    const backstory = document.getElementById('backstory').value.trim();
    const personalityTraits = document.getElementById('personalityTraits').value.trim();
    const ideals = document.getElementById('ideals').value.trim();
    const bonds = document.getElementById('bonds').value.trim();
    const flaws = document.getElementById('flaws').value.trim();
    const about = document.getElementById('aboutPlayer').value.trim();

    const selectedTags = [];
    document.querySelectorAll('#classCheckboxes input:checked').forEach(cb => {
        selectedTags.push(cb.value);
    });

    // Format Output
    const output = `**BAŞLIK:** ${headerTitle} (Bunu başlığa yazdıktan sonra bu satırı silin.)
**MESAJ:** (Bu satırı silin.)
- **${avatarName}**
- ${backstory}
- **Personality Traits:** ${personalityTraits}
- **Ideals:** ${ideals}
- **Bonds:** ${bonds}
- **Flaws:** ${flaws}
- ${about}

**ETİKETLER:** ${selectedTags.join(', ')} (Bu etiketleri gönderinin altındakilerden seçtikten sonra bu satırı silin.)\n*[NEXUS Tool Kullanılarak Oluşturulmuştur]*`;

    // Render
    document.getElementById('resultOutput').textContent = output;
    document.getElementById('result-card').classList.remove('d-none');

    // Scroll to result
    document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
}

function copyResult() {
    const text = document.getElementById('resultOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Panoya kopyalandı!');
    });
}
