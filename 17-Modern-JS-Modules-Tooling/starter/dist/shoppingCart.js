"use strict";
console.log('Exporting module');
{
    const shippingCost = 10;
    const cart = [];
    const addToCart = function (product, quantity) {
        cart.push({ product, quantity });
        console.log(`${quantity} ${product} added to Cart.`);
    };
    const totalPrice = 654;
    const totalQuantity = 878;
}
/* export { shippingCost, totalPrice, totalQuantity, cart };

export default function (product: string, quantity: number) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to Cart.`);
} */
