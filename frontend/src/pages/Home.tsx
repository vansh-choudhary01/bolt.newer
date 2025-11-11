import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wand2 } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export function Home() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (path: string, state?: any) => {
    navigate(path, state);
  };
  return (
    <div className="app">
      <Navbar />
      <Hero handleNavigate={handleNavigate} />
      <Footer />
    </div>
  );
}
