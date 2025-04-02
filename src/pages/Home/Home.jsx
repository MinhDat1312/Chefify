import recipe from '../../data/recipes.json';
import { useContext, useState } from 'react';
import { Button, Card, Carousel, Container, Modal } from 'react-bootstrap';
import styles from './Home.module.scss';
import LoginModal from '../../layouts/LoginModal/LoginModal';
import { FaArrowRight } from 'react-icons/fa';
import RecipeLayout from '../../layouts/RecipeLayout/RecipeLayout';
import { motion } from 'framer-motion';
import { ChefifyConText } from '../../context/ChefifyContext';

const Home = () => {
    const [showModalPro, setShowModalPro] = useState(true);
    const { loginModal, setLoginModal, login } = useContext(ChefifyConText);
    const [index, setIndex] = useState(0);

    const handleNextSlide = () => {
        setIndex((prev) => (index + 1) % 3);
        if (index == 2) {
            setShowModalPro(false);
            setLoginModal(true);
        }
    };

    return (
        <div style={{ marginTop: '68px' }}>
            <div
                style={{
                    position: 'relative',
                    backgroundImage: "url('/src/assets/images/Image 73.png')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '150vh',
                }}
            >
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className={styles.card}>
                        <Card.Body className={styles.cardBody}>
                            <Card.Title style={{ color: '#f24c86' }} className="fw-bold text-center">
                                Salad Caprese
                            </Card.Title>
                            <Card.Text style={{ fontSize: '14px' }} className="text-center mt-2">
                                Classic Italian Salad Caprese: ripe tomatoes, fresh mozzarella, herbs, olive oil, and
                                balsamic vinegar create a refreshing dish for lunch or appetizer.
                            </Card.Text>
                            <div className="d-flex flex-column gap-3 justify-content-center align-items-center mt-5">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <img src="/src/assets/images/Avatar 19.png" style={{ width: '50px' }} />
                                    <span style={{ color: '#5f646f' }} className="fw-medium">
                                        Salad Caprese
                                    </span>
                                </div>
                                <Button
                                    onClick={() => setShowModalPro(true)}
                                    style={{
                                        backgroundColor: '#f24c86',
                                    }}
                                    className={styles.btn}
                                >
                                    View now <FaArrowRight />
                                </Button>
                            </div>
                        </Card.Body>
                        <div className={styles.cardNote}>
                            <span>Recipe of the day</span>
                        </div>
                    </Card>
                </motion.div>
            </div>
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center px-0 w-100"
                style={{ margin: '0px' }}
            >
                <RecipeLayout type={'Summer'} recipes={recipe.slice(0, 4)} />
                <RecipeLayout type={'Videos'} recipes={recipe.slice(4, 8)} />
                <RecipeLayout type={'Editors'} recipes={recipe.slice(8, 12)} />
            </Container>
            {showModalPro && (
                <Modal show={showModalPro} onHide={() => setShowModalPro(false)} size="lg">
                    <Modal.Header closeButton className="border-bottom-0"></Modal.Header>
                    <Modal.Body>
                        <Modal.Title className="fs-2 fw-bold text-center" style={{ color: '#ee4c85' }}>
                            Discover Chefify
                        </Modal.Title>
                        <div className="text-center my-3">
                            Easy and delicious cooking instructions right here. Start exploring now!
                        </div>
                        <Carousel
                            activeIndex={index}
                            onSelect={setIndex}
                            fade
                            controls={false}
                            className="rounded-2 overflow-hidden"
                        >
                            <Carousel.Item className="rounded-2 overflow-hidden">
                                <img
                                    className="rounded-2 mx-auto d-block"
                                    width={750}
                                    height={350}
                                    src="/src/assets/images/Image 73.png"
                                ></img>
                            </Carousel.Item>
                            <Carousel.Item className="rounded-2 overflow-hidden">
                                <img
                                    className="rounded-2 mx-auto d-block"
                                    width={750}
                                    height={350}
                                    src="/src/assets/images/Image 93.png"
                                ></img>
                            </Carousel.Item>
                            <Carousel.Item className="rounded-2 overflow-hidden">
                                <img
                                    className="rounded-2 mx-auto d-block"
                                    width={750}
                                    height={350}
                                    src="/src/assets/images/Lotus delight salad_01.png"
                                ></img>
                            </Carousel.Item>
                        </Carousel>
                        <div className="d-flex flex-column justify-content-center align-items-center my-3">
                            <Button
                                className="w-50 border-0 rounded-3"
                                style={{ backgroundColor: '#ee4c85' }}
                                onClick={handleNextSlide}
                            >
                                Next
                            </Button>
                            <Button
                                className="w-50 border-0 rounded-3 mt-2"
                                style={{ backgroundColor: 'transparent', color: '#ee4c85' }}
                                onClick={() => {
                                    setShowModalPro(false);
                                    setLoginModal(true);
                                }}
                            >
                                Skip
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
            {loginModal && !login && <LoginModal />}
        </div>
    );
};

export default Home;
