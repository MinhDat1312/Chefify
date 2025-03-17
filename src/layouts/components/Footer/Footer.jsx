import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Row>
                <Col md={7}>
                    <Row className="w-75 d-flex flex-column gap-3">
                        <h5 className="fw-bold mb-0">About Us</h5>
                        <p className="mb-0 fw-medium fs-6" style={{ color: '#dee2e8' }}>
                            Welcome to our website, a wonderful place to explore and learn how to
                            <br /> cook like a pro.
                        </p>
                        <Form className={styles.subscribeForm}>
                            <Form.Control type="email" placeholder="Enter your email" />
                            <Button variant="pink">Send</Button>
                        </Form>
                    </Row>
                    <Row className="mt-5">
                        <div className="d-flex gap-3 mt-5">
                            <img src="/src/assets/images/white_chefify.png" />
                            <span style={{ lineHeight: '43px', color: '#dee2e8' }}>2023 Chefify Company</span>
                            <span style={{ lineHeight: '43px', color: '#dee2e8' }}>
                                Terms of Service | Privacy Policy
                            </span>
                        </div>
                    </Row>
                </Col>

                <Col md={5} className="d-flex justify-content-between">
                    <div>
                        <Row>
                            <h5 className="fw-bold mb-0 p-0">Learn More</h5>
                            <ul className={styles.footerLinks}>
                                <li>
                                    <a href="#">Our Cooks</a>
                                </li>
                                <li>
                                    <a href="#">See Our Features</a>
                                </li>
                                <li>
                                    <a href="#">FAQ</a>
                                </li>
                            </ul>
                        </Row>
                        <Row className="mt-4">
                            <h5 className="fw-bold mb-0 p-0 mt-3">Shop</h5>
                            <ul className={styles.footerLinks}>
                                <li>
                                    <a href="#">Gift Subscription</a>
                                </li>
                                <li>
                                    <a href="#">Send Us Feedback</a>
                                </li>
                            </ul>
                        </Row>
                    </div>

                    <div>
                        <h5 className="fw-bold mb-0 p-0">Recipes</h5>
                        <ul className={styles.footerLinks}>
                            <li>
                                <a href="#">What to Cook This Week</a>
                            </li>
                            <li>
                                <a href="#">Pasta</a>
                            </li>
                            <li>
                                <a href="#">Dinner</a>
                            </li>
                            <li>
                                <a href="#">Healthy</a>
                            </li>
                            <li>
                                <a href="#">Vegetarian</a>
                            </li>
                            <li>
                                <a href="#">Vegan</a>
                            </li>
                            <li>
                                <a href="#">Christmas</a>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
