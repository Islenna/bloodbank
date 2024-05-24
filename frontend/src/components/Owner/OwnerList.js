import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function OwnerList() {
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/owners', { withCredentials: true })
            .then((res) => {
                console.log(res);
                setOwners(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (ownerId) => {
        axios
            .delete(`http://localhost:8000/api/owners/${ownerId}`, { withCredentials: true })
            .then((res) => {
                navigate('/owners');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Container className="text-center">
                <h1>Owner List</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >
                    <table
                        className="table-responsive"
                        style={{
                            width: '75%',
                            margin: '0 auto',
                            backgroundColor: '#725846',
                            tableLayout: 'fixed',
                        }}>
                        <thead>
                            <tr style={{ backgroundColor: '#A9C27E', color: "#000000" }}>
                                <th style={{ padding: '0.5rem' }}>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {owners.map((owner, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{owner.firstName}</td>
                                        <td>{owner.lastName}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <Link to={`/owners/${owner._id}`}>
                                                    <Button variant="success">Details</Button>
                                                </Link>
                                                <Link to={`/owners/edit/${owner._id}`}>
                                                    <Button variant="primary">Edit</Button>
                                                </Link>
                                                <Link to={`/owners/delete/${owner._id}`}>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(owner._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                <Link to={`/owners/new`}>
                    <Button variant="primary">Add Owner</Button>
                </Link>
            </Container>
        </div>
    );
}
