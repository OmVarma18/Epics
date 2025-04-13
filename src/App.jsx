import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import NavBar from "./components/NavBar";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import ProfileForm from "./pages/Form";
import MarketPlace from "./pages/MarketPlace.jsx";
import CheckoutPage from "./pages/Checkout.jsx"; // Updated import
import farmer from "./assets/farmer.jpeg";
import "./css/App.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="overlay">
        <h1>Welcome to Farmers Mart</h1>
      </div>
      <img src={farmer} alt="Farmer" className="farmer-image" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Protect Profile, Dashboard, and Marketplace Routes */}
        <Route path="/profile" element={<SignedIn><ProfileForm /></SignedIn>} />
        <Route path="/dashboard" element={<SignedIn><Dashboard /></SignedIn>} />
        <Route path="/marketplace" element={<SignedIn><MarketPlace /></SignedIn>} />
        <Route path="/checkout" element={<SignedIn><CheckoutPage /></SignedIn>} /> {/* Corrected this route */}

        {/* Redirect to Sign-in if not logged in */}
        <Route path="*" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
