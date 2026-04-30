# Integration Guide - Admin Dashboard with Orders & Analytics

## Overview
The Admin Dashboard now includes full order tracking and analytics. Here's how to integrate it with your website.

---

## 1. How to Create Test Orders

### Quick Test in Browser Console:

```javascript
// 1. Import the test data generator
import { seedTestOrders } from "./src/utils/testDataGenerator";

// 2. Create 10 sample orders
seedTestOrders(10);

// 3. Refresh the admin dashboard to see orders and analytics
```

### Manual Order Creation:

```javascript
import { createOrder } from "./src/utils/orderUtils";

// Create an order from cart items
const cartItems = [
  {
    product: {
      name: "Classic Wooden Chair",
      category: "Chairs",
      price: 2499
    },
    quantity: 2
  }
];

const order = createOrder(cartItems, {
  name: "Customer Name",
  email: "customer@email.com",
  phone: "9876543210",
  notes: "Deliver after 5 PM"
});
```

---

## 2. Integrate with Cart Checkout

### Update Cart.jsx to Create Orders:

```javascript
import { createOrder } from "../utils/orderUtils";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const { cart, dispatch } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    try {
      // Create order with cart items
      const order = createOrder(cart.items, {
        name: user?.name || "Guest",
        email: user?.email || "guest@romify.com",
        phone: "1234567890",
        notes: ""
      });

      console.log("Order created:", order);
      
      // Clear cart after successful order
      dispatch({ type: "CLEAR_CART" });
      
      // Show success message
      alert("Order placed successfully! Order ID: " + order.id);
      
      // Navigate to thank you page or order confirmation
      navigate("/order-confirmation", { state: { order } });
      
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order: " + error.message);
    }
  };

  return (
    // ... your cart UI
    <button onClick={handleCheckout} className="checkout-btn">
      Place Order
    </button>
  );
}
```

---

## 3. Product Data Structure

### Product Object Format:
```javascript
{
  id: 1,
  name: "Classic Wooden Chair",
  category: "Chairs",
  price: 2499,
  image: "/assets/Classic Wooden Chair1.png"
}
```

### Categories Available:
- Chairs
- Tables
- Beds
- Couches
- Mirrors
- Chandeliers
- Vases
- Mats
- Swing Chairs
- Almirahs

---

## 4. Order Object Structure

### Complete Order Schema:
```javascript
{
  id: "ORD-1234567890",
  items: [
    {
      name: "Product Name",
      category: "Category",
      price: 2499,
      quantity: 1,
      image: "/path/to/image.png"
    }
  ],
  totalAmount: 2499,
  customerName: "Customer Name",
  customerEmail: "customer@email.com",
  customerPhone: "9876543210",
  status: "Pending", // or "Completed"
  createdAt: "2024-04-27T10:30:00Z",
  notes: "Additional notes"
}
```

---

## 5. Dashboard Analytics Calculations

### Total Revenue
```
Sum of all order.totalAmount values
```

### Total Orders
```
Count of all orders
```

### Average Order Value
```
Total Revenue / Total Orders
```

### Top Selling Product
```
Product with highest total quantity sold
```

### Category Stats
```
For each category, count total items sold
```

---

## 6. LocalStorage Data Structure

### Products Storage:
```javascript
localStorage.setItem("romify_products", JSON.stringify([
  { id: 1, name: "...", category: "...", price: ... },
  // ...
]));
```

### Orders Storage:
```javascript
localStorage.setItem("romify_orders", JSON.stringify([
  { id: "ORD-...", items: [...], totalAmount: ..., ... },
  // ...
]));
```

---

## 7. Testing Scenarios

### Scenario 1: View Dashboard Stats
```
1. Open Admin Dashboard
2. Go to Dashboard tab
3. See all stats calculated from orders
```

### Scenario 2: Test Orders
```
1. Open browser console
2. Run: import { seedTestOrders } from "./src/utils/testDataGenerator"; seedTestOrders(10);
3. Refresh admin page
4. Check Orders tab - 10 orders appear
5. Check Analytics - stats are calculated
```

### Scenario 3: Create Real Order
```
1. Log in as customer
2. Add items to cart
3. Checkout (if integrated)
4. Go to Admin Dashboard
5. New order appears in Orders tab
```

### Scenario 4: Update Order Status
```
1. Go to Orders tab
2. Click "Mark Complete" on a Pending order
3. Status changes to Completed
4. Refresh dashboard - revenue is updated
```

---

## 8. Admin Dashboard API Reference

### useAuth Hook (From AuthContext)
```javascript
const { user, logout } = useAuth();
// user.role === "admin" for admin users
```

### Order Functions (From orderUtils)
```javascript
import {
  createOrder,           // Create new order
  calculateTotal,        // Calculate cart total
  getOrderById,          // Fetch specific order
  getAllOrders,          // Get all orders
  updateOrderStatus,     // Update order status
  cancelOrder            // Delete order
} from "./utils/orderUtils";
```

### Test Data Functions (From testDataGenerator)
```javascript
import {
  generateTestOrders,    // Generate random test orders
  seedTestOrders,        // Save test orders to localStorage
  clearAllOrders,        // Delete all orders
  clearAllProducts,      // Delete all products
  resetDashboard         // Reset everything
} from "./utils/testDataGenerator";
```

---

## 9. File Relationships

```
src/
├── data/
│   └── products.js ................. Product catalog & categories
├── utils/
│   ├── orderUtils.js ............... Order management functions
│   └── testDataGenerator.js ........ Test data generation
├── context/
│   ├── AuthContext.jsx ............ Admin authentication
│   └── CartContext.jsx ............ Shopping cart state
├── components/
│   ├── AdminDashboard.jsx ......... Main admin interface
│   ├── AdminDashboard.css ......... Dashboard styling
│   └── Cart.jsx ................... Shopping cart page
└── App.jsx ......................... Routes including /admin
```

---

## 10. Key Features Implemented

✅ **Dashboard Overview**
- Real-time statistics
- Revenue tracking
- Order counting
- Category performance

✅ **Product Management**
- Add products
- Edit product details
- Delete products
- Category-based organization

✅ **Order Management**
- View all orders
- Display order details
- Mark orders complete
- Cancel orders

✅ **Analytics**
- Revenue analytics
- Order insights
- Category breakdown
- Sales statistics

✅ **Data Persistence**
- LocalStorage integration
- Auto-save functionality
- Data recovery on page reload

---

## 11. Next Steps (For Production)

1. **Backend Integration**
   - Replace localStorage with database (MongoDB, PostgreSQL, etc.)
   - Create REST APIs for orders and products
   - Add authentication and authorization

2. **Payment Processing**
   - Integrate Razorpay, Stripe, or PayPal
   - Handle payment confirmations
   - Update order status automatically

3. **Email Notifications**
   - Send order confirmation emails
   - Order status updates
   - Admin notifications for new orders

4. **Reporting**
   - Export reports to CSV/PDF
   - Advanced analytics charts
   - Monthly/yearly summaries

5. **Inventory Management**
   - Track stock levels
   - Low stock alerts
   - Auto-reorder functionality

---

## 12. Quick Commands

### To add test data to dashboard:
```javascript
// In browser console
import { seedTestOrders } from "./src/utils/testDataGenerator";
seedTestOrders(15); // Creates 15 test orders
window.location.reload(); // Refresh to see changes
```

### To clear all data:
```javascript
// In browser console
localStorage.clear();
window.location.reload();
```

---

**Happy Managing! 🎉**
For any issues or questions, refer to the ADMIN_LOGIN_SETUP.md file.