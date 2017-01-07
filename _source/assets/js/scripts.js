/**
 * Variables
 */

// Global selectors
const modal = document.querySelectorAll('.js-modal');
const contact = document.querySelectorAll('.js-contact');

/**
 * Functions
 */

// Toggle contact form
const toggleModal = (e) => {
  e.preventDefault();

  modal.classList.toggle('is-active');
  contact.classList.toggle('is-active');
};


/**
 * Call functions
 */

// Toggle contact form
const openModal = Array.from(document.querySelectorAll('.js-modal-open'));
const closeModal = Array.from(document.querySelectorAll('.js-modal-close'));

openModal.forEach(openModal => openModal.addEventListener('click', toggleModal, false));
closeModal.forEach(closeModal => closeModal.addEventListener('click', toggleModal, false));


