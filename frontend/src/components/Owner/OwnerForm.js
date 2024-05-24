import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Container, Form, Button } from 'react-bootstrap';

const OwnerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [homeClinic, setHomeClinic] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateForm = () => {
        const errors = {};

        if (!firstName.trim()) {
            errors.firstName = 'First Name is required';
        }

        if (!lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }

        if (!validateEmail(email)) {
            errors.email = 'Invalid email address';
        }

        if (!validatePhoneNumber(phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number';
        }

        if (!homeClinic) {
            errors.homeClinic = 'Home Clinic is required';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios
            .post('http://localhost:8000/api/owners', {
                firstName,
                lastName,
                phoneNumber,
                email,
                homeClinic,
            }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/owners');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <Container className="text-center">
                <h1>Owner Form</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label className="d-block" style={{ color: 'white' }}>
                                First Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                placeholder="Enter first name"
                                required
                                style={{ backgroundColor: 'white', color: 'black' }}
                            />
                            {formErrors.firstName && (
                                <p style={{ color: 'red' }}>{formErrors.firstName}</p>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label className="d-block" style={{ color: 'white' }}>
                                Last Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                placeholder="Enter last name"
                                required
                                style={{ backgroundColor: 'white', color: 'black' }}
                            />
                            {formErrors.lastName && (
                                <p style={{ color: 'red' }}>{formErrors.lastName}</p>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label className="d-block" style={{ color: 'white' }}>
                                Phone Number
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                placeholder="Enter phone number"
                                required
                                style={{ backgroundColor: 'white', color: 'black' }}
                            />
                            {formErrors.phoneNumber && (
                                <p style={{ color: 'red' }}>{formErrors.phoneNumber}</p>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className="d-block" style={{ color: 'white' }}>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter email"
                                required
                                style={{ backgroundColor: 'white', color: 'black' }}
                            />
                            {formErrors.email && (
                                <p style={{ color: 'red' }}>{formErrors.email}</p>
                            )}
                        </Form.Group>

                        <Form.Group controlId="homeClinic">
                            <Form.Label className="d-block" style={{ color: 'white' }}>
                                Home Clinic
                            </Form.Label>
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
                            {formErrors.homeClinic && (
                                <p style={{ color: 'red' }}>{formErrors.homeClinic}</p>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Link to={`/owners`} style={{ color: 'white', textDecoration: 'none' }}>
                        Back
                    </Link>
                </Card>
            </Container>
        </div>
    );
};

export default OwnerForm;
