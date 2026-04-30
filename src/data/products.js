// Product categories and inventory for Romify
export const PRODUCT_CATEGORIES = [
  "Chairs",
  "Tables",
  "Beds",
  "Couches",
  "Mirrors",
  "Chandeliers",
  "Vases",
  "Mats",
  "Swing Chairs",
  "Almirahs",
];

export const DEFAULT_PRODUCTS = [
  { id: 1, name: "Classic Wooden Chair", category: "Chairs", price: 2499, image: "/assets/Classic Wooden Chair1.png" },
  { id: 2, name: "Modern Black Chair", category: "Chairs", price: 3199, image: "/assets/Modern Black Chair1.png" },
  { id: 3, name: "Marble Dining Table", category: "Tables", price: 15999, image: "/assets/table.png" },
  { id: 4, name: "King Size Bed", category: "Beds", price: 45000, image: "/assets/bed.png" },
  { id: 5, name: "L-Shaped Couch", category: "Couches", price: 35000, image: "/assets/couch.png" },
  { id: 6, name: "Arched Mirror", category: "Mirrors", price: 5999, image: "/assets/mirror.png" },
  { id: 7, name: "Crystal Chandelier", category: "Chandeliers", price: 12000, image: "/assets/chandelier.png" },
  { id: 8, name: "Ceramic Vase", category: "Vases", price: 1200, image: "/assets/vase.png" },
  { id: 9, name: "Door Mat", category: "Mats", price: 800, image: "/assets/mat.png" },
  { id: 10, name: "Swing Chair", category: "Swing Chairs", price: 8999, image: "/assets/swing.png" },
];

export const getProductById = (id) => {
  return DEFAULT_PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (category) => {
  return DEFAULT_PRODUCTS.filter(p => p.category === category);
};
