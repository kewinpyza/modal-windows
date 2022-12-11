'use strict';

const body = document.querySelector('body');
const showModalButtons = document.querySelector('.btn-show');
const showWarning = document.querySelector('.modal-warning');
const showError = document.querySelector('.modal-error');
const showDefault = document.querySelector('.modal-default');

const modal = (obj = {}) => {
  return `
    <div class="modal-window">
      <button class="btn closer">&times;</button>
      <p class="modal-title ${obj.type || 'info'}">
        <i class="icon fa-solid fa-${obj.icon || 'circle-info'}"></i>
        ${obj.title || 'Are your sure?'}
      </p>
      <p class="modal-description">
        ${
          obj.description || 'Confirm your choice. Unsaved changes may be lost.'
        }
      </p>
      <div class="modal-buttons">
        <button class="modal-accept">${obj.acceptBtn || 'Accept'}</button>
        <button class="modal-reject">${obj.rejectBtn || 'Reject'}</button>
      </div>
    </div>
    `;
};

const createModal = objValues => {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modalContainer.innerHTML = modal(objValues);
  document.body.append(modalContainer);
};

const displayWarningModal = () => {
  createModal({
    type: 'warning',
    icon: 'triangle-exclamation',
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inciduntquidem totam corporis mollitia minima? Soluta facere labore vitae tempora recusandae dolorum ullam explicabo officia consequuntur suscipit dignissimos, vero voluptatibus magnam?',
    acceptBtn: 'Akceptuj',
    rejectBtn: 'Anuluj',
  });
};

const displayErrorModal = () => {
  createModal({
    type: 'danger',
    icon: 'circle-exclamation',
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inciduntquidem totam corporis mollitia minima? Soluta facere labore vitae tempora recusandae dolorum ullam explicabo officia consequuntur suscipit dignissimos, vero voluptatibus magnam?',
    acceptBtn: 'Accept',
    rejectBtn: 'Reject',
  });
};

const displayDefaultModal = () => {
  createModal();
};

showWarning.addEventListener('click', displayWarningModal);
showError.addEventListener('click', displayErrorModal);
showDefault.addEventListener('click', displayDefaultModal);
