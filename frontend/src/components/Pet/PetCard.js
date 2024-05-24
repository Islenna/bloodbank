import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';

export default function PetCard() {
    const [pet, setPet] = useState({});
    const [owner, setOwner] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`, { withCredentials: true })
            .then((res) => {
                setPet(res.data);
                const ownerId = res.data.owner._id;
                const homeClinic = res.data.owner.homeClinic;
                axios
                    .get(`http://localhost:8000/api/owners/${ownerId}`, { withCredentials: true })
                    .then((res) => {
                        setOwner(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [id]);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    return (
        <div>
            <Container className="text-center">
                <h1>{pet.petName}'s Information</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '20px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >
                    <p>Pet Name: {pet.petName}</p>
                    <p>Pet Type: {pet.petType}</p>
                    <p>Description: {pet.petDescription}</p>
                    <p>Blood Type: {pet.bloodType}</p>
                    <p>Home Clinic: {owner.homeClinic}</p>
                    <Link to={`/owners/${owner._id}`}>
                        <Button variant="primary">
                            {owner.firstName} {owner.lastName}
                        </Button>
                    </Link>
                    <p>Last Donated: {pet.lastDonated && formatDate(pet.lastDonated)}</p>
                    <p>Labwork Status: {pet.labworkStatus}</p>
                    <p>Date Labwork Completed: {pet.dateLabworkCompleted && formatDate(pet.dateLabworkCompleted)}</p>
                </Card>
                <Button variant="primary" onClick={() => navigate(`/pets/edit/${id}`)}>
                    Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => navigate(`/pets/delete/${id}`)}>
                    Delete
                </Button>{" "}
                <Button variant="primary" onClick={() => navigate(`/owners`)}>
                    Back
                </Button>{" "}
            </Container>
        </div>
    );
}
