const action = document.getElementById('record-action');
const dialog = document.getElementById('record-dialog');
const feedback = document.getElementById('record-feedback');

action.addEventListener('click', () => {
    dialog.returnValue = '';
    dialog.showModal();
});

dialog.addEventListener('close', () => {
    if (dialog.returnValue !== 'confirm') {
        return;
    }

    if (action.dataset.count) {
        const count = document.getElementById(action.dataset.count);
        action.closest('tr').remove();
        count.textContent = Number(count.textContent) - 1;
    } else {
        const status = document.getElementById('booking-status');
        status.textContent = 'Cancelled';
        status.classList.add('is-cancelled');
        action.hidden = true;
    }

    feedback.hidden = false;
    feedback.textContent = dialog.dataset.success;
    feedback.focus();
});
