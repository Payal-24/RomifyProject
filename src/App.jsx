import Cart from "./pages/Cart";
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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import usePageTitle from "./hooks/usePageTitle";

// Page Title Wrapper Component
function PageWithTitle({ Component, title }) {
  usePageTitle(title);
  return <Component />;
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageWithTitle Component={Home} title="Romify - Home" />} />
        <Route path="/items" element={<PageWithTitle Component={Items} title="Romify - Items" />}></Route>
        <Route path="/almirahs" element={<PageWithTitle Component={Almirahs} title="Romify - Almirahs" />} />
        <Route path="/chairs" element={<PageWithTitle Component={Chairs} title="Romify - Chairs" />} />
        <Route path="/tables" element={<PageWithTitle Component={Tables} title="Romify - Tables" />} />
        <Route path="/beds" element={<PageWithTitle Component={Beds} title="Romify - Beds" />} />
        <Route path="/SwingChairs" element={<PageWithTitle Component={SwingChairs} title="Romify - Swing Chairs" />} />
        <Route path="/homecentered" element={<PageWithTitle Component={Mirrors} title="Romify - Mirrors" />} />
        <Route path="/mirrors/arched" element={<PageWithTitle Component={ArchedMirrors} title="Romify - Arched Mirrors" />} />
        <Route path="/mirrors/circle" element={<PageWithTitle Component={CircleMirrors} title="Romify - Circle Mirrors" />} />
        <Route path="/chandeliers/crystal" element={<PageWithTitle Component={CrystalChandeliers} title="Romify - Crystal Chandeliers" />} />
        <Route path="/chandeliers/modern" element={<PageWithTitle Component={ModernChandeliers} title="Romify - Modern Chandeliers" />} />
        <Route path="/chandeliers/traditional" element={<PageWithTitle Component={TraditionalChandeliers} title="Romify - Traditional Chandeliers" />} />
        <Route path="/chandeliers/pendant" element={<PageWithTitle Component={PendantLights} title="Romify - Pendant Lights" />} />
        <Route path="/mats/doormats" element={<PageWithTitle Component={DoorMats} title="Romify - Door Mats" />} />
        <Route path="/mats/floormats" element={<PageWithTitle Component={FloorMats} title="Romify - Floor Mats" />} />
        <Route path="/couches" element={<PageWithTitle Component={Couches} title="Romify - Couches" />} />
        <Route path="/doubleseater" element={<PageWithTitle Component={() => <Couches doubleSeaterOnly={true} />} title="Romify - Double Seater Couches" />} />
        <Route path="/l-shaped" element={<PageWithTitle Component={LShapedCouches} title="Romify - L-Shaped Couches" />} />
        <Route path="/ceramicvases" element={<PageWithTitle Component={CeramicVases} title="Romify - Ceramic Vases" />} />
        <Route path="/glassvases" element={<PageWithTitle Component={GlassVases} title="Romify - Glass Vases" />} />
        <Route path="/metalvases" element={<PageWithTitle Component={MetalVases} title="Romify - Metal Vases" />} />
        <Route path="/decorativevases" element={<PageWithTitle Component={DecorativeVases} title="Romify - Decorative Vases" />} />
        <Route path="/flowervase" element={<PageWithTitle Component={FlowerVase} title="Romify - Flower Vase" />} />
        <Route path="/cart" element={<PageWithTitle Component={Cart} title="Romify - Shopping Cart" />} />
        <Route path="/contact" element={<PageWithTitle Component={Contact} title="Romify - Contact Us" />} />
        <Route path="/login" element={<PageWithTitle Component={Login} title="Romify - Login" />} />
        <Route path="/signup" element={<PageWithTitle Component={SignUp} title="Romify - Sign Up" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
