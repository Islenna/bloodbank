import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate as navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import UserList from './components/LogAndReg/UserList';
import InventoryList from './components/Inventory/InventoryList';
import InventoryForm from './components/Inventory/InventoryForm';
import InventoryCard from './components/Inventory/InventoryCard';
import InventoryEdit from './components/Inventory/InventoryEdit';
import InventoryConsume from './components/Inventory/InventoryConsume';
import BloodFinder from './components/BloodFinder';
import ConsumedList from './components/Consumed/ConsumedList';
import ConsumedCard from './components/Consumed/ConsumedCard';
import Reg from './components/LogAndReg/Reg';
import Log from './components/LogAndReg/Log';
import CustomNavbar from './components/Header/CustomNavbar';
import Footer from './components/Footer/Footer'
import Suggestions from './components/Suggestions/Suggestions';
import Contact from './components/Footer/FooterButtons/Contact';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

function App() {



  return (
    <div>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/bloodfinder" element={<BloodFinder />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/inventory/new" element={<InventoryForm />} />
        <Route path="/inventory/:id" element={<InventoryCard />} />
        <Route path="/inventory/edit/:id" element={<InventoryEdit />} />
        <Route path="/inventory/:id/consume" element={<InventoryConsume />} />
        <Route path="/inventory/consumed" element={<ConsumedList />} />
        <Route path="/consumed/:id" element={<ConsumedCard />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ToastContainer />
      <Footer />

    </div>
  );
}

export default App;
