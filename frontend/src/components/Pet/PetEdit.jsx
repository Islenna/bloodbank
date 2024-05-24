import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PetEdit = () => {
    const [pet, setPet] = useState({});
    const [owner, setOwner] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`, { withCredentials: true })
            .then((res) => {
                setPet(res.data);
                return axios.get(`http://localhost:8000/api/owners/${res.data.owner}`, { withCredentials: true });
            })
            .then((res) => {
                setOwner(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Perform validation based on petType and bloodType
        if (
            (pet.petType === 'dog' || pet.petType === 'canine') &&
            (pet.bloodType !== 'DEA 1.1 Positive' && pet.bloodType !== 'DEA 1.1 Negative')
        ) {
            console.log('Invalid blood type for the selected pet type');
            return;
        } else if (
            (pet.petType === 'cat' || pet.petType === 'feline') &&
            (pet.bloodType !== 'A' && pet.bloodType !== 'B' && pet.bloodType !== 'AB')
        ) {
            console.log('Invalid blood type for the selected pet type');
            return;
        }

        axios
            .put(`http://localhost:8000/api/pets/${id}`, pet, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate(`/pets/${id}`);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value });
    };

    return (
        <div>
        <Container className="text-center">
            <h1>Edit {pet.petName}'s Information</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
            >
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="formPetName">
                    <Form.Label style={{ color: 'white' }}>Pet Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="petName"
                        value={pet.petName || ''}
                        onChange={handleChange}
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </Form.Group>
                <Form.Group controlId="formPetType">
                    <Form.Label style={{ color: 'white' }}>Pet Type:</Form.Label>
                    <Form.Control
                        as="select"
                        name="petType"
                        value={pet.petType}
                        onChange={handleChange}
                        style={{ backgroundColor: 'white', color: 'black' }}
                    >
                        <option value="">Select a pet type</option>
                        <option value="dog">Canine</option>
                        <option value="cat">Feline</option>
                    </Form.Control>
                </Form.Group>
                {pet.petType && (
                    <>
                        <Form.Group controlId="formBloodType">
                            <Form.Label style={{ color: 'white' }}>Blood Type:</Form.Label>
                            <Form.Control
                                as="select"
                                name="bloodType"
                                value={pet.bloodType || ''}
                                onChange={handleChange}
                                style={{ backgroundColor: 'white', color: 'black' }}
                            >
                                <option value="">Select a blood type</option>
                                {pet.petType === 'dog' || pet.petType === 'canine' ? (
                                    <>
                                        <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                        <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                    </>
                                ) : pet.petType === 'cat' || pet.petType === 'feline' ? (
                                    <>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                    </>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formLastDonated">
                            <Form.Label style={{ color: 'white' }}>Last Donated:</Form.Label>
                            <Form.Control
                                type="date"
                                name="lastDonated"
                                value={pet.lastDonated || ''}
                                onChange={handleChange}
                                style={{ backgroundColor: 'white', color: 'black' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLabworkStatus">
                            <Form.Label style={{ color: 'white' }}>Labwork Status:</Form.Label>
                            <Form.Control
                                as="select"
                                name="labworkStatus"
                                value={pet.labworkStatus || ''}
                                onChange={handleChange}
                                style={{ backgroundColor: 'white', color: 'black' }}
                            >
                                <option value="">Select a labwork status</option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Pending">Pending</option>
                                <option value="Complete">Complete</option>
                            </Form.Control>
                        </Form.Group>
                        {pet.labworkStatus === 'Complete' && (
                            <Form.Group controlId="formDateLabworkCompleted">
                                <Form.Label style={{ color: 'white' }}>Date Labwork Completed:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateLabworkCompleted"
                                    value={pet.dateLabworkCompleted || ''}
                                    onChange={handleChange}
                                    style={{ backgroundColor: 'white', color: 'black' }}
                                />
                            </Form.Group>
                        )}
                    </>
                )}
                <Form.Group controlId="formPetDescription">
                    <Form.Label style={{ color: 'white' }}>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        name="petDescription"
                        value={pet.petDescription || ''}
                        onChange={handleChange}
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
            <Link to={`/owners/${owner._id}`} style={{ color: 'white', textDecoration: 'none' }}>Back</Link>
            </Card>
        </Container>
        </div>
    );
};

export default PetEdit;
