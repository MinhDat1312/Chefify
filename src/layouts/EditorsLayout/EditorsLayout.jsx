import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import recipes from '../../data/recipes.json';
import styles from './EditorsLayout.module.scss';
import { FaRegBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EditorsLayout = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center mt-5 mx-0 w-100"
                style={{ marginBottom: '20px' }}
            >
                <div className="mb-4">
                    <h2 className="fw-bold text-center" style={{ color: '#f24c86' }}>
                        Editor's pick
                    </h2>
                    <span className="fw-medium text-center">
                        Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
                    </span>
                </div>
                <Row className="d-flex justify-content-center" style={{ marginInline: '62px' }}>
                    {recipes.slice(8, 12).map((recipe, index) => (
                        <Card
                            key={recipe.id}
                            as={Col}
                            xs={5}
                            style={{
                                marginRight: index % 2 != 0 ? '' : '28px',
                                position: 'relative',
                            }}
                            className={styles.card}
                        >
                            <Card.Img
                                src={`/src/assets/images/recipes/${recipe.image}.png`}
                                style={{ maxWidth: '40%', height: 'auto' }}
                            />
                            <Card.Body className="p-0" style={{ marginLeft: '16px' }}>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Card.Title className="fw-bold" style={{ fontSize: '24px' }}>
                                            {recipe.name}
                                        </Card.Title>
                                        <span style={{ color: '#444957' }}>
                                            {Math.floor(Math.random() * 60) + 1} minutes
                                        </span>
                                    </div>
                                    <Button className={styles.btn}>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <FaRegBookmark style={{ color: '#f24c86' }} className="fs-5" />
                                        </div>
                                    </Button>
                                </div>
                                <div className="d-flex justify-content-start align-items-center  gap-2 mt-3">
                                    <img
                                        src={`/src/assets/images/${recipe.editor.avatar}.png`}
                                        style={{ width: '50px' }}
                                    />
                                    <span style={{ color: '#33383d' }} className="fw-medium">
                                        {recipe.editor.name}
                                    </span>
                                </div>
                                <p className={styles.paragraph}>{recipe.editor.desc}</p>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </motion.div>
    );
};

export default EditorsLayout;
