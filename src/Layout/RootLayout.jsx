import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {navigation.state === "loading" ? <Spinner /> : <Outlet />}
      </main>

      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default RootLayout;
