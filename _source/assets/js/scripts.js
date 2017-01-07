/**
 * Variables
 */

// Global selectors
const modal = Array.from(document.querySelectorAll('.js-modal'));
const contact = Array.from(document.querySelectorAll('.js-contact'));

/**
 * Functions
 */

// Toggle contact form
const toggleModal = (e) => {
  e.preventDefault();

  modal.forEach(modal => modal.classList.toggle('is-active'));
  contact.forEach(contact => contact.classList.toggle('is-active'));
};


/**
 * Call functions
 */

// Toggle contact form
const openModal = Array.from(document.querySelectorAll('.js-modal-open'));
const closeModal = Array.from(document.querySelectorAll('.js-modal-close'));

openModal.forEach(openModal => openModal.addEventListener('click', toggleModal, false));
closeModal.forEach(closeModal => closeModal.addEventListener('click', toggleModal, false));
