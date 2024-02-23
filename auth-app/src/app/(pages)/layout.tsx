"use client"

import { Toaster } from "react-hot-toast";
import AppContext from "@/context/appContext";
import { useState } from "react";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider value={user}>
      <Toaster position="top-center" />
      <h1 className="w-100 text-center text-xl">Header</h1>
      <main>{children}</main>
    </AppContext.Provider>
  );
}

export default ProtectedLayout;