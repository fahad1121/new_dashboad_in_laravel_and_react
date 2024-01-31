import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api.js';
import Header from "./dashboard/partials/Header";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', formData);
            console.log(response.data.access_token);
            if(response.data.access_token){
                localStorage.setItem('access_token',response.data.access_token);
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Login
                        </Button>
                    </Form>
                    <p className="mt-3">
                        Don't have an account?{' '}
                        <Link to="/register">Register here</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
