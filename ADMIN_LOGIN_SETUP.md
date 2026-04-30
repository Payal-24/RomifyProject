# Admin Dashboard Setup - Romify 🏠

## Admin Credentials
- Set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD in your local .env file.
- Do not commit those values to GitHub.

---

## How to Access Admin Panel

### Steps:
1. Go to `/login` page
2. Click on **"Admin Login"** tab
3. Enter the admin credentials above
4. Click "Sign In"
5. You'll be redirected to `/admin` dashboard

---

## Admin Dashboard Features

### 1. 📊 Dashboard Tab
**Main Overview of Your Furniture Business**

- **💰 Total Revenue:** Sum of all completed orders
- **📦 Total Orders:** Count of all customer orders
- **📊 Total Products:** Current inventory count
- **📈 Avg Order Value:** Average amount spent per order
- **Top Selling Product:** Most popular furniture item
- **Category Performance:** Visual breakdown of sales by category

### 2. 📦 Products Tab
**Complete Product Management System**

#### ➕ Add New Product
- Product Name (required)
- Price in ₹ (required)
- Category (required) - Choose from:
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

#### 📋 Product List
- View all products in table format
- Edit: Modify product details
- Delete: Remove products from inventory
- Shows category badge and formatted prices

### 3. 📋 Orders Tab
**Track Customer Orders & Manage Sales**

#### Order Cards Display:
- Order ID (Auto-generated)
- Order Status (Pending/Completed)
- Customer Name & Email
- Order Date
- Total Amount
- Items ordered (with quantities)

#### Order Actions:
- ✅ **Mark Complete:** Update order status to completed
- ❌ **Cancel Order:** Remove order from the system

### 4. 📈 Analytics & Reports
**Deep Insights into Your Business**

#### Revenue Summary
- Total Revenue (₹)
- Average Order Value

#### Order Summary
- Total Orders Count
- Average Items per Order

#### Product Summary
- Total Products in Stock
- Average Product Price

#### Sales by Category
- Detailed table showing:
  - Category name
  - Items sold per category
  - Percentage of total sales

---

## Data Storage & Management

### LocalStorage Keys:
- `romify_products` - All furniture products
- `romify_orders` - All customer orders
- `authToken` - Admin authentication token
- `authUser` - Admin user information

### Default Products (Pre-loaded):
The dashboard comes with 10 sample furniture products covering all categories:
- Classic Wooden Chair (₹2,499)
- Modern Black Chair (₹3,199)
- Marble Dining Table (₹15,999)
- King Size Bed (₹45,000)
- L-Shaped Couch (₹35,000)
- Arched Mirror (₹5,999)
- Crystal Chandelier (₹12,000)
- Ceramic Vase (₹1,200)
- Door Mat (₹800)
- Swing Chair (₹8,999)

---

## How Orders Are Created

### For Development/Testing:

Use the order utilities to create test orders:
```javascript
import { createOrder } from "./utils/orderUtils";

const order = createOrder(cartItems, {
  name: "Customer Name",
  email: "customer@email.com",
  phone: "9876543210",
  notes: "Additional notes"
});
```

### Order Object Structure:
```json
{
  "id": "ORD-1234567890",
  "items": [
    {
      "name": "Product Name",
      "category": "Chairs",
      "price": 2499,
      "quantity": 1,
      "image": "/path/to/image.png"
    }
  ],
  "totalAmount": 2499,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "status": "Pending",
  "createdAt": "2024-04-27T10:30:00Z"
}
```

---

## Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| Product Management | ✅ Complete | Add, Edit, Delete products |
| Orders Tracking | ✅ Complete | View all customer orders |
| Analytics & Reports | ✅ Complete | Revenue, sales, category insights |
| Dashboard Stats | ✅ Complete | Real-time business metrics |
| Category Performance | ✅ Complete | Visual sales breakdown |
| Order Status Updates | ✅ Complete | Mark orders complete/cancel |
| Data Persistence | ✅ Complete | Uses localStorage |

---

## Security Notes
- Admin credentials are hardcoded for development purposes
- The admin role is stored in localStorage
- All data persists in browser localStorage
- **For Production:** Implement backend authentication, database, and encryption

---

## Files Created/Modified

### New Files:
1. **src/data/products.js** - Product categories and default inventory
2. **src/utils/orderUtils.js** - Order management functions
3. **src/components/AdminDashboard.jsx** - Complete admin dashboard
4. **src/components/AdminDashboard.css** - Dashboard styling

### Modified Files:
1. **src/context/AuthContext.jsx** - Admin authentication logic
2. **src/components/Login.jsx** - Admin login tab UI
3. **src/components/Login.css** - Admin tab styling
4. **src/App.jsx** - Added `/admin` route

---

## Testing the Dashboard

### Test Scenario 1: Add Products
1. Go to Products tab
2. Fill in product details
3. Select category
4. Click "Add Product"
5. Verify in Products List

### Test Scenario 2: View Analytics
1. Go to Analytics tab
2. See revenue summary
3. Check sales by category table
4. View product statistics

### Test Scenario 3: Manage Orders
1. Create test orders (use orderUtils)
2. Go to Orders tab
3. Mark orders as complete
4. Check updated analytics
5. Cancel orders and verify removal

---

## Tips & Best Practices

✅ **Do's:**
- Regularly check analytics for business insights
- Update products when inventory changes
- Process orders and update their status
- Monitor top-selling categories

❌ **Don'ts:**
- Don't delete products with active orders
- Don't rely on localStorage for persistent data (use backend)
- Don't share admin credentials

---

## Support & Troubleshooting

**Q: Orders not showing?**
A: Orders are created via the orderUtils.createOrder() function. Ensure cart items are properly structured.

**Q: Products disappeared?**
A: Clear browser cache/localStorage. Try refreshing. Data is stored in browser's localStorage.

**Q: Analytics not updating?**
A: Refresh the page or create new orders to update analytics.

---

Happy managing! 🎉
