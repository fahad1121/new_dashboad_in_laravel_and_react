import Layout from "./Layout";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import api from "../../api";

const PersonalizeNewsFeed = () => {
    const [sources,setSource] = useState([]);
    const [authors,setAuthor] = useState([]);
    const [userPreference,setUserPreference] = useState([]);

    const [formData, setFormData] = useState({
        category: '',
        source: '',
        author:'',
    });

    useEffect(() => {
        try {
            api.get('get-categories-and-sources').then((response) => {
                const categoryAndSourceData = response.data;
                setSource(categoryAndSourceData.data);
            });
        } catch (error) {
            console.log("Error while fetching Category and sources:", error);
        }
    }, []);

    useEffect(() => {
        try {
            api.get('get-author-list').then((response) => {
                const author_list = response.data;
                setAuthor(author_list.data);
            });
        } catch (error) {
            console.log("Error while fetching authors:", error);
        }
    }, []);

    useEffect(() => {
        try {
            api.get('get-user-preference').then((response) => {
                const user_preference = response.data;
                setUserPreference(user_preference.data);
            });
        } catch (error) {
            console.log("Error while fetching authors:", error);
        }
    }, []);
    function handleOnChangeValue(e){
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }
    function saveNewsFeedPreference(e){
        e.preventDefault();
        api.post('save-news-feed-preference', formData)
            .then((response) => {
                if(response.data.success){
                    alert(response.data.data);
                }
            })
            .catch((error) => {
                console.log("Error while saving news feed preference:", error);
            });
    }

    return (
        <Layout>
            <Container>
                <h2 className="text-center mt-5">Personalize Your News Feed</h2>

                <Form onSubmit={saveNewsFeedPreference}>
                    <Row className="mb-3">
                        <Col md={6} className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="mr-2">Select Category</Form.Label>
                                <Form.Select className="form-control" onChange={handleOnChangeValue} name="category">
                                    <option selected disabled>Select Category</option>
                                    {sources.categories_list?.map((item, index) => (
                                        <option value={item.id} key={index} selected={item.id == userPreference.category ? 'selected' : null}>
                                            {item.category_name}-{item.id}
                                        </option>

                                    ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="mr-2">Select Source</Form.Label>
                                <Form.Select className="form-control" onChange={handleOnChangeValue} name="source">
                                    <option  selected disabled>Select Source</option>
                                    {sources.source_list?.map((item, index) => (
                                            <option value={item.id} key={index} selected={item.id == userPreference.source ? 'selected' : null}>{item.name}</option>
                                        )
                                    )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="mr-2">Select Author</Form.Label>
                                <Form.Select className="form-control" onChange={handleOnChangeValue} name="author">
                                    <option  selected disabled>Select Author</option>
                                    {authors.author?.map((item, index) => (
                                            <option value={item.id} key={index} selected={item.id == userPreference.author ? 'selected' : null}>{item.author}-{item.id}</option>
                                        )
                                    )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Button variant="primary" type="submit" className="float-end">Save Settings</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Layout>
    );
}

export default PersonalizeNewsFeed;