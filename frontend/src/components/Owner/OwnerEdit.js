import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Update = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [homeClinic, setHomeClinic] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phoneNumber);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/owners/${id}`, { withCredentials: true })
            .then((res) => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setPhoneNumber(res.data.phoneNumber);
                setEmail(res.data.email);
                setHomeClinic(res.data.homeClinic)
            })
            .catch((err) => console.log(err));
    }, [id]);

    const updateOwner = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError('Invalid phone number');
            return;
        }

        axios
            .put(`http://localhost:8000/api/owners/${id}`, {
                firstName,
                lastName,
                phoneNumber,
                email,
                homeClinic
            }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate(`/owners/${id}`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
        <Container className="text-center">
            <h1>Update an Owner</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
            >
            <Form onSubmit={updateOwner}>
                <Form.Group controlId="formFirstName">
                    <Form.Label style={{ color: 'white' }}>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label style={{ color: 'white' }}>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label style={{ color: 'white' }}>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </Form.Group>
                <Form.Group controlId="homeClinic">
                    <Form.Label className="d-block" style={{ color: 'white' }}>Home Clinic</Form.Label>
                    <Form.Control
                        as="select"
                        value={homeClinic}
                        onChange={(e) => setHomeClinic(e.target.value)}
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                        >
                    <option value="">Please select your home clinic.</option>
                    <option value="Concord">Concord</option>
                    <option value="Campbell">Campbell</option>
                    <option value="Dublin">Dublin</option>
                    <option value="Redwood City">Redwood City</option>
                    <option value="San Francisco">San Francisco</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
            <Link to={`/owners`} style={{ color: 'white', textDecoration: 'none' }}>Back</Link>
            </Card>
        </Container>
        </div>
    );
};

export default Update;
