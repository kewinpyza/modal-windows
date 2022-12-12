'use strict';

const body = document.querySelector('body');
const showModalButtons = document.querySelectorAll('.btn-show');
const showWarning = document.querySelector('.modal-warning');
const showError = document.querySelector('.modal-error');
const showDefault = document.querySelector('.modal-default');
const overlay = document.querySelector('.overlay');

// Buttons effect
showModalButtons.forEach(btn =>
  btn.addEventListener('click', e => {
    let x = e.clientX - e.target.offsetLeft;
    console.log(x);
    let y = e.clientY - e.target.offsetTop;
    console.log(y);

    const spanEffect = document.createElement('span');
    spanEffect.style.left = x + 'px';
    spanEffect.style.top = y + 'px';

    btn.append(spanEffect);
  })
);

// Modal displaying
const modal = (obj = {}) => {
  return `
    <div tabindex="5" class="modal-window">
      <button class="btn closer">&times;</button>
      <p class="modal-title ${obj.type || 'info'}">
        <i class="icon fa-solid fa-${obj.icon || 'circle-info'}"></i>
        ${obj.title || 'Are your sure you want to cancel?'}
      </p>
      <p class="modal-description">
        ${
          obj.description ||
          "Your action has not been submitted yet. Any information you've entered will not be saved if you cancel."
        }
      </p>
      <div class="modal-buttons">
        <button class="modal-btn modal-accept">${
          obj.acceptBtn || 'Yes, cancel'
        }</button>
        <button class="modal-btn modal-reject">${
          obj.rejectBtn || 'No, continue'
        }</button>
      </div>
    </div>
    `;
};

const createModal = objValues => {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modalContainer.innerHTML = modal(objValues);
  document.body.append(modalContainer);
  const selectModalContainer = document.querySelector('.modal-container');
  const closeModal = () => {
    selectModalContainer.remove();
    document.body.style.overflow = 'auto';
    overlay.classList.add('hidden');
  };

  const closeIcon = document.querySelector('.closer');
  closeIcon.addEventListener('click', () => {
    closeModal();
  });

  const modalButtons = document.querySelectorAll('.modal-btn');
  modalButtons.forEach(btn =>
    btn.addEventListener('click', () => {
      closeModal();
    })
  );

  const selectModalWindow = document.querySelector('.modal-window');
  selectModalWindow.focus();
  selectModalWindow.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      console.log('Elo');
      closeModal();
    }
  });

  overlay.addEventListener('click', () => {
    closeModal();
  });

  document.body.style.overflow = 'hidden';
};

const displayWarningModal = () => {
  setTimeout(() => {
    createModal({
      type: 'warning',
      icon: 'triangle-exclamation',
      title: 'Warning! Are you sure?',
      description:
        'Unsaved changes may be lost. Click "Accept" to confirm or "Close" if you do not want to do any changes.',
      acceptBtn: 'Accept',
      rejectBtn: 'Close',
    });
    overlay.classList.remove('hidden');
  }, 400);
};

const displayErrorModal = () => {
  setTimeout(() => {
    createModal({
      type: 'danger',
      icon: 'circle-exclamation',
      title: "Error! You can't do this!",
      description:
        'Sorry. Your command cannot be fulfilled. For more info, you can contact our Helpdesk if the problem persists.',
      acceptBtn: 'Ok',
      rejectBtn: 'Reject',
    });
    overlay.classList.remove('hidden');
  }, 400);
};

const displayDefaultModal = () => {
  setTimeout(() => {
    createModal();
    overlay.classList.remove('hidden');
  }, 400);
};

showWarning.addEventListener('click', displayWarningModal);
showError.addEventListener('click', displayErrorModal);
showDefault.addEventListener('click', displayDefaultModal);
