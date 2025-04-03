import { Button, Card, Col, Container, Form, Image, Row, Toast } from 'react-bootstrap';
import styles from './CookingGuide.module.scss';
import { useContext, useState } from 'react';
import { FaGreaterThan, FaPlus, FaRegBookmark, FaStar } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import recipes from '../../data/recipes.json';
import { motion } from 'framer-motion';
import { ChefifyConText } from '../../context/ChefifyContext';
import { PiGreaterThan } from 'react-icons/pi';

const CookingGuide = () => {
    const { login, savedRecipes, setSavedRecipes, navigate } = useContext(ChefifyConText);
    const { id } = useParams();
    const location = useLocation();
    const [success, setSuccess] = useState(true);

    const recipe = recipes.find((item) => item.id == id);
    const paths = location.pathname.split('/').filter((path) => path);

    const handleSavedRecipe = (recipe) => {
        if (!login) {
            setSuccess(false);
            setTimeout(() => setSuccess(true), 3000);
        } else {
            const newSavedRecipes = savedRecipes.some((item) => item.id == recipe.id)
                ? savedRecipes.filter((item) => item.id != recipe.id)
                : [...savedRecipes, recipe];
            setSavedRecipes(newSavedRecipes);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ marginTop: '60px', height: '48px', lineHeight: '48px', marginLeft: '81px' }}
                className="d-flex justify-content-start gap-1 fw-medium"
            >
                {paths.map((path, index) => {
                    const isLast = index == paths.length - 1;
                    const pathPrev = `${paths.slice(0, index + 1).join('/')}`;
                    return !isLast ? (
                        <div key={index} className="d-flex justify-content-start gap-1">
                            <span onClick={() => navigate(pathPrev)} style={{ cursor: 'pointer' }}>
                                {path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()}
                            </span>
                            <span>
                                <PiGreaterThan style={{ fontSize: '18px' }} />
                            </span>
                        </div>
                    ) : (
                        <span key={index} style={{ color: '#f24c86', cursor: 'pointer' }}>
                            Cooking guide
                        </span>
                    );
                })}
            </motion.div>
            <Container
                className="d-flex flex-column justify-content-center align-items-center px-0"
                style={{ marginBottom: '48px', maxWidth: '1366px' }}
            >
                {!success && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '0%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 10000,
                        }}
                    >
                        <Toast onClose={() => setSuccess(true)}>
                            <Toast.Header>
                                <strong className="me-auto text-danger">Notify</strong>
                            </Toast.Header>
                            <Toast.Body className="bg-danger text-white">You need to login</Toast.Body>
                        </Toast>
                    </div>
                )}
                <Row className="d-flex justify-content-center w-100">
                    <Col className="d-flex justify-content-end px-0" md={5}>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ minHeight: '1020px' }}
                            className="d-flex flex-column justify-content-between"
                        >
                            <h2 className="fw-bold">How to make a {recipe.name}</h2>
                            <p className="mb-0">
                                It seems like there may be a misunderstanding. If you're asking how a user can make a
                                Strawberry Shortcake, the process would be identical to the recipe I shared earlier. It
                                involves preparing the strawberries, making the shortcakes, preparing whipped cream, and
                                finally assembling the shortcake.
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
                                            <Button
                                                onClick={() => handleSavedRecipe(recipe)}
                                                className={`${styles.btn} ${
                                                    savedRecipes.some((item) => item.id == recipe.id) && login
                                                        ? styles.active
                                                        : ''
                                                }`}
                                            >
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
                                                                color: recipe.star > index ? '#f24c86' : '#d3d3d3',
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
                        </motion.div>
                    </Col>
                    <Col className="d-flex justify-content-start px-0" md={7}>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ maxHeight: '1020px', overflowY: 'auto' }}
                            className="ms-4 d-flex flex-column gap-3 rounded-4"
                        >
                            <div className="d-flex flex-column gap-2">
                                <img src={`/src/assets/images/recipes/${recipe.image}.png`} className="rounded-4" />
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold fs-5" style={{ color: '#313943' }}>
                                    Step 1
                                </span>
                                <p className="my-0">
                                    Pick over and hull strawberries. Cut in half or slice, depending on size. Gently
                                    crush about a quarter of the berries with a fork to release their juices. Mix with
                                    remaining berries and the ½ cup of sugar, adding more sugar if necessary. Set aside,
                                    covered, for about half an hour to develop flavor.
                                </p>
                                <img src="/src/assets/images/Image 118.png" className="rounded-4" />
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold fs-5" style={{ color: '#313943' }}>
                                    Step 2
                                </span>
                                <p className="my-0">Preheat oven to 450 degrees.</p>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold fs-5" style={{ color: '#313943' }}>
                                    Step 3
                                </span>
                                <p className="my-0">
                                    Into a large mixing bowl, sift together flour, 3 tablespoons sugar, salt and baking
                                    powder. Add ¾ cup of softened butter, and rub into dry ingredients as for pastry.
                                    Add 1¼ cups cream, and mix to a soft dough. Knead the dough for one minute on a
                                    lightly floured pastry board, then roll it out to about ½-inch thickness. Using a
                                    3-inch biscuit cutter, cut an even number of rounds - 2 rounds per serving.
                                </p>
                                <img src="/src/assets/images/Image 110.png" className="rounded-4" />
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold fs-5" style={{ color: '#313943' }}>
                                    Step 4
                                </span>
                                <p className="my-0">
                                    Use a little of the butter to grease a baking sheet. Place half the rounds on it.
                                    Melt remaining butter and brush a little on the rounds; place remaining rounds on
                                    top. Bake for 10 to 15 minutes, or until golden brown.
                                </p>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold fs-5" style={{ color: '#313943' }}>
                                    Step 5
                                </span>
                                <p className="my-0">
                                    Use a little of the butter to grease a baking sheet. Place half the rounds on it.
                                    Melt remaining butter and brush a little on the rounds; place remaining rounds on
                                    top. Bake for 10 to 15 minutes, or until golden brown.
                                </p>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span className="fw-bold fs-5" style={{ color: '#313943' }}>
                                    Step 6
                                </span>
                                <p className="my-0">
                                    Beat remaining cream until it thickens. Add vanilla. Beat again just until thick.
                                </p>
                                <img src="/src/assets/images/Image 111.png" className="rounded-4" />
                            </div>
                        </motion.div>
                    </Col>
                </Row>
                <Row className="w-100 px-0 mt-5 mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-100 px-0"
                    >
                        <Form className="w-100">
                            <Form.Group>
                                <Form.Label style={{ color: '#313943' }}>
                                    <h3 className="fw-bold">Cooking note</h3>
                                </Form.Label>
                                <div style={{ position: 'relative' }}>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        placeholder="State your opinion about the article"
                                        className={`${styles.focus_border}`}
                                    />
                                    <Button
                                        type="submit"
                                        className={`${styles.btn} ${styles.btnAdd} ${styles.no_focus_border}`}
                                        style={{ width: '90px', position: 'absolute', right: '16px', top: '100px' }}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </motion.div>
                </Row>
            </Container>
        </>
    );
};

export default CookingGuide;
