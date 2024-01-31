import Layout from "./Layout";
import {Col, Container, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import api from "../../api";
import {Link} from "react-router-dom";

export default function Home() {

    const [articles, setArticle] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        try {
            api.get('get-articles?page='+page).then((response) => {
                const articleData = response.data;
                setArticle(articleData.data);
            });
        } catch (error) {
            console.log("Error while fetching stats:", error);
        }
    }, [page]);

    const fetchNextPrevTasks = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'));
    }

    const renderPaginationLinks = () => {
        return <ul className="pagination">
            {
                articles.links?.map((link,index) => (
                    <li key={index} className="page-item">
                        <a style={{cursor: 'pointer'}} className={`page-link ${link.active ? 'active' : ''}`}
                           onClick={() => fetchNextPrevTasks(link.url)}>
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </a>
                    </li>
                ))
            }
        </ul>
    }
    return (
        <Layout>
            <Container className="mt-5 mb-5">
                <h1 className="mb-5">All News</h1>
                <Row>
                            <Col md={12} className="mb-4">
                                <Table responsive striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Published At</th>
                                        <th>Author</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {articles.data?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Link to={item.url} target="_blank">{item.title}</Link>
                                            </td>
                                            <td>{item.published_at}</td>
                                            <td>{item.author?item.author: 'No Author'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Col>
                    <div className="my-4 d-flex justify-content-between">
                        <div>
                            Showing {articles.from} to {articles.to} from {articles.total} results.
                        </div>
                        <div>
                            {renderPaginationLinks()}
                        </div>
                    </div>
                </Row>
            </Container>
        </Layout>
    );
}