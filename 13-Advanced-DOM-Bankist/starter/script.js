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
// console.log(document.documentElement); // whole doc, doesn't need a selector
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); // "Nodelist", but static
// console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // returns HTML-Collection and is dynamically
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = '🍪 Cookies are yummy! 🍪';
message.innerHTML =
  '🍪 Cookies are yummy! 🍪 <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);
// header.append(message); // the first one will vanish when placing the second

// header.append(message.cloneNode(true)); // clone to use element again

// header.before();
// header.after();

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove(); // quite new method for removing
  // message.parentElement.removeChild(message); // the (weird) legacy way
});

//ANCHOR - Styles, attributes and classes
// Style
message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

console.log(message.style.width); // 120%, because included as inline style in the HTML element
console.log(message.style.height); // nothing, becaus only accesses inline styles written in the HTML-Element

console.log(getComputedStyle(message).height); // access resulting styles from the browser

message.style.height = // increase the height based on the current computed height
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // "Bankist" logo
console.log(logo.backgroundColor); // undefined
console.log(logo.width); // 149
console.log(logo.className); // nav__logo

// set attr
logo.alt = '4 circles overlapsed';

// Non-standart
console.log(logo.designer); // undefined, because no standard
console.log(logo.getAttribute('designer')); // Jonas
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.getAttribute('href')); // #
console.log(link.href); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/index.html#

// Data attributes
console.log(logo.dataset.versionNumber); // 3.0, but very different syntax to the attribut name set in the img

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use
logo.className = '3B'; // ...because overwrites all other classes!
