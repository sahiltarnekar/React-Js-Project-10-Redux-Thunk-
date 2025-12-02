import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <Header />
      <main style={{ marginLeft: 240, marginTop: 70, padding: 20 }}>
        {children}
      </main>
    </>
  );
}

export default Layout;
