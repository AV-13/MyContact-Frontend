import Table from 'react-bootstrap/Table';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ImStarFull, ImStarEmpty } from "react-icons/im";


const ContactDashboard = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => { fetchContacts(); }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contact/all`, { withCredentials: true });
            setContacts(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (e) {
            setContacts([]);
        }
    };

    const toggleFavorite = (contactId) => {
        setFavorites((prev) =>
            prev.includes(contactId)
                ? prev.filter(id => id !== contactId)
                : [...prev, contactId]
        );
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
            <h1>Liste des contacts</h1>
            <Table striped bordered hover style={{ width: 'auto' }}>
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
                        <td><MdEdit size={23} style={{ cursor: 'pointer' }} onClick={() => updateContact(contact._id)}/></td>
                        <td><MdDelete size={23} style={{ cursor: 'pointer', color: "red" }} onClick={() => deleteContact(contact._id)}/></td>
                        <td>
                            {favorites.includes(contact._id) ? (
                                <ImStarFull
                                    size={23}
                                    style={{ color: 'gold', marginRight: '5px', cursor: 'pointer' }}
                                    onClick={() => toggleFavorite(contact._id)}
                                />
                            ) : (
                                <ImStarEmpty
                                    size={23}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleFavorite(contact._id)}
                                />
                            )}
                        </td>

                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant={"primary"} href="/contact">Ajouter un contact</Button>
        </div>
    );
}

export default ContactDashboard;