const EXP_TAGS = [
    { label: "0/5", id: "<@&1438075037566636123>" },
    { label: "1/5", id: "<@&1438075175319896085>" },
    { label: "2/5", id: "<@&1438075199793926144>" },
    { label: "3/5", id: "<@&1438075216524742696>" },
    { label: "4/5", id: "<@&1438075235416014848>" },
    { label: "5/5", id: "<@&1438075253468299264>" }
];

const approvalState = {
    'section-a': false,
    'section-b': false,
    'section-c': false
};

document.addEventListener('DOMContentLoaded', () => {
    initExpCheckboxes();
    initSliders();
});

function initExpCheckboxes() {
    const container = document.getElementById('expCheckboxes');
    EXP_TAGS.forEach(tag => {
        const col = document.createElement('div');
        col.className = 'col-4 col-md-2';
        col.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${tag.id}" id="check_${tag.label.replace('/', '')}">
                <label class="form-check-label" for="check_${tag.label.replace('/', '')}">
                    ${tag.label}
                </label>
            </div>
        `;
        container.appendChild(col);
    });
}

function initSliders() {
    setupDualSlider('levelMin', 'levelMax', 'levelDisplay', (min, max) => min === max ? `${min}. Seviye` : `${min}-${max}. Seviye`);
    setupDualSlider('sessionMin', 'sessionMax', 'sessionDisplay', (min, max) => min === max ? (min == 1 ? "Tek Session" : `${min} Session`) : `${min}-${max} Session`);
    setupDualSlider('hourMin', 'hourMax', 'hourDisplay', (min, max) => min === max ? `${min} Saat` : `${min}-${max} Saat`);
}

function setupDualSlider(minId, maxId, displayId, formatter) {
    const minInput = document.getElementById(minId);
    const maxInput = document.getElementById(maxId);
    const display = document.getElementById(displayId);

    const update = () => {
        let min = parseFloat(minInput.value);
        let max = parseFloat(maxInput.value);

        // Constraint: Min <= Max
        if (min > max) {
            // Determine which one moved to fix the other. 
            // Simple approach: if min > max, push max up to min
            max = min;
            maxInput.value = max;
        }

        display.textContent = formatter(min, max);
    };

    minInput.addEventListener('input', update);
    maxInput.addEventListener('input', () => {
        let min = parseFloat(minInput.value);
        let max = parseFloat(maxInput.value);
        if (max < min) {
            min = max;
            minInput.value = min;
        }
        display.textContent = formatter(min, max);
    }); // Separate handler for max to adjust min
}

function toggleApproval(sectionId) {
    const section = document.getElementById(sectionId);
    const form = section.querySelector('form');
    const warningEl = document.getElementById(`warning-${sectionId}`);
    const btn = document.getElementById(`btn-approve-${sectionId.split('-')[1]}`);
    const isApproved = approvalState[sectionId];

    if (!isApproved) {
        // Validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Section B specific validation: At least one tag
        if (sectionId === 'section-b') {
            const checked = form.querySelectorAll('input[type="checkbox"]:checked');
            if (checked.length === 0) {
                warningEl.textContent = 'Lütfen en az bir tecrübe seviyesi seçiniz.';
                warningEl.classList.remove('d-none');
                return;
            }
        }

        if (warningEl) warningEl.classList.add('d-none');

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
        document.getElementById('result-card').classList.add('d-none');
    }

    checkAllApproved();
}

function checkAllApproved() {
    const allApproved = Object.values(approvalState).every(val => val === true);
    document.getElementById('btn-generate').disabled = !allApproved;
}

function generateTemplate() {
    // A
    const title = document.getElementById('campaignTitle').value.trim();
    const loc = document.getElementById('campaignLocation').value.trim();
    const desc = document.getElementById('campaignDesc').value.trim();

    // B
    const selectedTags = [];
    document.querySelectorAll('#expCheckboxes input:checked').forEach(cb => selectedTags.push(cb.value));
    const levelText = document.getElementById('levelDisplay').textContent; // Get formatted text directly
    const avatarCount = document.getElementById('avatarCount').value;

    // C
    const sessionText = document.getElementById('sessionDisplay').textContent;
    const hourText = document.getElementById('hourDisplay').textContent;
    const dayInput = document.getElementById('campaignDay').value.trim();
    const day = dayInput || "Anket Açılacak";
    const other = document.getElementById('otherInfo').value.trim();

    const output = `**Campaign Başlığı:** ${title}
**Campaign Lokasyonu:** ${loc}
**Campaign Açıklaması:** ${desc}
**Oyuncu Tecrübesi:** ${selectedTags.join(' ')}
**Tavsiye Edilen Seviye ve Avatar Sayısı:** ${levelText}, ${avatarCount} avatar.
**Campaign Uzunluğu:** ${sessionText}, ${hourText}.
**Campaign Günü:** ${day}
**Diğer Bilgiler:** ${other}`;

    document.getElementById('resultOutput').textContent = output;
    document.getElementById('result-card').classList.remove('d-none');
    document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
}

function copyResult() {
    const text = document.getElementById('resultOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const toast = new bootstrap.Toast(document.getElementById('liveToast'));
        toast.show();
    });
}
