'use strict';

///////////////////////////////////////
// SECTION Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// !SECTION

///////////////////////////////////////
// SECTION Lectures

//ANCHOR - Selecting, creating and deleting elements
// Selecting
console.log(document.documentElement); // whole doc, doesn't need a selector
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); // "Nodelist", but static
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // returns HTML-Collection and is dynamically
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = '🍪 Cookies are yummy! 🍪';
message.innerHTML =
  '🍪 Cookies are yummy! 🍪 <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);
// header.append(message); // the first one will vanish when placing the second

// header.append(message.cloneNode(true)); // clone to use element again

// header.before();
// header.after();

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove(); // quite new method for removing
  // message.parentElement.removeChild(message); // the (weird) legacy way
});
