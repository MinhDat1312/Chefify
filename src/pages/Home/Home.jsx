import { useState } from 'react';
import { Button, Carousel, Modal } from 'react-bootstrap';
import styles from './Home.module.scss';

const Home = () => {
    const [showModal, setShowModal] = useState(true);
    const [index, setIndex] = useState(0);

    const handleNextSlide = () => {
        setIndex((prev) => (index + 1) % 3);
        if (index == 2) {
            setShowModal(false);
        }
    };

    return (
        <div style={{ marginTop: '68px' }}>
            <img src="/src/assets/images/Image 73.png" className="w-100" />
            {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
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
                                onClick={() => setShowModal(false)}
                            >
                                Skip
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default Home;
