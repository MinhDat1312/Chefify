import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './Subscribe.module.scss';
import { motion } from 'framer-motion';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { ChefifyConText } from '../../context/ChefifyContext';
import { useLocation } from 'react-router-dom';
import { PiGreaterThan } from 'react-icons/pi';

const Subscribe = () => {
    const { navigate, login, userID, setUserID } = useContext(ChefifyConText);
    const [selectedRadio, setSelectedRadio] = useState('$2/month (Billed every 4 weeks)');
    const location = useLocation();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserID(user.uid);
            } else {
                setUserID('');
            }
        });
    }, [userID]);

    const paths = location.pathname.split('/').filter((path) => path);

    const handleSelectedRadio = (e) => {
        setSelectedRadio(e.target.value);
    };

    const handleSubscribe = async (plan) => {
        if (login) {
            await axios
                .post(
                    'http://localhost:4000/api/v1/create-subscribe-checkout-session',
                    {
                        plan: plan,
                        customerID: userID,
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false,
                    },
                )
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((json) => Promise.reject(json));
                    }
                })
                .then(({ session }) => {
                    window.location = session.url;
                })
                .catch((error) => {
                    console.error(error);
                });

            // if (type == 'week') {
            //     setSubscribe('week');
            // } else {
            //     setSubscribe(selectedRadio.split('/')[1].split(' ')[0]);
            // }
        } else {
            navigate('/login');
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
                            {path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()}
                        </span>
                    );
                })}
            </motion.div>
            <Container
                className="d-flex flex-column justify-content-center align-items-center px-0"
                style={{ marginBottom: '48px', maxWidth: '1366px' }}
            >
                <Row className="d-flex justify-content-center w-100">
                    <Col className="d-flex justify-content-start px-0" md={5}>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="d-flex flex-column justify-content-between gap-4"
                        >
                            <h4 className="fw-bold my-0">This recipe is exclusively available to subscribers</h4>
                            <h1 className="fw-bold my-0" style={{ color: '#f24c86' }}>
                                Join now to access effortless, hassle-free recipes
                            </h1>
                            <div className="d-flex flex-column gap-3 px-0">
                                <div className="d-flex justify-content-start align-items-center gap-5">
                                    <FaRegCheckCircle style={{ color: '#ffc218' }} />
                                    <span>20,000+ recipes to suit all tastes and skill levels</span>
                                </div>
                                <div className="d-flex justify-content-start align-items-center gap-5">
                                    <FaRegCheckCircle style={{ color: '#ffc218' }} />
                                    <span>Filter for diets, cook times, and more</span>
                                </div>
                                <div className="d-flex justify-content-start align-items-center gap-5">
                                    <FaRegCheckCircle style={{ color: '#ffc218' }} />
                                    <span>Personal Recipe Box for favorites</span>
                                </div>
                                <div className="d-flex justify-content-start align-items-center gap-5">
                                    <FaRegCheckCircle style={{ color: '#ffc218' }} />
                                    <span>Gain exclusive access to our subscriber-only mobile app.</span>
                                </div>
                            </div>
                            <div style={{ color: '#555d68' }}>
                                <h2 className="fw-bold my-0">0.25USD / Week</h2>
                                <span>Billed as $1 every 4 weeks for the first year</span>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <Button
                                    onClick={() => handleSubscribe('week')}
                                    className={`${styles.btn} ${styles.btnAdd}`}
                                >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <MdOutlinePayments className="fs-5" />
                                    </div>
                                    Subscribe Now
                                </Button>
                                <Button
                                    onClick={() => navigate(-1)}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: '#f24c86',
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '10px',
                                        border: 'none',
                                    }}
                                >
                                    Cancel or Pause anytime
                                </Button>
                            </div>
                        </motion.div>
                    </Col>
                    <Col className="d-flex justify-content-end px-0" md={7}>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="rounded-4"
                        >
                            <img
                                src="/src/assets/images/dish.png"
                                className="rounded-4"
                                style={{ width: '640px', height: '591px' }}
                            />
                        </motion.div>
                    </Col>
                </Row>
                <Row className="w-100 px-0 mt-5 mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-100 px-0 d-flex flex-column justify-content-center align-items-center gap-4"
                    >
                        <h2 className="fw-bold my-0" style={{ color: '#f24c86' }}>
                            An All Access subscription includes
                        </h2>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div
                                className="d-flex flex-column justify-content-center align-items-center rounded-3 shadow-sm p-3"
                                style={{ color: '#555d68', width: '320px', border: '1px solid #bcc2ca' }}
                            >
                                <h4 className="fw-bold">Cooking</h4>
                                <span
                                    className="text-center"
                                    style={{ height: '80px', width: '240px', fontSize: '18px' }}
                                >
                                    Enjoy recipes, advice and inspiration for any occasion.
                                </span>
                            </div>
                            <div
                                className="d-flex flex-column justify-content-center align-items-center rounded-3 shadow-sm p-3"
                                style={{ color: '#555d68', width: '320px', border: '1px solid #bcc2ca' }}
                            >
                                <h4 className="fw-bold">Wirecutter</h4>
                                <span
                                    className="text-center"
                                    style={{ height: '80px', width: '240px', fontSize: '18px' }}
                                >
                                    Explore independent reviews for thousands of products.
                                </span>
                            </div>
                            <div
                                className="d-flex flex-column justify-content-center align-items-center rounded-3 shadow-sm p-3"
                                style={{ color: '#555d68', width: '320px', border: '1px solid #bcc2ca' }}
                            >
                                <h4 className="fw-bold">Games</h4>
                                <span
                                    className="text-center"
                                    style={{ height: '80px', width: '240px', fontSize: '18px' }}
                                >
                                    Unwind with Spelling Bee, Wordle, The Crossword.
                                </span>
                            </div>
                            <div
                                className="d-flex flex-column justify-content-center align-items-center rounded-3 shadow-sm p-3"
                                style={{ color: '#555d68', width: '320px', border: '1px solid #bcc2ca' }}
                            >
                                <h4 className="fw-bold">The Athletic</h4>
                                <span
                                    className="text-center"
                                    style={{ height: '80px', width: '240px', fontSize: '18px' }}
                                >
                                    Discover in-depth, personalized sports journalism.
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </Row>
                <Row className="w-100 px-0 mt-5 mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-100 px-0 d-flex flex-column justify-content-center align-items-center gap-3"
                    >
                        <img
                            src="/src/assets/images/Group 9.png"
                            className="d-inline-block align-top"
                            style={{ width: '160px', height: '40px' }}
                            alt="Chefify logo"
                        />
                        <h2 className="fw-bold my-0" style={{ color: '#f24c86' }}>
                            Subscribe to Chefify Cooking only
                        </h2>
                        <span>
                            Enjoy thousands of delicious recipes for every taste, plus advice and inspiration daily.
                        </span>
                        <div className="d-flex flex-column w-25 gap-2">
                            {['$2/month (Billed every 4 weeks)', '$20/year (Billed one annually)'].map((item, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        checked={selectedRadio == item}
                                        name="radio"
                                        type="radio"
                                        label={item}
                                        value={item}
                                        id={`radio-${index}`}
                                        className={styles.btnRadio}
                                        onChange={(e) => handleSelectedRadio(e)}
                                    />
                                );
                            })}
                        </div>
                        <div className="d-flex flex-column gap-3 w-25">
                            <Button onClick={() => handleSubscribe('')} className={`${styles.btn} ${styles.btnAdd}`}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <MdOutlinePayments className="fs-5" />
                                </div>
                                Subscribe Now
                            </Button>
                            <Button
                                onClick={() => navigate(-1)}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#f24c86',
                                    width: '100%',
                                    height: '40px',
                                    borderRadius: '10px',
                                    border: 'none',
                                }}
                            >
                                Cancel or Pause anytime
                            </Button>
                        </div>
                    </motion.div>
                </Row>
            </Container>
        </>
    );
};

export default Subscribe;
