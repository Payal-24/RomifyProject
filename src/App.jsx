import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Couches from "./pages/Couches";
import Home from "./pages/Home";
import Items from "./components/Items"; 
import Almirahs from "./pages/Almirahs";
import Chairs from "./pages/Chairs";
import Tables from "./pages/Tables";
import Beds from "./pages/Beds";
import SwingChairs from "./pages/SwingChairs";
import Mirrors from "./pages/Mirrors";
import ArchedMirrors from "./pages/ArchedMirrors";
import CircleMirrors from "./pages/CircleMirrors";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import CartIcon from "./components/CartIcon";
import CrystalChandeliers from "./pages/CrystalChandeliers";
import ModernChandeliers from "./pages/ModernChandeliers";
import TraditionalChandeliers from "./pages/TraditionalChandeliers";
import PendantLights from "./pages/PendantLights";
import DoorMats from "./pages/DoorMats";
import FloorMats from "./pages/FloorMats";
import LShapedCouches from "./pages/LShapedCouches";
import CeramicVases from "./pages/CeramicVases";
import GlassVases from "./pages/GlassVases";
import MetalVases from "./pages/MetalVases";
import DecorativeVases from "./pages/DecorativeVases";
import FlowerVase from "./pages/FlowerVase";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Terms from "./pages/Terms";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import RequireAuth from "./components/RequireAuth";
import RazorpayUPITest from "./pages/RazorpayUPITest";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import usePageTitle from "./hooks/usePageTitle";

// Page Title Wrapper Component
function PageWithTitle({ Component, title }) {
  usePageTitle(title);
  return <Component />;
}

function AppContent() {
  const withAuth = (Component, title) => (
    <RequireAuth>
      <PageWithTitle Component={Component} title={title} />
    </RequireAuth>
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<PageWithTitle Component={Home} title="Romify - Home" />} />
        <Route path="/items" element={withAuth(Items, "Romify - Items")}></Route>
        <Route path="/almirahs" element={withAuth(Almirahs, "Romify - Almirahs")} />
        <Route path="/chairs" element={withAuth(Chairs, "Romify - Chairs")} />
        <Route path="/tables" element={withAuth(Tables, "Romify - Tables")} />
        <Route path="/beds" element={withAuth(Beds, "Romify - Beds")} />
        <Route path="/SwingChairs" element={withAuth(SwingChairs, "Romify - Swing Chairs")} />
        <Route path="/homecentered" element={withAuth(Mirrors, "Romify - Mirrors")} />
        <Route path="/mirrors/arched" element={withAuth(ArchedMirrors, "Romify - Arched Mirrors")} />
        <Route path="/mirrors/circle" element={withAuth(CircleMirrors, "Romify - Circle Mirrors")} />
        <Route path="/chandeliers/crystal" element={withAuth(CrystalChandeliers, "Romify - Crystal Chandeliers")} />
        <Route path="/chandeliers/modern" element={withAuth(ModernChandeliers, "Romify - Modern Chandeliers")} />
        <Route path="/chandeliers/traditional" element={withAuth(TraditionalChandeliers, "Romify - Traditional Chandeliers")} />
        <Route path="/chandeliers/pendant" element={withAuth(PendantLights, "Romify - Pendant Lights")} />
        <Route path="/mats/doormats" element={withAuth(DoorMats, "Romify - Door Mats")} />
        <Route path="/mats/floormats" element={withAuth(FloorMats, "Romify - Floor Mats")} />
        <Route path="/couches" element={withAuth(Couches, "Romify - Couches")} />
        <Route path="/doubleseater" element={withAuth(() => <Couches doubleSeaterOnly={true} />, "Romify - Double Seater Couches")} />
        <Route path="/l-shaped" element={withAuth(LShapedCouches, "Romify - L-Shaped Couches")} />
        <Route path="/ceramicvases" element={withAuth(CeramicVases, "Romify - Ceramic Vases")} />
        <Route path="/glassvases" element={withAuth(GlassVases, "Romify - Glass Vases")} />
        <Route path="/metalvases" element={withAuth(MetalVases, "Romify - Metal Vases")} />
        <Route path="/decorativevases" element={withAuth(DecorativeVases, "Romify - Decorative Vases")} />
        <Route path="/flowervase" element={withAuth(FlowerVase, "Romify - Flower Vase")} />
        <Route path="/cart" element={withAuth(Cart, "Romify - Shopping Cart")} />
        <Route path="/checkout" element={withAuth(Checkout, "Romify - Checkout")} />
        <Route path="/order-confirmation" element={withAuth(OrderConfirmation, "Romify - Order Confirmation")} />
        <Route path="/contact" element={<PageWithTitle Component={Contact} title="Romify - Contact Us" />} />
        <Route path="/login" element={<PageWithTitle Component={Login} title="Romify - Login" />} />
        <Route path="/signup" element={<PageWithTitle Component={SignUp} title="Romify - Sign Up" />} />
        <Route path="/terms" element={<PageWithTitle Component={Terms} title="Romify - Terms" />} />
        <Route path="/razorpay-test" element={<PageWithTitle Component={RazorpayUPITest} title="Romify - Razorpay UPI Test" />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
