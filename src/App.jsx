// App.jsx (No changes needed, just for reference)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Routing from "../src/Layout/Routing"; // This now imports the new Movie/Genre routes
import Layout from "../src/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "./styles/clean.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
// ... imports

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" theme="colored" />
      <Routes>
        {Routing.map((r, i) => {
          const Component = r.element;
          return (
            <Route
              key={i}
              path={r.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;