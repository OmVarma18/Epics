import React from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import "../css/NavBar.css"; // ✅ Import CSS

const NavBar = () => {
  const { isSignedIn } = useUser(); // 🔥 Check if user is signed in

  return (
    <nav className="navbar">
      <h1>MyApp</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        {isSignedIn && <Link to="/marketplace">Marketplace</Link>} {/* ✅ Show only if logged in */}
        {isSignedIn && <Link to="/dashboard">Predict</Link>}
        
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" /> // ✅ Show logout button
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
