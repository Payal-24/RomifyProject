import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEFAULT_PRODUCTS, PRODUCT_CATEGORIES } from "../data/products";
import "./AdminDashboard.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || "change_this_admin_api_key";
const DEFAULT_PRODUCT_IMAGE = "/assets/default-product.png";

const normalizeProduct = (product) => ({
  id: product._id || product.id,
  name: product.title || product.name || "",
  price: Number(product.price) || 0,
  category: product.category || "",
  image: product.images?.[0] || product.image || DEFAULT_PRODUCT_IMAGE,
  description: product.description || "",
});

const buildProductPayload = (product) => ({
  title: product.name?.trim() || product.title?.trim() || "",
  description: product.description?.trim() || "",
  price: Number(product.price) || 0,
  category: product.category?.trim() || "",
  images: product.images?.length ? product.images : [product.image || DEFAULT_PRODUCT_IMAGE],
  stock: Number(product.stock) || 0,
  sku: product.sku?.trim() || "",
  metadata: product.metadata || {},
});

const apiHeaders = {
  "Content-Type": "application/json",
  "x-admin-key": ADMIN_API_KEY,
};

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Products state
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Orders state
  const [orders, setOrders] = useState([]);
  
  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    averageOrderValue: 0,
    topSellingProduct: null,
    categoryStats: {}
  });

  const [isBootstrapped, setIsBootstrapped] = useState(false);

  const loadDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products?limit=100`);
      const data = await response.json();

      if (response.ok && data.success) {
        const normalizedProducts = (data.products || []).map(normalizeProduct);
        setProducts(normalizedProducts);
        localStorage.setItem("romify_products", JSON.stringify(normalizedProducts));
      } else {
        throw new Error(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Load products error:", error);

      const savedProducts = localStorage.getItem("romify_products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(DEFAULT_PRODUCTS);
        localStorage.setItem("romify_products", JSON.stringify(DEFAULT_PRODUCTS));
      }
    }

    const savedOrders = localStorage.getItem("romify_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders([]);
    }

    setIsBootstrapped(true);
  };

  // Load data from localStorage on mount
  useEffect(() => {
    if (loading) return;

    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    loadDashboardData();
  }, [user, navigate, loading]);

  useEffect(() => {
    const syncData = () => loadDashboardData();
    window.addEventListener("focus", syncData);
    window.addEventListener("storage", syncData);

    return () => {
      window.removeEventListener("focus", syncData);
      window.removeEventListener("storage", syncData);
    };
  }, []);

  // Calculate analytics
  const calculateAnalytics = (ordersList) => {
    if (ordersList.length === 0) {
      setAnalytics({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: products.length,
        averageOrderValue: 0,
        topSellingProduct: null,
        categoryStats: {}
      });
      return;
    }

    let totalRevenue = 0;
    let productStats = {};
    let categoryStats = {};

    ordersList.forEach(order => {
      totalRevenue += order.totalAmount;
      
      order.items.forEach(item => {
        productStats[item.name] = (productStats[item.name] || 0) + item.quantity;
        categoryStats[item.category] = (categoryStats[item.category] || 0) + item.quantity;
      });
    });

    const topProduct = Object.entries(productStats).sort((a, b) => b[1] - a[1])[0];

    setAnalytics({
      totalRevenue,
      totalOrders: ordersList.length,
      totalProducts: products.length,
      averageOrderValue: Math.round(totalRevenue / ordersList.length),
      topSellingProduct: topProduct ? topProduct[0] : null,
      categoryStats
    });
  };

  // Update analytics when orders change
  useEffect(() => {
    calculateAnalytics(orders);
  }, [orders, products.length]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify(buildProductPayload(newProduct)),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to add product");
      }

      const createdProduct = normalizeProduct(data.product);
      const updatedProducts = [...products, createdProduct];
      setProducts(updatedProducts);
      localStorage.setItem("romify_products", JSON.stringify(updatedProducts));
      setNewProduct({ name: "", price: "", category: "" });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Add product error:", error);
      alert(error.message || "Product add failed");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
          method: "DELETE",
          headers: apiHeaders,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to delete product");
        }

        const updatedProducts = products.filter((p) => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("romify_products", JSON.stringify(updatedProducts));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Delete product error:", error);
        alert(error.message || "Product delete failed");
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: apiHeaders,
          body: JSON.stringify(buildProductPayload(editingProduct)),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to update product");
        }

        const updatedProduct = normalizeProduct(data.product);
        const updatedProducts = products.map((p) =>
          p.id === editingProduct.id ? updatedProduct : p
        );
        setProducts(updatedProducts);
        localStorage.setItem("romify_products", JSON.stringify(updatedProducts));
        setEditingProduct(null);
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Update product error:", error);
        alert(error.message || "Product update failed");
      }
    }
  };

  const handleCompleteOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: "Completed" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("romify_orders", JSON.stringify(updatedOrders));
    alert("Order marked as completed!");
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem("romify_orders", JSON.stringify(updatedOrders));
      alert("Order cancelled!");
    }
  };

  const handleCreateDemoOrders = () => {
    const demoOrders = [
      {
        id: `ORD-${Date.now()}`,
        items: [
          { name: "Classic Wooden Chair", category: "Chairs", price: 2499, quantity: 2 },
          { name: "Ceramic Vase", category: "Vases", price: 1200, quantity: 1 },
        ],
        totalAmount: 6198,
        customerName: "Riya Malhotra",
        customerEmail: "riya@example.com",
        status: "Pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: `ORD-${Date.now() + 1}`,
        items: [
          { name: "Marble Dining Table", category: "Tables", price: 15999, quantity: 1 },
        ],
        totalAmount: 15999,
        customerName: "Arjun Verma",
        customerEmail: "arjun@example.com",
        status: "Completed",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    const existing = JSON.parse(localStorage.getItem("romify_orders") || "[]");
    const updated = [...existing, ...demoOrders];
    localStorage.setItem("romify_orders", JSON.stringify(updated));
    loadDashboardData();
  };

  const handleSeedProducts = async () => {
    try {
      const currentResponse = await fetch(`${API_BASE_URL}/api/products?limit=100`);
      const currentData = await currentResponse.json();
      const currentProducts = currentResponse.ok && currentData.success ? currentData.products || [] : [];

      await Promise.all(
        currentProducts.map(async (product) => {
          const response = await fetch(`${API_BASE_URL}/api/products/${product._id || product.id}`, {
            method: "DELETE",
            headers: apiHeaders,
          });
          const data = await response.json();
          if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to delete existing products");
          }
        })
      );

      await Promise.all(
        DEFAULT_PRODUCTS.map(async (product) => {
          const response = await fetch(`${API_BASE_URL}/api/products`, {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify({
              title: product.name,
              description: "",
              price: product.price,
              category: product.category,
              images: [product.image],
              stock: 0,
              sku: "",
              metadata: {},
            }),
          });
          const data = await response.json();
          if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to seed default products");
          }
        })
      );

      await loadDashboardData();
    } catch (error) {
      console.error("Seed products error:", error);
      alert(error.message || "Failed to reset products");
    }
  };

  const handleResetDashboardData = async () => {
    localStorage.removeItem("romify_orders");
    await handleSeedProducts();
  };

  if (loading || !isBootstrapped) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-card">
          <h2>Loading Admin Panel...</h2>
          <p>Please wait while dashboard data is loading.</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>🏠 Romify</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            📦 Products ({products.length})
          </button>
          <button
            className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📋 Orders ({orders.length})
          </button>
          <button
            className={`nav-item ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            📈 Analytics
          </button>
        </nav>

        <div className="admin-footer">
          <div className="admin-user-info">
            <p className="admin-user-name">{user?.name}</p>
            <p className="admin-user-email">{user?.email}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* Header */}
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="welcome-msg">Welcome, {user?.name}! 👋</span>
          </div>
        </header>

        {/* Tab Content */}
        <div className="admin-main">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="tab-content">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <h3>Total Revenue</h3>
                  <p className="stat-number">₹{analytics.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <h3>Total Orders</h3>
                  <p className="stat-number">{analytics.totalOrders}</p>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <h3>Total Products</h3>
                  <p className="stat-number">{analytics.totalProducts}</p>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <h3>Avg Order Value</h3>
                  <p className="stat-number">₹{analytics.averageOrderValue.toLocaleString()}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="quick-stat-item">
                  <h4>Top Selling Product</h4>
                  <p>{analytics.topSellingProduct || "No sales yet"}</p>
                </div>
                {orders.length === 0 && (
                  <div className="quick-stat-item">
                    <h4>Orders Setup</h4>
                    <p>No customer orders yet. Create demo orders for preview.</p>
                    <div className="quick-actions-row">
                      <button type="button" className="btn-submit" onClick={handleCreateDemoOrders}>
                        Add Demo Orders
                      </button>
                      <button type="button" className="btn-cancel" onClick={handleSeedProducts}>
                        Reset Products
                      </button>
                    </div>
                  </div>
                )}
                <div className="quick-stat-item">
                  <h4>Admin Data Controls</h4>
                  <p>Use these actions if any tab appears empty.</p>
                  <div className="quick-actions-row">
                    <button type="button" className="btn-submit" onClick={loadDashboardData}>
                      Refresh Data
                    </button>
                    <button type="button" className="btn-cancel" onClick={handleResetDashboardData}>
                      Reset Dashboard
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Performance */}
              {Object.keys(analytics.categoryStats).length > 0 && (
                <div className="category-performance">
                  <h3>Category Performance</h3>
                  <div className="category-list">
                    {Object.entries(analytics.categoryStats).map(([category, count]) => (
                      <div key={category} className="category-item">
                        <span className="category-name">{category}</span>
                        <div className="category-bar">
                          <div 
                            className="category-fill" 
                            style={{
                              width: `${(count / Math.max(...Object.values(analytics.categoryStats))) * 100}%`
                            }}
                          ></div>
                        </div>
                        <span className="category-count">{count} items sold</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="tab-content">
              <h2>Manage Products</h2>

              {/* Add Product Form */}
              <div className="form-section">
                <h3>{editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}</h3>
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="product-form">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      value={editingProduct ? editingProduct.name : newProduct.name}
                      onChange={(e) => {
                        if (editingProduct) {
                          setEditingProduct({ ...editingProduct, name: e.target.value });
                        } else {
                          setNewProduct({ ...newProduct, name: e.target.value });
                        }
                      }}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={editingProduct ? editingProduct.price : newProduct.price}
                      onChange={(e) => {
                        if (editingProduct) {
                          setEditingProduct({ ...editingProduct, price: e.target.value });
                        } else {
                          setNewProduct({ ...newProduct, price: e.target.value });
                        }
                      }}
                      placeholder="Enter price"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={editingProduct ? editingProduct.category : newProduct.category}
                      onChange={(e) => {
                        if (editingProduct) {
                          setEditingProduct({ ...editingProduct, category: e.target.value });
                        } else {
                          setNewProduct({ ...newProduct, category: e.target.value });
                        }
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {PRODUCT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      {editingProduct ? "✅ Update Product" : "➕ Add Product"}
                    </button>
                    {editingProduct && (
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => setEditingProduct(null)}
                      >
                        ❌ Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Products List */}
              <div className="products-section">
                <h3>📋 Product List ({products.length})</h3>
                {products.length === 0 ? (
                  <p className="empty-state">No products added yet</p>
                ) : (
                  <div className="products-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.name}</td>
                            <td><span className="category-badge">{product.category}</span></td>
                            <td className="price-cell">₹{product.price.toLocaleString()}</td>
                            <td className="action-buttons">
                              <button
                                className="btn-edit"
                                onClick={() => handleEditProduct(product)}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="tab-content">
              <h2>Orders Management</h2>
              {orders.length === 0 ? (
                <p className="empty-state">📭 No orders yet. Orders will appear here when customers place them.</p>
              ) : (
                <div className="orders-section">
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <h4>Order #{order.id}</h4>
                          <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                            {order.status || "Pending"}
                          </span>
                        </div>
                        
                        <div className="order-details">
                          <p><strong>Customer:</strong> {order.customerName || "Guest"}</p>
                          <p><strong>Email:</strong> {order.customerEmail || "N/A"}</p>
                          <p><strong>Phone:</strong> {order.customerPhone || "N/A"}</p>
                          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                          <p><strong>Expected Delivery:</strong> {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toDateString() : "N/A"}</p>
                          <p><strong>Total Amount:</strong> ₹{order.totalAmount?.toLocaleString()}</p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {order.shippingAddress?.line1
                              ? `${order.shippingAddress.line1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`
                              : "N/A"}
                          </p>
                          <p><strong>Payment:</strong> {order.paymentDetails?.method?.toUpperCase() || "COD"} ({order.paymentDetails?.status || "Pending"})</p>
                        </div>

                        <div className="order-items">
                          <h5>Items:</h5>
                          <ul>
                            {order.items?.map((item, idx) => (
                              <li key={idx}>
                                {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="order-actions">
                          {order.status !== "Completed" && (
                            <button
                              className="btn-complete"
                              onClick={() => handleCompleteOrder(order.id)}
                            >
                              ✅ Mark Complete
                            </button>
                          )}
                          <button
                            className="btn-cancel-order"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            ❌ Cancel Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="tab-content">
              <h2>📊 Analytics & Reports</h2>
              
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Revenue Summary</h3>
                  <div className="analytics-stat">
                    <span className="label">Total Revenue:</span>
                    <span className="value">₹{analytics.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="analytics-stat">
                    <span className="label">Average Order Value:</span>
                    <span className="value">₹{analytics.averageOrderValue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Order Summary</h3>
                  <div className="analytics-stat">
                    <span className="label">Total Orders:</span>
                    <span className="value">{analytics.totalOrders}</span>
                  </div>
                  <div className="analytics-stat">
                    <span className="label">Avg Items per Order:</span>
                    <span className="value">
                      {analytics.totalOrders > 0 
                        ? (orders.reduce((sum, o) => sum + (o.items?.length || 0), 0) / analytics.totalOrders).toFixed(1)
                        : 0
                      }
                    </span>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Product Summary</h3>
                  <div className="analytics-stat">
                    <span className="label">Total Products:</span>
                    <span className="value">{analytics.totalProducts}</span>
                  </div>
                  <div className="analytics-stat">
                    <span className="label">Avg Price:</span>
                    <span className="value">
                      ₹{products.length > 0 
                        ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString()
                        : 0
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              {Object.keys(analytics.categoryStats).length > 0 && (
                <div className="analytics-breakdown">
                  <h3>Sales by Category</h3>
                  <table className="analytics-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Items Sold</th>
                        <th>% of Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(analytics.categoryStats)
                        .sort((a, b) => b[1] - a[1])
                        .map(([category, count]) => (
                        <tr key={category}>
                          <td>{category}</td>
                          <td>{count}</td>
                          <td>
                            {(count / Object.values(analytics.categoryStats).reduce((a, b) => a + b, 0) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
