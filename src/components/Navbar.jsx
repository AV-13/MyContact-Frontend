import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from "react-icons/fa";

const BasicNavbar = ({logged, setLogged, darkMode, setDarkMode}) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, { withCredentials: true })
            .then(function (response) {
                setLogged(false);
                navigate('/');
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    }
    return (
        <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} className="shadow-sm">
        <Container>
                <Navbar.Brand as={NavLink} to="/" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/logo.png" alt="Logo" style={{ height: '32px' }} />
                    <span className="titre-glow">MyContact </span>
                </Navbar.Brand>
                <Nav className="ms-auto" style={{ gap: '1rem' }}>
                    <NavLink to="/" className="nav-link">Accueil</NavLink>
                    {logged ? (
                        <>
                            <NavLink to="/dashboard" className="nav-link">Contacts</NavLink>
                            <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>Déconnexion</span>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link">Connexion</NavLink>
                            <NavLink to="/register" className="nav-link">Inscription</NavLink>
                        </>
                    )}
                </Nav>
            <Nav className="ms-auto" style={{ gap: '1rem' }}>
                <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => setDarkMode(!darkMode)}
                    title={darkMode ? "Mode clair" : "Mode sombre"}
                >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </span>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default BasicNavbar;