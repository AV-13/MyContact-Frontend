import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from "./pages/Contact";
import ContactDashboard from "./pages/ContactDashboard";
import {useEffect, useState} from "react";
import axios from "axios";
import BasicNavbar from "./components/Navbar";
import UpdateContact from "./pages/UpdateContact";

const AppRoutes = ({ logged, setLogged }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setLogged={setLogged}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<ContactDashboard logged={logged} />} />
            <Route path="/contact/update/:contactId" element={<UpdateContact />} />
        </Routes>
    );
}

function App() {
    const [logged, setLogged] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/whoami`, { withCredentials: true })
            .then(() => setLogged(true))
            .catch(() => setLogged(false));
    }, []);
    useEffect(() => {
        document.body.className = darkMode ? "dark-mode" : "";
    }, [darkMode]);
  return (
      <BrowserRouter className="App">
          <BasicNavbar logged={logged} setLogged={setLogged} darkMode={darkMode} setDarkMode={setDarkMode}  />
          <AppRoutes logged={logged} setLogged={setLogged} />
      </BrowserRouter>
  );
}

export default App;
