import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import Layout from "./Layout";
import api from "../../api";
import {useNavigate} from "react-router-dom";

const UserSetting = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const formData = {
                currentPassword,
                newPassword,
            };

            const response = await api.post('update-user-password', formData);
            console.log(response);
            if(response.data.success == true){
                alert(response.data.message);
                navigate('/home');
            }
            else{
                alert(response.data.message);
            }
            console.log('Password updated successfully:', response.data);
        } catch (error) {
            alert(error.response.data.message);
            console.log("error:"+error);
        }
    };

    return (
        <Layout>
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Change Password</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="currentPassword" className="mb-3">
                            <Form.Label>Current Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="newPassword" className="mb-3">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mb-3">
                            <Form.Label>Confirm New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Change Password
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </Layout>
    )
}

export default UserSetting;