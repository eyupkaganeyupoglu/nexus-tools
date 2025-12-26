/** Shared Utilities */

// Currency
const formatGold = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0 }).format(amount) + ' GP';
};

// Copy
const copyToClipboard = async (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        await navigator.clipboard.writeText(element.value || element.innerText);
        showToast('Başarıyla kopyalandı!', 'success');
    } catch (err) {
        console.error('Failed to copy: ', err);
        showToast('Kopyalama başarısız.', 'danger');
    }
};

// Toast
const showToast = (message, type = 'primary') => {
    // Create toast container if not exists
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }

    const toastId = 'toast-' + Date.now();
    const html = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        </div>
    `;

    const temp = document.createElement('div');
    temp.innerHTML = html.trim();
    const toastEl = temp.firstChild;
    container.appendChild(toastEl);

    // Auto remove
    setTimeout(() => {
        if (toastEl && toastEl.parentElement) {
            toastEl.remove();
        }
    }, 3000);
};

// Toggle inputs
const toggleInputs = (containerId, disabled) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const inputs = container.querySelectorAll('input, select, textarea');
    inputs.forEach(input => input.disabled = disabled);
};
