import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import {useParams, useSearchParams} from "react-router";

const UpdateContact  = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", telephone: "", nom: "", prenom: "", adresse: "" });
    const handleChange = (e) => {
        console.log("handleChange ", form);
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    useEffect(() => { fetchContact(); }, []);
    console.log("id : ", contactId);
    const fetchContact = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contact/getContact/${contactId}`, { withCredentials: true });
            console.log("res : ", res.data.data);
            setForm(res.data.data);
            console.log("form : ", form);
        } catch (e) {
            console.log("catch error");
            setForm({ email: "", telephone: "", nom: "", prenom: "", adresse: "" });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        form._id = contactId
        console.log("form to submit: ", form);
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/contact/update`, form, { withCredentials: true })
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
            <h1>Modifier un contact</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email" value={form.email}
                            onChange={handleChange}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="john.dupont@gmail.com" required value={form.email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName"
                            value={form.prenom}
                            onChange={handleChange}>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control name="prenom" type="text" placeholder="John" required value={form.prenom} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName"
                            value={form.nom}
                            onChange={handleChange}>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control name="nom" type="text" placeholder="Doe" required value={form.nom} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTelephone"
                            value={form.telephone}
                            onChange={handleChange}>
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control name="telephone" type="text" placeholder="01 02 03 04 05" value={form.telephone} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAdresse"
                            value={form.adresse}
                            onChange={handleChange}>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control name="adresse" type="text" placeholder="1 rue de la paix" value={form.address} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Modifier le contact
                </Button>
            </Form>
        </div>
    );
}

export default UpdateContact;