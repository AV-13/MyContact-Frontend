import React, {useState} from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

const Contact  = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", telephone: "", nom: "", prenom: "", adresse: "" });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contact/create`, form, { withCredentials: true })
            .then(function (response) {
                console.log(response.data.message);
                navigate('/dashboard');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="page">
            <h1>Create contact Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email" value={form.email}
                            onChange={handleChange}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="john.dupont@gmail.com" required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName"
                            value={form.prenom}
                            onChange={handleChange}>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control name="prenom" type="text" placeholder="John" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName"
                            value={form.nom}
                            onChange={handleChange}>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control name="nom" type="text" placeholder="Doe" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTelephone"
                            value={form.telephone}
                            onChange={handleChange}>
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control name="telephone" type="text" placeholder="01 02 03 04 05" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAdresse"
                            value={form.adresse}
                            onChange={handleChange}>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control name="adresse" type="text" placeholder="1 rue de la paix" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Créer le contact
                </Button>
            </Form>
        </div>
    );
}

export default Contact;