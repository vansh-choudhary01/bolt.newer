import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import { parseXml } from './steps';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Footer from "./components/Footer";
// import "./index.css";

// const App = () => {
//   return (
//     <div className="app">
//       <Navbar />
//       <Hero />
//       <Footer />
//     </div>
//   );
// };

// export default App;
