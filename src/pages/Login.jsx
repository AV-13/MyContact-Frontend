import React, {useState} from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";

const Login = ({setLogged}) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const handleChange = (e) => {
        console.log("form", form, "event: ", e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, form, { withCredentials: true })
            .then(function (response) {
                setLogged(true);
                navigate("/dashboard")
                })
            .catch(function (error) {
            console.log(error);
        });
    }
        return (
            <div className="page">
                <Container className="py-5 px-1">
                    <h1>Login Page</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="email" value={form.email}
                                    onChange={handleChange}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="john.dupont@gmail.com" required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword"
                            value={form.password}
                            onChange={handleChange}>
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control name="password" type="password" placeholder="MdpRobuste7630$*" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Se connecter
                        </Button>
                    </Form>
                </Container>
            </div>

        );
}

export default Login;