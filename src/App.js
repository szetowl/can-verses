import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Header from "./components/Header"

import './App.css';

function App() {
  return (
    
    <div className="App">
     <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/admin823" element={<Admin />} />
      </Routes>
    </div>
    
  );
}

export default App;
