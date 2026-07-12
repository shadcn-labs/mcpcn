// Demo data for Payment category components
// This file contains sample data used for component previews and documentation

import type { OrderItem } from "../types";

// Default order items for OrderSummary
export const demoOrderItems: OrderItem[] = [
  { id: "1", name: "Premium Headphones", price: 199.99, quantity: 1 },
  { id: "2", name: "Wireless Charger", price: 29.99, quantity: 2 },
];

// Default order data for OrderSummary
export const demoOrderData = {
  discount: 25,
  discountCode: "SAVE10",
  items: demoOrderItems,
  shipping: 9.99,
  subtotal: 259.97,
  tax: 21.58,
  total: 266.54,
};

// OrderConfirm component data
export const demoOrderConfirm = {
  deliveryDate: "Jan 20, 2024",
  price: 299,
  productImage: "https://mcpcn.dev/demo/shoe-1.png",
  productName: "Air Force 1 '07",
};

// AmountInput presets
export const demoAmountPresets = [10, 25, 50, 100];

// PaymentConfirmed component data
export const demoPaymentConfirmed = {
  deliveryDate: "Jan 20, 2024",
  price: 299,
  productImage: "https://mcpcn.dev/demo/shoe-1.png",
  productName: "Air Force 1 '07",
};
