import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "../Components/User/Navbar";
import Footer from "../Components/User/Footer";

export default function CustomerLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.roles?.includes("ADMIN")) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-white">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
