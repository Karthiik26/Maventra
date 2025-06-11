import React from "react";
import Navbar from "../Components/Navbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <div className="mt-4 px-4">{children}</div>
  </>
);

export default MainLayout;
