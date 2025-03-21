import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import styles from './CookingGuide.module.scss';
import { useContext } from 'react';
import { ChefifyConText } from '../../ChefifyContext';
import { FaPlus, FaRegBookmark, FaStar } from 'react-icons/fa';

const CookingGuide = () => {
    const { login } = useContext(ChefifyConText);

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center px-0"
            style={{ margin: '90px 105px 48px' }}
        >
            <div className="d-flex gap-2 justify-content-center align-items-center w-100">
                <div style={{ width: '40%' }}>
                    <h2 className="fw-bold">How to make a Strawberry Shortcake</h2>
                    <p>
                        It seems like there may be a misunderstanding. If you're asking how a user can make a Strawberry
                        Shortcake, the process would be identical to the recipe I shared earlier. It involves preparing
                        the strawberries, making the shortcakes, preparing whipped cream, and finally assembling the
                        shortcake.
                    </p>
                    <div>
                        <Card className="my-4 p-4 rounded-4 shadow-sm">
                            <Row className="align-items-center">
                                <Col xs={6} className="px-0 d-flex justify-content-start align-items-center">
                                    <Image
                                        src="/src/assets/images/avatar.png"
                                        roundedCircle
                                        style={{ backgroundColor: '#ffcccb', width: '40px', height: '40px' }}
                                    />
                                    <h5 className="mb-0 ms-3">Emma Gonzalez</h5>
                                </Col>
                                <Col xs={6} className="d-flex justify-content-end align-items-end px-0">
                                    <Button className={`${styles.btn} ${true && login ? styles.active : ''}`}>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <FaRegBookmark className="fs-5" />
                                        </div>
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="mt-5">
                                <Col xs={4} className="px-0 d-flex align-items-start">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <span className="text-black mb-2">Time:</span>
                                        <strong style={{ color: '#565e6c' }}>45 minutes</strong>
                                    </div>
                                </Col>
                                <Col xs={4} className="px-0 d-flex align-items-center">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <span className="text-black mb-2">Notes:</span>
                                        <strong style={{ color: '#565e6c' }}>352 community notes</strong>
                                    </div>
                                </Col>
                                <Col xs={4} className="px-0 d-flex justify-content-end">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <span className="text-black mb-2">Rating:</span>
                                        <span>
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    style={{
                                                        color: index < 4 ? '#ffd700' : '#d3d3d3',
                                                        fontSize: '20px',
                                                    }}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div>
                        <Card className="rounded-4 p-5" style={{ border: '2px dashed #f44b86' }}>
                            <Row>
                                <div className="d-flex flex-column gap-3 mb-5 px-0">
                                    <span>-Yield: 4 generous servings</span>
                                    <span>-2 pints ripe, well-rinsed strawberries</span>
                                    <span>-1/2 cup sugar, or more to taste</span>
                                    <span>-4 cups flour</span>
                                    <span>-3 tablespoons sugar</span>
                                    <span>-1/2 teaspoons salt</span>
                                    <span>-5 teaspoons baking powder</span>
                                    <span>-1/2 cups butter</span>
                                    <span>-3 cups whipping cream</span>
                                    <span>-1/4 teaspoon vanilla extract</span>
                                </div>
                                <Button className={`${styles.btn} ${styles.btnAdd}`}>
                                    <div className="d-flex align-items-center">
                                        <FaPlus className="me-2" />
                                    </div>
                                    Add to Your Grocery List
                                </Button>
                            </Row>
                        </Card>
                    </div>
                </div>
                <div style={{ width: '60%' }}>Hello</div>
            </div>
        </Container>
    );
};

export default CookingGuide;
