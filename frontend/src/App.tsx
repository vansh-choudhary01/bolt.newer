import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default App;
