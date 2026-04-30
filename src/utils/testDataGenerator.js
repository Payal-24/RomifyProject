// Test data generator for Romify Admin Dashboard
// This file helps generate sample orders for testing the admin dashboard

import { createOrder } from "./orderUtils";

export const generateTestOrders = (count = 5) => {
  const testProducts = [
    { name: "Classic Wooden Chair", category: "Chairs", price: 2499 },
    { name: "Modern Black Chair", category: "Chairs", price: 3199 },
    { name: "Marble Dining Table", category: "Tables", price: 15999 },
    { name: "King Size Bed", category: "Beds", price: 45000 },
    { name: "L-Shaped Couch", category: "Couches", price: 35000 },
    { name: "Arched Mirror", category: "Mirrors", price: 5999 },
    { name: "Crystal Chandelier", category: "Chandeliers", price: 12000 },
    { name: "Ceramic Vase", category: "Vases", price: 1200 },
  ];

  const customerNames = [
    "Rajesh Kumar",
    "Priya Singh",
    "Amit Patel",
    "Neha Sharma",
    "Vikram Verma",
    "Anjali Gupta",
    "Arjun Malhotra",
    "Deepika Mishra"
  ];

  const customerEmails = [
    "rajesh@email.com",
    "priya@email.com",
    "amit@email.com",
    "neha@email.com",
    "vikram@email.com",
    "anjali@email.com",
    "arjun@email.com",
    "deepika@email.com"
  ];

  const orders = [];

  for (let i = 0; i < count; i++) {
    // Random number of items per order (1-3)
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let totalAmount = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = testProducts[Math.floor(Math.random() * testProducts.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      items.push({
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: quantity
      });
      
      totalAmount += product.price * quantity;
    }

    const customerIndex = i % customerNames.length;
    const order = {
      id: "ORD-" + (Date.now() + i),
      items: items,
      totalAmount: totalAmount,
      customerName: customerNames[customerIndex],
      customerEmail: customerEmails[customerIndex],
      customerPhone: "98" + String(Math.floor(Math.random() * 100000000)).padStart(8, '0'),
      status: i % 3 === 0 ? "Completed" : "Pending",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      notes: "Sample order for testing"
    };

    orders.push(order);
  }

  return orders;
};

export const seedTestOrders = (count = 5) => {
  const testOrders = generateTestOrders(count);
  localStorage.setItem("romify_orders", JSON.stringify(testOrders));
  console.log(`Created ${count} test orders in localStorage`);
  return testOrders;
};

export const clearAllOrders = () => {
  localStorage.removeItem("romify_orders");
  console.log("All orders cleared");
};

export const clearAllProducts = () => {
  localStorage.removeItem("romify_products");
  console.log("All products cleared");
};

export const resetDashboard = () => {
  clearAllOrders();
  clearAllProducts();
  console.log("Dashboard reset - all data cleared");
};

// How to use:
// 1. Create 10 test orders:
//    import { seedTestOrders } from "./testDataGenerator";
//    seedTestOrders(10);
//
// 2. Clear all orders:
//    import { clearAllOrders } from "./testDataGenerator";
//    clearAllOrders();
//
// 3. Reset everything:
//    import { resetDashboard } from "./testDataGenerator";
//    resetDashboard();
