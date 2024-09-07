import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
