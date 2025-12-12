const CLASSES = [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk",
    "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer"
];

const approvalState = {
    'section-a': false,
    'section-b': false,
    'section-c': false
};

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

function toggleApproval(sectionId) {
    const section = document.getElementById(sectionId);
    const form = section.querySelector('form');
    const btn = document.getElementById(`btn-approve-${sectionId.split('-')[1]}`);
    const isApproved = approvalState[sectionId];

    if (!isApproved) {
        // Special validation for Section C (Checkboxes)
        if (sectionId === 'section-c') {
            const checked = form.querySelectorAll('input[type="checkbox"]:checked');
            if (checked.length === 0) {
                const warningEl = document.getElementById('warning-section-c');
                warningEl.textContent = 'Lütfen en az bir sınıf/etiket seçiniz.';
                warningEl.classList.remove('d-none');
                return;
            }

            // Clear warning if valid
            const warningEl = document.getElementById('warning-section-c');
            if (warningEl) warningEl.classList.add('d-none');
        }

        // Validate
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Lock
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(el => el.disabled = true);

        // Update Button
        btn.innerHTML = '<i class="fa-solid fa-pen-to-square me-2"></i>Düzenle';
        btn.classList.replace('btn-warning', 'btn-secondary');

        approvalState[sectionId] = true;
    } else {
        // Unlock
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(el => el.disabled = false);

        // Update Button
        btn.innerHTML = '<i class="fa-solid fa-check me-2"></i>Onaylıyorum';
        btn.classList.replace('btn-secondary', 'btn-warning');

        approvalState[sectionId] = false;

        // Hide result if we edit
        document.getElementById('result-card').classList.add('d-none');
    }

    checkAllApproved();
}

function checkAllApproved() {
    const allApproved = Object.values(approvalState).every(val => val === true);
    const generateBtn = document.getElementById('btn-generate');
    generateBtn.disabled = !allApproved;
}

function generateTemplate() {
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
    const about = document.getElementById('aboutPlayer').value.trim();

    const selectedTags = [];
    document.querySelectorAll('#classCheckboxes input:checked').forEach(cb => {
        selectedTags.push(cb.value);
    });

    // Format Output
    const output = `**BAŞLIK:** ${headerTitle}
**MESAJ:**
- **${avatarName}**
- ${backstory}
- ${about}

**ETİKETLER:** ${selectedTags.join(', ')} (Bu etiketleri gönderinin altındakilerden seçin)`;

    // Render
    document.getElementById('resultOutput').textContent = output;
    document.getElementById('result-card').classList.remove('d-none');

    // Scroll to result
    document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
}

function copyResult() {
    const text = document.getElementById('resultOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const toastEl = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    });
}
