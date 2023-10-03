console.log('Exporting module');

type CartContent = {
  product: string;
  quantity: number;
};

const shippingCost = 10;
const cart: CartContent[] = [];

export const addToCart = function (product: string, quantity: number) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to Cart.`);
};

const totalPrice = 654;
const totalQuantity = 878;

export { shippingCost, totalPrice, totalQuantity, cart };

export default function (product: string, quantity: number) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to Cart.`);
}
