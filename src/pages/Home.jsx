import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Styles from "../components/Styles";
import Products from "../components/Products";
import Items from "../components/Items";
import Contact from "../components/Contact";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useState } from "react";

function Home() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleContactClick = () => {
    setCurrentPage("contact");
  };

  const handleHomeClick = () => {
    setCurrentPage("home");
  };

  const handleLoginClick = () => {
    setCurrentPage("login");
  };

  const handleSignUpClick = () => {
    setCurrentPage("signup");
  };

  const handleLoginSuccess = () => {
    setCurrentPage("home");
  };

  const handleShopClick = () => {
    setCurrentPage("items");
  };

  const handleSignUpSuccess = () => {
    setCurrentPage("home");
  };

  return (
    <>
      <Navbar
        onContactClick={handleContactClick}
        onHomeClick={handleHomeClick}
        onLoginClick={handleLoginClick}
        onShopClick={handleShopClick}
      />
      {currentPage === "home" && (
        <>
          <Hero />
          <Styles />
        </>
      )}
      {currentPage === "contact" && <Contact />}
      {currentPage === "products" && <Products />}
      {currentPage === "items" && <Items />}
      {currentPage === "login" && <Login onLoginSuccess={handleLoginSuccess} onSignUpClick={handleSignUpClick} />}
      {currentPage === "signup" && <SignUp onSignUpSuccess={handleSignUpSuccess} />}
    </>
  );
}

export default Home;
