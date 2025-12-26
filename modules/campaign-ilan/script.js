const EXP_TAGS = [
    { label: "0/5", id: "<@&1438075037566636123>" },
    { label: "1/5", id: "<@&1438075175319896085>" },
    { label: "2/5", id: "<@&1438075199793926144>" },
    { label: "3/5", id: "<@&1438075216524742696>" },
    { label: "4/5", id: "<@&1438075235416014848>" },
    { label: "5/5", id: "<@&1438075253468299264>" }
];

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

// Approval logic removed

function generateTemplate() {
    // validations
    const forms = ['form-section-a', 'form-section-b', 'form-section-c'];
    let isValid = true;
    let warningMsg = "Lütfen tüm zorunlu alanları doldurun.";

    // Check Inputs Validity (Sequential & Manual Focus to suppress tooltips)
    for (const fid of forms) {
        const f = document.getElementById(fid);
        const firstInvalid = f.querySelector(':invalid');
        if (firstInvalid) {
            firstInvalid.focus();
            isValid = false;
            break;
        }
    }

    // If standard inputs are invalid, show warning and stop here
    if (!isValid) {
        const warningEl = document.getElementById('generateWarning');
        warningEl.textContent = warningMsg;
        warningEl.classList.remove('d-none');
        return;
    }

    // Special Check for Experience Checkboxes
    const checkedTags = document.querySelectorAll('#expCheckboxes input:checked');
    if (checkedTags.length === 0) {
        isValid = false;
        warningMsg = "Lütfen en az bir tecrübe seviyesi seçiniz.";
        const warningEl = document.getElementById('generateWarning');
        warningEl.textContent = warningMsg;
        warningEl.classList.remove('d-none');
        return;
    }

    // Clear warning if valid
    document.getElementById('generateWarning').classList.add('d-none');

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
    const day = dayInput || "Gün belirleme anketi ile karar verilecek.";
    const other = document.getElementById('otherInfo').value.trim() || "-";

    const output = `**Campaign Başlığı:** ${title}
**Campaign Lokasyonu:** ${loc}
**Campaign Açıklaması:** ${desc}
**Oyuncu Tecrübesi:** ${selectedTags.join(' ')}
**İstenilen Seviye ve Avatar Sayısı:** ${levelText}, ${avatarCount} avatar.
**Campaign Uzunluğu:** ${sessionText}, session başı ${hourText}.
**Campaign Günü:** ${day}
**Diğer Bilgiler:** ${other}\n*[NEXUS Tool Kullanılarak Oluşturulmuştur]*`;

    document.getElementById('resultOutput').value = output;
    document.getElementById('result-card').classList.remove('d-none');
    document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
}

function copyResultLocal(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Use innerText for pre tags or value for inputs
    const text = element.innerText || element.value;

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btnCopyResult');
        const icon = btn.querySelector('i');
        const originalClass = "fa-regular fa-copy";
        const successClass = "fa-solid fa-check";

        if (icon) {
            icon.className = successClass;
            setTimeout(() => {
                icon.className = originalClass;
            }, 1000);
        }
    }).catch(err => {
        console.error('Copy failed: ', err);
        alert("Kopyalama başarısız oldu.");
    });
}
