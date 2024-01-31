import React from 'react';
import {Navbar, Container, Button, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo.png';
import {Link, redirect, useLocation, useNavigate} from "react-router-dom";
import '../../../assets/header.css';
import api from "../../../api";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await api.post('/logout');
        localStorage.removeItem('access_token');
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" className="justify-content-between">
            <Container>
                <Navbar.Brand as={Link} to="/home">
                    <img src={logo} height="30" alt="Logo" loading="lazy"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <Button variant="outline-dark">
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} className={`${location.pathname === '/home' ? 'active_link' : 'in_active'}`} to="/home" exact>Home</Nav.Link>
                        <Nav.Link as={Link} className={`${location.pathname === '/article-search-filter' ? 'active_link' : 'in_active'}`} to="/article-search-filter" exact>Article Search & Filter</Nav.Link>
                        <Nav.Link as={Link} className={`${location.pathname === '/personalize-news-feed' ? 'active_link' : 'in_active'}`} to="/personalize-news-feed" exact>Personalize Feed</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/user-settings">Settings</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
