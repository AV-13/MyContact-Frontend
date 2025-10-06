import React from 'react';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const Home = () => {
        return (
            <div className="page">
                <Container className="py-5">
                    <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                        <Col md={8} className="text-center">
                            <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>MyContact</h1>
                            <p className="lead mt-3 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec erat cursus dictum.
                            </p>
                            <Button variant="primary" size="lg" href="/register">
                                Commencer
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md={4} className="text-center">
                            <h4>Gestion simple</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <h4>Sécurité</h4>
                            <p>Nulla facilisi. Etiam euismod, urna eu tincidunt consectetur.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <h4>Accessible partout</h4>
                            <p>Vestibulum ante ipsum primis in faucibus orci luctus et.</p>
                        </Col>
                    </Row>
                </Container>
                <footer className="text-center py-3" style={{ background: '#e9ecef', marginTop: '3rem' }}>
                    <small>Made with ❤️ by <a href={"https://www.github.com/AV-13"} target={"_blank"}>AV-13</a></small>
                </footer>
            </div>
        );
}

export default Home;