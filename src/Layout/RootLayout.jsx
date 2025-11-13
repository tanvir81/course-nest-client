import React, { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const RootLayout = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setTheme={setTheme} />
      <main className="flex-1">
        {navigation.state === "loading" ? <Spinner /> : <Outlet />}
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default RootLayout;
