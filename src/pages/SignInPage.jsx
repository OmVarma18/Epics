import React, { useEffect } from "react";
import { useUser, SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import '../css/Signin.css'

const SignInPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard", { replace: true }); // ✅ Redirect to dashboard
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isLoaded) return <p>Loading...</p>; // Prevents flashing before Clerk loads

  return (
    <div className="signin-container">
      <SignIn forceRedirectUrl="/dashboard" /> {/* ✅ Explicit redirect */}
    </div>
  );
};

export default SignInPage;
