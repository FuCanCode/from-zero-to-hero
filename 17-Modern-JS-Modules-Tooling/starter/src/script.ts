/* import {
  addToCart,
  cart,
  totalPrice as price,
  totalQuantity as q,
} from './shoppingCart.js';

import * as ShoppingCart from './shoppingCart.js';

import anyName from './shoppingCart.js';

console.log('Importing module');

addToCart('Dildo Deluxe', 23);

ShoppingCart.addToCart('Eimer voll Hass', 5);

console.log(...cart, price, q, ShoppingCart.shippingCost);

anyName('Bier', 12);

*/

import addToCart from './shoppingCart.js';

addToCart('Flutschi', 8);

////// Top-level await
console.time('x');
const whyNot = fetch('https://jsonplaceholder.typicode.com/todos').then(
  response => response.json()
);
console.log(whyNot);
const waited = await whyNot;
console.log(waited);
console.timeEnd('x');

interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  completeted: boolean;
}

const getLastPost = async function () {
  const stream = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: IPost[] = await stream.json();

  return { title: posts.at(-1)?.title, text: posts.at(-1)?.body };
};
console.log((await getLastPost()).text);
