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

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items/>}></Route>
        <Route path="/almirahs" element={<Almirahs />} />
        <Route path="/chairs" element={<Chairs />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/SwingChairs" element={<SwingChairs />} />
        <Route path="/homecentered" element={<Mirrors />} />
        <Route path="/mirrors/arched" element={<ArchedMirrors />} />
        <Route path="/mirrors/circle" element={<CircleMirrors />} />
        <Route path="/chandeliers/crystal" element={<CrystalChandeliers />} />
        <Route path="/chandeliers/modern" element={<ModernChandeliers />} />
        <Route path="/chandeliers/traditional" element={<TraditionalChandeliers />} />
        <Route path="/chandeliers/pendant" element={<PendantLights />} />
        <Route path="/mats/doormats" element={<DoorMats />} />
        <Route path="/mats/floormats" element={<FloorMats />} />
        <Route path="/couches" element={<Couches />} />
        <Route path="/doubleseater" element={<Couches doubleSeaterOnly={true} />} />
        <Route path="/l-shaped" element={<LShapedCouches />} />
        <Route path="/ceramicvases" element={<CeramicVases />} />
        <Route path="/glassvases" element={<GlassVases />} />
        <Route path="/metalvases" element={<MetalVases />} />
        <Route path="/decorativevases" element={<DecorativeVases />} />
        <Route path="/flowervase" element={<FlowerVase />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
