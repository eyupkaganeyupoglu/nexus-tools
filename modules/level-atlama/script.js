// Cost Configuration
const COSTS = {
    1: { type: 'std', val: 1 },
    2: { type: 'std', val: 2 },
    3: { type: 'std', val: 2 },
    4: { type: 'std', val: 2 },
    5: { type: 'std', val: 3 },
    6: { type: 'std', val: 3 },
    7: { type: 'std', val: 3 },
    8: { type: 'std', val: 3 },
    9: { type: 'std', val: 3 },
    10: { type: 'std', val: 4 },
    11: { type: 'std', val: 4 },
    12: { type: 'std', val: 4 },
    13: { type: 'std', val: 4 },
    14: { type: 'std', val: 4 },
    15: { type: 'flex', val: 4 }, // 15->16: 4 MS or 1 Epic
    16: { type: 'flex', val: 4 }, // 16->17: 4 MS or 1 Epic
    17: { type: 'flex', val: 4 }, // 17->18: 4 MS or 1 Epic
    18: { type: 'epic', val: 1 }, // 18->19: 1 Epic
    19: { type: 'epic', val: 2 }  // 19->20: 2 Epic
};

document.addEventListener('DOMContentLoaded', () => {
    const currentSlider = document.getElementById('currentLevel');
    const targetSlider = document.getElementById('targetLevel');
    const currentDisplay = document.getElementById('currentLevelDisplay');
    const targetDisplay = document.getElementById('targetLevelDisplay');

    function updateCalculations() {
        let start = parseInt(currentSlider.value);
        let end = parseInt(targetSlider.value);

        // Constraint Logic: Target must be > Current
        if (start >= end) {
            // Determine who moved. If strict enforcement is tricky, 
            // ensure valid gap based on which input triggered event.
            // For simplicity in this unified handler: 
            // If Start pushes End, End = Start + 1
            // If End pulls Start, Start = End - 1

            // We'll rely on the input event order. 
            // But here, let's just enforce: End needs to be at least Start + 1
            if (end <= start) {
                end = start + 1;
                if (end > 20) {
                    end = 20;
                    start = 19;
                }
                targetSlider.value = end;
                currentSlider.value = start;
            }
        }

        currentDisplay.textContent = start;
        targetDisplay.textContent = end;

        calculate(start, end);
    }

    currentSlider.addEventListener('input', () => {
        let start = parseInt(currentSlider.value);
        let end = parseInt(targetSlider.value);
        if (start >= end) {
            end = start + 1;
            if (end > 20) {
                end = 20;
                start = 19;
                currentSlider.value = start;
            }
            targetSlider.value = end;
        }
        updateCalculations();
    });

    targetSlider.addEventListener('input', () => {
        let start = parseInt(currentSlider.value);
        let end = parseInt(targetSlider.value);
        if (end <= start) {
            start = end - 1;
            if (start < 1) {
                start = 1;
                end = 2;
                targetSlider.value = end;
            }
            currentSlider.value = start;
        }
        updateCalculations();
    });

    // Initial calc
    updateCalculations();
});

function calculate(start, end) {
    let totalStd = 0;
    let totalEpic = 0;
    const flexibleTrans = [];

    // Loop from start level up to target level (exclusive of target for index)
    // costs index represents "Level X -> Level X+1"
    for (let i = start; i < end; i++) {
        const cost = COSTS[i];
        if (!cost) continue;

        if (cost.type === 'std') {
            totalStd += cost.val;
        } else if (cost.type === 'epic') {
            totalEpic += cost.val;
        } else if (cost.type === 'flex') {
            totalStd += cost.val; // Add to standard by default
            flexibleTrans.push(`${i}->${i + 1}`);
        }
    }

    // Render Main Result
    const mainEl = document.getElementById('mainResult');
    const parts = [];
    if (totalStd > 0) parts.push(`${totalStd} Milestone`);
    if (totalEpic > 0) parts.push(`${totalEpic} Epic Milestone`);

    mainEl.textContent = parts.join(' + ');

    // Render Info Message
    const infoEl = document.getElementById('flexibleInfo');
    const infoText = document.getElementById('flexibleText');

    if (flexibleTrans.length > 0) {
        const savedEpic = flexibleTrans.length; // 1 Epic per transition
        const costSaved = flexibleTrans.length * 4; // 4 MS per transition

        infoText.innerHTML = `<strong>İpucu:</strong> Bu aralıkta bulunan <strong>${flexibleTrans.join(', ')}</strong> seviye geçişleri için toplam <strong>${costSaved} Milestone</strong> yerine <strong>${savedEpic} Epic Milestone</strong> kullanmayı tercih edebilirsiniz.`;
        infoEl.style.display = 'block';
    } else {
        infoEl.style.display = 'none';
    }
}
