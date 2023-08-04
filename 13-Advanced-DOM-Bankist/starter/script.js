'use strict';
//SECTION - Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

const header = document.querySelector('header');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const tabComponent = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

//!SECTION

// SECTION Event handler
///////////////////////////////////////
// ANCHOR Modal window

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

//ANCHOR - Scrolling
btnScrollTo.addEventListener('click', e =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

//ANCHOR - Smooth scolling
// possible but bad because uses to much ressources
/* document.querySelectorAll('.nav__link').forEach(e =>
  e.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
); */

// 1. Add listener to common parent element
navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  if (!e.target.classList.contains('nav__link')) return;

  // Matching strategy to ignore clicks somewhere else in the parent element
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

//ANCHOR - Blur unfocused
const focusLink = function (event) {
  // console.log(this);

  // Filters event trigger
  if (event.target.classList.contains('nav__link')) {
    // Selecting Elements
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // Blur elements, filter link
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//ANCHOR - Sticky navigation
// position = start of section1
/* const stickyPosition = section1.getBoundingClientRect().top;
console.log(stickyPosition);
window.addEventListener('scroll', function () {
  if (scrollY >= stickyPosition) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}); */

// Intersection observer API
/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    
  });
};

const obsOptions = { root: null, threshold: [0, 1, 0.2] };

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); */

const size = nav.getBoundingClientRect().height;
console.log(size);
console.log(size / visualViewport.height);
const headerObserver = new IntersectionObserver(
  entries => {
    const [entry] = entries;

    console.log(entry);
    !entry.isIntersecting
      ? nav.classList.add('sticky')
      : nav.classList.remove('sticky');
  },
  { root: null, threshold: 0, rootMargin: `-${size}px` }
);

headerObserver.observe(header);

// Passing "argument" into handler
nav.addEventListener('mouseover', focusLink.bind(0.5));

nav.addEventListener('mouseout', focusLink.bind(1));

//ANCHOR - Tab component
tabComponent.addEventListener('click', function (ev) {
  // Define event in a way that also the inner span-tag handles clicks
  const clicked =
    //ev.target.tagName === 'SPAN' ? ev.target.parentElement : ev.target; // my solution
    ev.target.closest('.operations__tab');
  console.log(clicked.dataset);

  // Guard clause
  if (!clicked) return;

  // set ID
  const id = clicked.dataset.tab;

  // Toggle active buttons
  tabs.forEach(tab => tab.classList.remove(`operations__tab--active`));
  clicked.classList.add('operations__tab--active');

  // Display text by ID and hide other
  tabContents.forEach(div =>
    div.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${id}`)
    .classList.add('operations__content--active');
});

// !SECTION

///////////////////////////////////////
// SECTION Lectures

//ANCHOR - Selecting, creating and deleting elements
// Selecting
// console.log(document.documentElement); // whole doc, doesn't need a selector
// console.log(document.head);
// console.log(document.body);

/* const header = document.querySelector('.header');
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
 */
//ANCHOR - Styles, attributes and classes
// Style
/* message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

console.log(message.style.width); // 120%, because included as inline style in the HTML element
console.log(message.style.height); // nothing, becaus only accesses inline styles written in the HTML-Element

console.log(getComputedStyle(message).height); // access resulting styles from the browser

message.style.height = // increase the height based on the current computed height
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

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
logo.className = '3B'; // ...because overwrites all other classes! */

//ANCHOR - Implementing smooth scrolling
/* const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', e => {
  // Gives information about the position of an Element
  const s1coords = section1.getBoundingClientRect();

console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y): ', scrollX, scrollY);
  console.log(
    `Heigt and width of viewport : `,
    visualViewport.width,
    visualViewport.height,
    document.documentElement.clientWidth, // same as above
    document.documentElement.clientHeight
  );
 

  // Scrolling
  // old way
  // window.scroll({ top: s1coords.y + window.scrollY, behavior: 'smooth' });

  //new way
  section1.scrollIntoView({ behavior: 'smooth' });
});
 */
//ANCHOR - type of events and event handlers

// const h1 = document.querySelector('h1');

// const alertH1 = e => {
//   alert('EventListener: Schworbel!');
// };

// // way to go today
// h1.addEventListener('mouseenter', alertH1);

// from the old days
// h1.onmouseenter = e => {
//   alert('MouseEnter: Schworbel!');
// };

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 2000);

//ANCHOR - Event propagation in practice
/* const rdmColor = function () {
  const setRandom = () => Math.floor(Math.random() * 255 + 1);
  return `rgb(${setRandom()}, ${setRandom()}, ${setRandom()})`;
};

document.querySelectorAll('.nav__link').forEach(e =>
  e.addEventListener('click', function (e) {
    this.style.backgroundColor = rdmColor();
    console.log(
      'a-Element changed',
      e.target.tagName + '-Element was the origin',
      'attached to ' + e.currentTarget.tagName
    );
    console.log(e.currentTarget === this);

    //// Stop propagation ////
    e.stopPropagation();
  })
);

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = rdmColor();
  console.log(
    'ul-Element changed',
    e.target.tagName + '-Element was the origin',
    'attached to ' + e.currentTarget.tagName
  );
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = rdmColor();
    console.log(
      'nav-Element changed',
      e.target.tagName + '-Element was the origin'
    );
  },
  true // true: event will be triggered during caption phase,
  //so it changes color on onlick of link element even though itself has stopPropagation
); */

//ANCHOR - DOM-Traversing
/* const h1 = document.querySelector('h1');

// Going downwards: child elements
console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]
h1.firstElementChild.style.color = 'orangered';
h1.lastElementChild.style.color = 'blue';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling); // null
console.log(h1.nextElementSibling); // h4-element

console.log(h1.previousSibling); // #text
console.log(h1.nextSibling); // #text

// to get ALL siblings
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(e => {
  if (e !== h1) e.style.transform = 'scale(0.5)';
}); */
