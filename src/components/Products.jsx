import React from "react";
import "./Products.css";

const products = [
  {
    id: 1,
    name: "Luxury Sofa",
    price: "$1,499",
    image: "/items/sofa.jpg",
  },
  {
    id: 2,
    name: "Classic Armchair",
    price: "$799",
    image: "/items/chair.jpg",
  },
  {
    id: 3,
    name: "Modern Table",
    price: "$599",
    image: "/items/table.jpg",
  },
  {
    id: 4,
    name: "King Bed",
    price: "$1,999",
    image: "/items/bed.jpg",
  },
  {
    id: 5,
    name: "Elegant Cabinet",
    price: "$1,099",
    image: "/items/cabinet.jpg",
  },
  {
    id: 6,
    name: "Minimalist Nightstand",
    price: "$399",
    image: "/items/nightstand.jpg",
  },
  {
    id: 7,
    name: "Wall Mirror",
    price: "$299",
    image: "/items/mirror.jpg",
  },
  {
    id: 8,
    name: "Crystal Chandelier",
    price: "$2,499",
    image: "/items/chandelier.jpg",
  },
  {
    id: 9,
    name: "Decorative Mat",
    price: "$149",
    image: "/items/mat.jpeg",
  },
  {
    id: 10,
    name: "Buddy Couch",
    price: "$1,299",
    image: "/items/couch.jpg",
  },
  {
    id: 11,
    name: "Decorative Vase",
    price: "$199",
    image: "/items/vase.jpg",
  },
];

function Products() {
  return (
    <section className="products furniture-theme">
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Discover our exclusive range of luxury furniture and decor for every room</p>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card furniture-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} className="mini-image" />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button className="add-to-cart-btn furniture-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
