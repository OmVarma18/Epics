import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import DashboardForm from "../components/DashboardForm";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check `unsafeMetadata.profileCompleted` instead of `publicMetadata`
    const profileCompleted = user?.unsafeMetadata?.profileCompleted || false;

    if (!profileCompleted) {
      navigate("/profile"); // Redirect if profile is incomplete
    }
  }, [user, navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
      <p>Your profile is complete. Enjoy using the platform!</p>
      <DashboardForm />
    </div>
  );
};

export default Dashboard;
