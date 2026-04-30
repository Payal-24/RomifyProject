// Order management utilities for Romify
const normalizePrice = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const digits = value.replace(/[^0-9.]/g, "");
    return Number(digits) || 0;
  }
  return 0;
};

export const calculateExpectedDeliveryDate = (baseDate = new Date(), paymentMethod = "cod") => {
  const base = new Date(baseDate);
  const etaDays = paymentMethod === "cod" ? 6 : 4;
  base.setDate(base.getDate() + etaDays);
  return base.toISOString();
};

export const createOrder = (cartItems, customerInfo = {}) => {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const now = new Date();
  const paymentMethod = customerInfo.payment?.method || "cod";
  const expectedDeliveryDate = calculateExpectedDeliveryDate(now, paymentMethod);

  const order = {
    id: "ORD-" + Date.now(),
    items: cartItems.map(item => ({
      name: item.product?.name || item.name,
      category: item.product?.category || item.category || "General",
      price: normalizePrice(item.product?.price || item.price),
      quantity: item.quantity || 1,
      image: item.product?.image
    })),
    totalAmount: calculateTotal(cartItems),
    customerName: customerInfo.name || "Guest",
    customerEmail: customerInfo.email || "not-provided",
    customerPhone: customerInfo.phone || "not-provided",
    shippingAddress: customerInfo.address || {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
    paymentDetails: customerInfo.payment || {
      method: "cod",
      status: "Pending",
    },
    status: "Pending",
    expectedDeliveryDate,
    createdAt: now.toISOString(),
    notes: customerInfo.notes || ""
  };

  // Save to localStorage
  const existingOrders = JSON.parse(localStorage.getItem("romify_orders") || "[]");
  existingOrders.push(order);
  localStorage.setItem("romify_orders", JSON.stringify(existingOrders));

  return order;
};

export const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const price = normalizePrice(item.product?.price || item.price);
    const quantity = item.quantity || 1;
    return total + (price * quantity);
  }, 0);
};

export const getOrderById = (orderId) => {
  const orders = JSON.parse(localStorage.getItem("romify_orders") || "[]");
  return orders.find(order => order.id === orderId);
};

export const getAllOrders = () => {
  return JSON.parse(localStorage.getItem("romify_orders") || "[]");
};

export const updateOrderStatus = (orderId, status) => {
  const orders = JSON.parse(localStorage.getItem("romify_orders") || "[]");
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    localStorage.setItem("romify_orders", JSON.stringify(orders));
    return orders[orderIndex];
  }
  
  throw new Error("Order not found");
};

export const cancelOrder = (orderId) => {
  const orders = JSON.parse(localStorage.getItem("romify_orders") || "[]");
  const filteredOrders = orders.filter(o => o.id !== orderId);
  localStorage.setItem("romify_orders", JSON.stringify(filteredOrders));
};
