import Layout from "./Layout";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import api from "../../api";

const ArticleSearch = () => {

    const [sources,setSource] = useState([]);
    const [results,setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        category: '',
        source: '',
        date: '',
        keyword: '',
    });

    useEffect(() => {
        try {
            api.get('get-categories-and-sources').then((response) => {
                const categoryAndSourceData = response.data;
                console.log(categoryAndSourceData);
                setSource(categoryAndSourceData.data);
            });
        } catch (error) {
            console.log("Error while fetching Category and sources:", error);
        }
    }, []);

    function filterResult(e){
        e.preventDefault();
        api.post('get-search-results',formData).then((response) => {
            setResult(response.data);
        }).catch((error) => {
            console.log("Error while fetching search results:", error);
        })
            .finally(() => {
                setLoading(false);
            });
    }
    function handleOnChangeValue(e){
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        <Layout>
            <Container>
                <h2 className="text-center mt-5">Search Article</h2>
                <p className="text-center">Search by Category, Source, Date, or Custom Keyword</p>
                <Form onSubmit={filterResult}>
                        <Row className="mb-3">
                        <Col md={6} className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="mr-2">Category</Form.Label>
                                <Form.Select className="form-control" name="category" onChange={handleOnChangeValue}>
                                    <option selected disabled>Select Category</option>
                                    {sources.categories_list?.map((item, index) => (
                                            <option value={item.category_name} key={index}>{item.category_name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="mr-2">Source</Form.Label>
                                <Form.Select className="form-control" name="source" onChange={handleOnChangeValue}>
                                    <option  selected disabled>Select Source</option>
                                    {sources.source_list?.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="mr-2">Date</Form.Label>
                                <Form.Control type="date" name="date" onChange={handleOnChangeValue} />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="mr-2">Keyword</Form.Label>
                                <Form.Control type="text" name="keyword" onChange={handleOnChangeValue} placeholder="Enter title or description" />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Button variant="primary" type="submit" className="float-end">Filter</Button>
                        </Col>
                        </Row>
                    </Form>
                {loading && (
                    <div className="text-center my-3">
                        <Spinner animation="border" variant="primary" />
                        <span className="ml-2">Loading...</span>
                    </div>
                )}
                <Table striped bordered hover className="mt-4">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Source</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Publish Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.data ? (
                        results.data.map((result, index) => (
                            <tr key={index}>
                                <td>{result.title}</td>
                                <td>{result.source.name}</td>
                                <td>{result.source.category_name}</td>
                                <td>{result.author ? result.author : 'No author'}</td>
                                <td>{result.published_at}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No results found</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>
        </Layout>
    );
}

export default ArticleSearch;