import Table from 'react-bootstrap/Table';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const ContactDashboard = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([])
    useEffect(() => { fetchContacts(); }, []);
    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contact/all`, { withCredentials: true });
            console.log("res : ", res);
            setContacts(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (e) {
            setContacts([]);
        }
    };

    const updateContact = (contactId) => {
        navigate(`/contact/update/${contactId}`);
    }

    const deleteContact = async (contactId) => {
            console.log(contactId)
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/contact/delete/${contactId}`, { withCredentials: true });
            await fetchContacts();
        } catch(e) {
                console.error(e);
            }
    }
     return (
        <div className="page">
            <h1>Contact Dashboard</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Adresse</th>
                </tr>
                </thead>
                <tbody>
                {contacts && contacts.map((contact) => (
                    <tr key={contact._id}>
                        <td>{contact.nom}</td>
                        <td>{contact.prenom}</td>
                        <td>{contact.telephone}</td>
                        <td>{contact.email}</td>
                        <td>{contact.adresse}</td>
                        <td><MdEdit size={20} onClick={() => updateContact(contact._id)}/></td>
                        <td><MdDelete size={20} onClick={() => deleteContact(contact._id)}/></td>

                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant={"primary"} href="/contact">Ajouter un contact</Button>
        </div>
    );
}

export default ContactDashboard;