import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function buildShippingAddress(address = {}) {
  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export async function sendOrderConfirmationEmail(order) {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error(
      "EmailJS configuration is missing. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY."
    );
  }

  const emailParams = {
    // Provide common field names used in templates: 'to_email' and 'recipient_email'
    to_email: order.customerEmail,
    recipient_email: order.customerEmail,
    to_name: order.customerName,
    reply_to: order.customerEmail,
    order_id: order.id,
    order_date: new Date(order.createdAt).toLocaleString(),
    delivery_date: new Date(order.expectedDeliveryDate).toDateString(),
    customer_phone: order.customerPhone,
    shipping_address: buildShippingAddress(order.shippingAddress),
    payment_method: order.paymentDetails?.method || "cod",
    payment_status: order.paymentDetails?.status || "Pending",
    total_amount: order.totalAmount,
    items_summary: order.items.map((item) => `${item.name} x ${item.quantity}`).join(", "),
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    emailParams,
    { publicKey: EMAILJS_PUBLIC_KEY }
  );
}