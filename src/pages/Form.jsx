import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "../css/ProfileForm.css"; // Ensure this file exists

const ProfileForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Get saved user data from Clerk
  const savedData = user?.publicMetadata || {};
  const profileCompleted = savedData.profileCompleted || false;

  // Form fields
  const [farmName, setFarmName] = useState(savedData.farmName || "");
  const [location, setLocation] = useState(savedData.location || "");
  const [phone, setPhone] = useState(savedData.phone || "");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect if Profile is Already Completed
  useEffect(() => {
    if (profileCompleted) {
      console.log("Profile already completed. Redirecting...");
      navigate("/dashboard");
    }
  }, [profileCompleted, navigate]);

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      console.log("Updating profile...");
  
      // ✅ Use `unsafeMetadata` instead of `publicMetadata`
      await user.update({
        unsafeMetadata: {
          profileCompleted: true,
          farmName,
          location,
          phone,
          email,
          FarmSize,
        },
      });
  
      console.log("Profile updated successfully. Redirecting...");
      navigate("/dashboard"); // ✅ Redirect after update
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Complete Your Profile</h2>

        {error && <p className="error-message">{error}</p>} {/* Show error if any */}

        <div className="form-group">
          <label>Farm Name</label>
          <input
            type="text"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Farm Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Farm Size</label>
          <input
            type="text"
            value={FarmSize}
            onChange={(e) => setFarmName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input type="email" value={email} readOnly className="readonly-input" />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
