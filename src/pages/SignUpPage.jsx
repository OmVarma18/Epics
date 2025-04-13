import React from "react";
import { SignUp } from "@clerk/clerk-react";
import "../css/SignUp.css"; // Import custom CSS

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <SignUp routing="path" path="/signup" />
      </div>
    </div>
  );
};

export default SignUpPage;
